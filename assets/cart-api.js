/* ============================================
   THE CLEAR CUT V3 — Cart API (AJAX)
   Handles all cart operations without page reload
   ============================================ */

(function () {
  'use strict';

  const CartAPI = {
    /* ---------- Core API Methods ---------- */

    async getCart() {
      const res = await fetch('/cart.js', { headers: { 'Content-Type': 'application/json' } });
      return res.json();
    },

    async addItem(variantId, quantity = 1) {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: variantId, quantity }] }),
      });
      if (!res.ok) throw new Error('Failed to add item');
      const data = await res.json();
      await this.refreshCart();
      return data;
    },

    async updateItem(lineKey, quantity) {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lineKey, quantity }),
      });
      if (!res.ok) throw new Error('Failed to update item');
      const data = await res.json();
      this.renderCart(data);
      return data;
    },

    async removeItem(lineKey) {
      return this.updateItem(lineKey, 0);
    },

    /* ---------- Cart Drawer Rendering ---------- */

    async refreshCart() {
      const cart = await this.getCart();
      this.renderCart(cart);
      this.openDrawer();
      return cart;
    },

    renderCart(cart) {
      // Update cart count badges
      document.querySelectorAll('.header__cart-count').forEach((el) => {
        el.textContent = cart.item_count || '';
      });

      // Update drawer title count
      const drawerTitle = document.querySelector('.cart-drawer__title');
      if (drawerTitle) {
        drawerTitle.textContent = 'Your Cart (' + cart.item_count + ')';
      }

      // Render cart body
      const body = document.querySelector('.cart-drawer__body');
      if (!body) return;

      if (cart.item_count === 0) {
        body.innerHTML = '<div class="cart-drawer__empty">Your cart is empty.</div>';
        const footer = document.querySelector('.cart-drawer__footer');
        if (footer) footer.style.display = 'none';
        return;
      }

      let html = '';
      cart.items.forEach((item) => {
        const imgSrc = item.image ? this.getSizedImage(item.image, '160x') : '';
        const variantTitle = item.variant_title || '';

        html += '<div class="cart-item" data-line-key="' + item.key + '">';
        html += '  <div class="cart-item__image">';
        if (imgSrc) html += '    <img src="' + imgSrc + '" alt="' + this.escape(item.product_title) + '" loading="lazy">';
        html += '  </div>';
        html += '  <div class="cart-item__details">';
        html += '    <a href="' + item.url + '" class="cart-item__name">' + this.escape(item.product_title) + '</a>';
        if (variantTitle) html += '    <span class="cart-item__variant">' + this.escape(variantTitle) + '</span>';
        html += '    <div class="cart-item__quantity">';
        html += '      <button class="cart-item__qty-btn" data-action="decrease" aria-label="Decrease quantity">−</button>';
        html += '      <span class="cart-item__qty-value">' + item.quantity + '</span>';
        html += '      <button class="cart-item__qty-btn" data-action="increase" aria-label="Increase quantity">+</button>';
        html += '    </div>';
        html += '  </div>';
        html += '  <div>';
        html += '    <div class="cart-item__price">' + this.formatMoney(item.final_line_price) + '</div>';
        html += '    <button class="cart-item__remove" data-action="remove" aria-label="Remove item">Remove</button>';
        html += '  </div>';
        html += '</div>';
      });

      body.innerHTML = html;

      // Update footer
      const footer = document.querySelector('.cart-drawer__footer');
      if (footer) {
        footer.style.display = '';
        const subtotalEl = footer.querySelector('.cart-drawer__subtotal-price');
        if (subtotalEl) subtotalEl.textContent = this.formatMoney(cart.total_price);
      }

      // Update free shipping bar
      this.updateShippingBar(cart);
    },

    updateShippingBar(cart) {
      const bar = document.getElementById('cart-shipping-bar');
      const drawer = document.querySelector('.cart-drawer');
      if (!drawer) return;

      const threshold = parseInt(drawer.dataset.freeShippingThreshold || '30000', 10);
      const total = cart.total_price;
      const remaining = Math.max(0, threshold - total);
      const progress = Math.min(100, (total / threshold) * 100);

      if (cart.item_count === 0) {
        if (bar) bar.style.display = 'none';
        return;
      }

      if (!bar) {
        // Re-create bar if it was removed (empty cart -> items added)
        const header = drawer.querySelector('.cart-drawer__header');
        if (header) {
          const barHtml = '<div class="cart-shipping-bar' + (remaining === 0 ? ' cart-shipping-bar--complete' : '') + '" id="cart-shipping-bar">' +
            '<p class="cart-shipping-bar__text">' + (remaining === 0 ? "You've unlocked <strong>free shipping</strong>" : "You're <strong>" + this.formatMoney(remaining) + "</strong> away from free shipping") + '</p>' +
            '<div class="cart-shipping-bar__track"><div class="cart-shipping-bar__fill" style="width: ' + progress + '%"></div></div></div>';
          header.insertAdjacentHTML('afterend', barHtml);
        }
        return;
      }

      bar.style.display = '';
      const textEl = bar.querySelector('.cart-shipping-bar__text');
      const fillEl = bar.querySelector('.cart-shipping-bar__fill');

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

    openDrawer() {
      const drawer = document.querySelector('.cart-drawer');
      if (drawer) {
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    },

    closeDrawer() {
      const drawer = document.querySelector('.cart-drawer');
      if (drawer) {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    },

    /* ---------- Event Handlers ---------- */

    handleCartClick(e) {
      const target = e.target.closest('[data-action]');
      if (!target) return;

      const action = target.dataset.action;
      const cartItem = target.closest('.cart-item');
      if (!cartItem) return;

      const lineKey = cartItem.dataset.lineKey;
      const qtyEl = cartItem.querySelector('.cart-item__qty-value');
      const currentQty = parseInt(qtyEl.textContent, 10);

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

    handleQuickAdd(e) {
      const btn = e.target.closest('.btn-quick-add, .product-card__quick-add, .cart-upsell__add');
      if (!btn) return;

      e.preventDefault();
      const variantId = btn.dataset.variantId;
      if (!variantId) return;

      const originalText = btn.textContent;
      btn.textContent = 'ADDING...';
      btn.disabled = true;

      this.addItem(parseInt(variantId, 10), 1)
        .then(() => {
          btn.textContent = 'ADDED ✓';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);
        })
        .catch(() => {
          btn.textContent = 'ERROR';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);
        });
    },

    handleAddToCart(e) {
      const form = e.target.closest('form[action="/cart/add"]');
      if (!form) return;

      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const variantInput = form.querySelector('[name="id"]');
      if (!variantInput) return;

      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'ADDING...';
      submitBtn.disabled = true;

      this.addItem(parseInt(variantInput.value, 10), 1)
        .then(() => {
          submitBtn.textContent = 'ADDED ✓';
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 1500);
        })
        .catch(() => {
          submitBtn.textContent = 'ERROR';
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 1500);
        });
    },

    /* ---------- Helpers ---------- */

    formatMoney(cents) {
      return '$' + (cents / 100).toFixed(2);
    },

    getSizedImage(src, size) {
      if (!src) return '';
      return src.replace(/(\.[^.]+)$/, '_' + size + '$1');
    },

    escape(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },

    /* ---------- Initialize ---------- */

    init() {
      // Cart drawer item actions (quantity, remove)
      const drawerBody = document.querySelector('.cart-drawer__body');
      if (drawerBody) {
        drawerBody.addEventListener('click', (e) => this.handleCartClick(e));
      }

      // Quick-add buttons (product cards + upsell cards)
      document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-quick-add, .product-card__quick-add, .cart-upsell__add')) {
          this.handleQuickAdd(e);
        }
      });

      // Add to cart form (PDP)
      document.addEventListener('submit', (e) => {
        if (e.target.closest('form[action="/cart/add"]')) {
          this.handleAddToCart(e);
        }
      });

      // Open/close drawer
      document.querySelectorAll('[data-cart-open]').forEach((btn) => {
        btn.addEventListener('click', () => this.openDrawer());
      });
      document.querySelectorAll('[data-cart-close]').forEach((btn) => {
        btn.addEventListener('click', () => this.closeDrawer());
      });
      const overlay = document.querySelector('.cart-drawer__overlay');
      if (overlay) overlay.addEventListener('click', () => this.closeDrawer());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeDrawer();
      });
    },
  };

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CartAPI.init());
  } else {
    CartAPI.init();
  }

  // Expose globally
  window.CartAPI = CartAPI;
})();
