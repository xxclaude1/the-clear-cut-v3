/* ============================================
   THE CLEAR CUT V3 — Cart API (AJAX)
   Handles all cart operations without page reload
   ============================================ */

(function () {
  'use strict';

  var CartAPI = {
    _upsellProducts: null,
    _upsellLoading: null,

    /* ---------- Core API Methods ---------- */

    getCart: function () {
      return fetch('/cart.js', { headers: { 'Content-Type': 'application/json' } })
        .then(function (res) { return res.json(); });
    },

    addItem: function (variantId, quantity) {
      var self = this;
      quantity = quantity || 1;
      return fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: variantId, quantity: quantity }] }),
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Failed to add item');
          return res.json();
        })
        .then(function (data) {
          return self.refreshCart().then(function () { return data; });
        });
    },

    updateItem: function (lineKey, quantity) {
      var self = this;
      return fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lineKey, quantity: quantity }),
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Failed to update item');
          return res.json();
        })
        .then(function (data) {
          self.renderCart(data);
          return data;
        });
    },

    removeItem: function (lineKey) {
      return this.updateItem(lineKey, 0);
    },

    /* ---------- Upsell Products ---------- */

    ensureUpsellProducts: function () {
      var self = this;
      /* Return cached products if already loaded */
      if (self._upsellProducts && self._upsellProducts.length > 0) {
        return Promise.resolve(self._upsellProducts);
      }
      /* Return in-flight promise if already loading */
      if (self._upsellLoading) {
        return self._upsellLoading;
      }
      /* Fetch from storefront AJAX API */
      self._upsellLoading = fetch('/products.json?limit=50')
        .then(function (res) { return res.json(); })
        .then(function (data) {
          self._upsellProducts = (data.products || []).map(function (p) {
            return {
              id: p.id,
              title: p.title,
              handle: p.handle,
              url: '/products/' + p.handle,
              price: p.variants[0] ? Math.round(parseFloat(p.variants[0].price) * 100) : 0,
              image: p.images[0] ? p.images[0].src : '',
              variant_id: p.variants[0] ? p.variants[0].id : null,
            };
          });
          self._upsellLoading = null;
          return self._upsellProducts;
        })
        .catch(function (err) {
          console.warn('[CartAPI] Failed to load upsell products', err);
          self._upsellProducts = [];
          self._upsellLoading = null;
          return [];
        });
      return self._upsellLoading;
    },

    /* ---------- Cart Drawer Rendering ---------- */

    refreshCart: function () {
      var self = this;
      /* Load upsell products AND cart data in parallel */
      return Promise.all([
        self.ensureUpsellProducts(),
        self.getCart()
      ])
        .then(function (results) {
          var cart = results[1];
          self.renderCart(cart);
          self.openDrawer();
          return cart;
        })
        .catch(function (err) {
          console.warn('[CartAPI] refreshCart failed', err);
          /* Still try to open drawer with whatever we have */
          self.getCart()
            .then(function (cart) {
              self.renderCart(cart);
              self.openDrawer();
            })
            .catch(function () {
              self.openDrawer();
            });
        });
    },

    renderCart: function (cart) {
      var self = this;
      try {
        /* Update cart count badges */
        document.querySelectorAll('.header__cart-count').forEach(function (el) {
          el.textContent = cart.item_count || '';
        });

        /* Update drawer title count */
        var drawerTitle = document.querySelector('.cart-drawer__title');
        if (drawerTitle) {
          drawerTitle.textContent = 'Your Cart (' + cart.item_count + ')';
        }

        /* Render cart body */
        var body = document.querySelector('.cart-drawer__body');
        if (!body) return;

        var html = '';

        if (cart.item_count === 0) {
          html += '<div class="cart-drawer__empty">';
          html += '<span>Your cart is empty.</span>';
          html += '<a href="/collections/all-jewelry" class="cart-drawer__shop-link" data-cart-close>Start Shopping</a>';
          html += '</div>';
        } else {
          cart.items.forEach(function (item) {
            var imgSrc = item.image ? self.getSizedImage(item.image, '160x') : '';
            var variantTitle = item.variant_title || '';

            html += '<div class="cart-item" data-line-key="' + item.key + '">';
            html += '  <div class="cart-item__image">';
            if (imgSrc) html += '    <img src="' + imgSrc + '" alt="' + self.escape(item.product_title) + '" loading="lazy">';
            html += '  </div>';
            html += '  <div class="cart-item__details">';
            html += '    <a href="' + item.url + '" class="cart-item__name">' + self.escape(item.product_title) + '</a>';
            if (variantTitle) html += '    <span class="cart-item__variant">' + self.escape(variantTitle) + '</span>';
            html += '    <div class="cart-item__quantity">';
            html += '      <button class="cart-item__qty-btn" data-action="decrease" aria-label="Decrease quantity">\u2212</button>';
            html += '      <span class="cart-item__qty-value">' + item.quantity + '</span>';
            html += '      <button class="cart-item__qty-btn" data-action="increase" aria-label="Increase quantity">+</button>';
            html += '    </div>';
            html += '  </div>';
            html += '  <div>';
            html += '    <div class="cart-item__price">' + self.formatMoney(item.final_line_price) + '</div>';
            html += '    <button class="cart-item__remove" data-action="remove" aria-label="Remove item">Remove</button>';
            html += '  </div>';
            html += '</div>';
          });
        }

        /* Always add upsell container back before setting innerHTML */
        html += '<div id="cart-upsell"></div>';
        body.innerHTML = html;

        /* Render upsells into the container we just created */
        self.renderUpsells(cart);

        /* Update footer — show when items in cart, hide when empty */
        var footer = document.querySelector('.cart-drawer__footer');
        if (footer) {
          if (cart.item_count === 0) {
            footer.style.display = 'none';
          } else {
            footer.style.display = '';
            var subtotalEl = footer.querySelector('.cart-drawer__subtotal-price');
            if (subtotalEl) subtotalEl.textContent = self.formatMoney(cart.total_price);
          }
        }

        /* Re-bind close buttons inside dynamically rendered content */
        body.querySelectorAll('[data-cart-close]').forEach(function (btn) {
          btn.addEventListener('click', function () { self.closeDrawer(); });
        });

        /* Update free shipping bar */
        self.updateShippingBar(cart);
      } catch (err) {
        console.warn('[CartAPI] renderCart error', err);
      }
    },

    renderUpsells: function (cart) {
      var self = this;
      var container = document.getElementById('cart-upsell');
      if (!container) return;

      var allProducts = self._upsellProducts || [];
      var cartProductIds = cart.items.map(function (item) { return item.product_id; });
      var upsellProducts = allProducts.filter(function (p) { return !cartProductIds.includes(p.id); });

      if (upsellProducts.length === 0) {
        container.innerHTML = '';
        return;
      }

      var html = '';
      html += '<div class="cart-upsell__inner">';
      html += '<p class="cart-upsell__heading">Complete Your Look</p>';
      html += '<div class="cart-upsell__items">';
      upsellProducts.forEach(function (p) {
        html += '<div class="cart-upsell__card">';
        html += '<div class="cart-upsell__image">';
        if (p.image) html += '<img src="' + p.image + '" alt="' + self.escape(p.title) + '" loading="lazy">';
        html += '</div>';
        html += '<a href="' + p.url + '" class="cart-upsell__name">' + self.escape(p.title) + '</a>';
        html += '<div class="cart-upsell__price">' + self.formatMoney(p.price) + '</div>';
        html += '<button class="cart-upsell__add" data-variant-id="' + p.variant_id + '">Add +</button>';
        html += '</div>';
      });
      html += '</div></div>';

      container.innerHTML = html;
    },

    updateShippingBar: function (cart) {
      var bar = document.getElementById('cart-shipping-bar');
      var drawer = document.querySelector('.cart-drawer');
      if (!drawer) return;

      var threshold = parseInt(drawer.dataset.freeShippingThreshold || '30000', 10);
      var total = cart.total_price;
      var remaining = Math.max(0, threshold - total);
      var progress = Math.min(100, (total / threshold) * 100);

      if (cart.item_count === 0) {
        if (bar) bar.style.display = 'none';
        return;
      }

      if (!bar) {
        var header = drawer.querySelector('.cart-drawer__header');
        if (header) {
          var barHtml = '<div class="cart-shipping-bar' + (remaining === 0 ? ' cart-shipping-bar--complete' : '') + '" id="cart-shipping-bar">' +
            '<p class="cart-shipping-bar__text">' + (remaining === 0 ? "You've unlocked <strong>free shipping</strong>" : "You're <strong>" + this.formatMoney(remaining) + "</strong> away from free shipping") + '</p>' +
            '<div class="cart-shipping-bar__track"><div class="cart-shipping-bar__fill" style="width: ' + progress + '%"></div></div></div>';
          header.insertAdjacentHTML('afterend', barHtml);
        }
        return;
      }

      bar.style.display = '';
      var textEl = bar.querySelector('.cart-shipping-bar__text');
      var fillEl = bar.querySelector('.cart-shipping-bar__fill');

      if (remaining === 0) {
        bar.classList.add('cart-shipping-bar--complete');
        if (textEl) textEl.innerHTML = "You've unlocked <strong>free shipping</strong>";
      } else {
        bar.classList.remove('cart-shipping-bar--complete');
        if (textEl) textEl.innerHTML = "You're <strong>" + this.formatMoney(remaining) + "</strong> away from free shipping";
      }

      if (fillEl) fillEl.style.width = progress + '%';
    },

    /* ---------- Drawer Controls ---------- */

    openDrawer: function () {
      var drawer = document.querySelector('.cart-drawer');
      if (drawer) {
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    },

    closeDrawer: function () {
      var drawer = document.querySelector('.cart-drawer');
      if (drawer) {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    },

    /* ---------- Event Handlers ---------- */

    handleCartClick: function (e) {
      var target = e.target.closest('[data-action]');
      if (!target) return;

      var action = target.dataset.action;
      var cartItem = target.closest('.cart-item');
      if (!cartItem) return;

      var lineKey = cartItem.dataset.lineKey;
      var qtyEl = cartItem.querySelector('.cart-item__qty-value');
      var currentQty = parseInt(qtyEl.textContent, 10);

      if (action === 'decrease') {
        if (currentQty <= 1) {
          this.removeItem(lineKey);
        } else {
          this.updateItem(lineKey, currentQty - 1);
        }
      } else if (action === 'increase') {
        this.updateItem(lineKey, currentQty + 1);
      } else if (action === 'remove') {
        this.removeItem(lineKey);
      }
    },

    handleQuickAdd: function (e) {
      var self = this;
      var btn = e.target.closest('.btn-quick-add, .product-card__quick-add, .cart-upsell__add');
      if (!btn) return;

      e.preventDefault();
      var variantId = btn.dataset.variantId;
      if (!variantId) return;

      var originalText = btn.textContent;
      btn.textContent = 'ADDING...';
      btn.disabled = true;

      self.addItem(parseInt(variantId, 10), 1)
        .then(function () {
          btn.textContent = 'ADDED \u2713';
          setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);
        })
        .catch(function () {
          btn.textContent = 'ERROR';
          setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);
        });
    },

    handleAddToCart: function (e) {
      var self = this;
      var form = e.target.closest('form[action="/cart/add"]');
      if (!form) return;

      e.preventDefault();
      var submitBtn = form.querySelector('[type="submit"]');
      var variantInput = form.querySelector('[name="id"]');
      if (!variantInput) return;

      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'ADDING...';
      submitBtn.disabled = true;

      self.addItem(parseInt(variantInput.value, 10), 1)
        .then(function () {
          submitBtn.textContent = 'ADDED \u2713';
          setTimeout(function () {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 1500);
        })
        .catch(function () {
          submitBtn.textContent = 'ERROR';
          setTimeout(function () {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 1500);
        });
    },

    /* ---------- Helpers ---------- */

    formatMoney: function (cents) {
      return '$' + (cents / 100).toFixed(2);
    },

    getSizedImage: function (src, size) {
      if (!src) return '';
      return src.replace(/(\.[^.]+)$/, '_' + size + '$1');
    },

    escape: function (str) {
      var div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },

    /* ---------- Initialize ---------- */

    init: function () {
      var self = this;

      /* Pre-load upsell products immediately (non-blocking) */
      self.ensureUpsellProducts();

      /* Cart drawer item actions (quantity, remove) */
      var drawerBody = document.querySelector('.cart-drawer__body');
      if (drawerBody) {
        drawerBody.addEventListener('click', function (e) { self.handleCartClick(e); });
      }

      /* Quick-add buttons (product cards + upsell cards) */
      document.addEventListener('click', function (e) {
        if (e.target.closest('.btn-quick-add, .product-card__quick-add, .cart-upsell__add')) {
          self.handleQuickAdd(e);
        }
      });

      /* Add to cart form (PDP) */
      document.addEventListener('submit', function (e) {
        if (e.target.closest('form[action="/cart/add"]')) {
          self.handleAddToCart(e);
        }
      });

      /* Open/close drawer */
      document.querySelectorAll('[data-cart-open]').forEach(function (btn) {
        btn.addEventListener('click', function () { self.refreshCart(); });
      });
      document.querySelectorAll('[data-cart-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { self.closeDrawer(); });
      });
      var overlay = document.querySelector('.cart-drawer__overlay');
      if (overlay) overlay.addEventListener('click', function () { self.closeDrawer(); });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') self.closeDrawer();
      });
    },
  };

  /* Initialize */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { CartAPI.init(); });
  } else {
    CartAPI.init();
  }

  /* Expose globally */
  window.CartAPI = CartAPI;
})();
