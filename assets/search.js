/* ============================================
   THE CLEAR CUT V3 — Search Overlay
   Predictive search using Shopify's API
   ============================================ */

(function () {
  'use strict';

  const SearchOverlay = {
    overlay: null,
    input: null,
    results: null,
    debounceTimer: null,

    init() {
      this.overlay = document.getElementById('search-overlay');
      this.input = document.getElementById('search-input');
      this.results = document.getElementById('search-results');

      if (!this.overlay || !this.input) return;

      // Open triggers
      document.querySelectorAll('[data-search-open]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });

      // Close triggers
      document.querySelectorAll('[data-search-close]').forEach((btn) => {
        btn.addEventListener('click', () => this.close());
      });

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.overlay.classList.contains('is-open')) {
          this.close();
        }
      });

      // Input handler with debounce
      this.input.addEventListener('input', () => {
        clearTimeout(this.debounceTimer);
        const query = this.input.value.trim();

        if (query.length < 2) {
          this.showDefault();
          return;
        }

        this.debounceTimer = setTimeout(() => {
          this.search(query);
        }, 300);
      });
    },

    open() {
      this.overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => this.input.focus(), 100);
    },

    close() {
      this.overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      this.input.value = '';
      this.showDefault();
    },

    async search(query) {
      try {
        const res = await fetch(
          '/search/suggest.json?q=' + encodeURIComponent(query) + '&resources[type]=product&resources[limit]=8'
        );
        const data = await res.json();
        const products = data.resources?.results?.products || [];

        if (products.length === 0) {
          this.results.innerHTML =
            '<div class="search-overlay__empty">No results found for "' + this.escape(query) + '"</div>';
          return;
        }

        let html = '<div class="search-overlay__section-title">Products</div>';
        html += '<div class="search-overlay__product-list">';

        products.forEach((product) => {
          const imgSrc = product.image ? product.image : '';
          const price = product.price ? '$' + parseFloat(product.price).toFixed(2) : '';

          html += '<div class="product-card">';
          html += '  <a href="' + product.url + '" class="product-card__image-wrapper">';
          if (imgSrc) {
            html += '    <img class="product-card__image" src="' + imgSrc + '" alt="' + this.escape(product.title) + '" loading="lazy">';
          }
          html += '  </a>';
          html += '  <div class="product-card__info">';
          html += '    <a href="' + product.url + '" class="product-name product-card__name">' + this.escape(product.title) + '</a>';
          html += '    <div class="product-price product-card__price">' + price + '</div>';
          html += '  </div>';
          html += '</div>';
        });

        html += '</div>';
        this.results.innerHTML = html;
      } catch (err) {
        console.error('Search error:', err);
      }
    },

    showDefault() {
      this.results.innerHTML =
        '<div class="search-overlay__section-title">Popular Searches</div>' +
        '<div class="search-overlay__suggestions">' +
        '  <a href="/search?q=tennis+bracelet" class="search-overlay__suggestion">Tennis Bracelet</a>' +
        '  <a href="/search?q=moissanite" class="search-overlay__suggestion">Moissanite</a>' +
        '  <a href="/search?q=gold" class="search-overlay__suggestion">Gold</a>' +
        '  <a href="/search?q=bracelet" class="search-overlay__suggestion">Bracelets</a>' +
        '  <a href="/collections/best-sellers" class="search-overlay__suggestion">Best Sellers</a>' +
        '</div>';
    },

    escape(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SearchOverlay.init());
  } else {
    SearchOverlay.init();
  }

  window.SearchOverlay = SearchOverlay;
})();
