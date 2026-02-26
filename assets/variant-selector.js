/* ============================================
   THE CLEAR CUT V3 — Variant Selector
   Handles option selection on PDP, updates
   price, image, availability, and hidden input
   ============================================ */

(function () {
  'use strict';

  function initVariantSelector() {
    const productPage = document.querySelector('.product-page');
    if (!productPage) return;

    // Product data injected by Liquid (see main-product.liquid)
    const productData = window.__productData;
    if (!productData || !productData.variants) return;

    const variants = productData.variants;
    const optionGroups = productPage.querySelectorAll('.product-page__variant-group');
    const hiddenInput = productPage.querySelector('input[name="id"]');
    const priceEl = productPage.querySelector('.product-page__price');
    const mainImage = document.getElementById('main-product-image');
    const addBtn = productPage.querySelector('.product-page__add-btn');

    // Track current selected options
    let selectedOptions = {};

    // Initialize from pre-selected buttons
    optionGroups.forEach((group, index) => {
      const optionName = group.querySelector('.product-page__variant-label').textContent.trim();
      const activeBtn = group.querySelector('.product-page__variant-btn.is-selected');
      if (activeBtn) {
        selectedOptions[optionName] = activeBtn.textContent.trim();
      }

      // Add click handlers
      group.querySelectorAll('.product-page__variant-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
          // Update UI
          group.querySelectorAll('.product-page__variant-btn').forEach((b) => b.classList.remove('is-selected'));
          this.classList.add('is-selected');

          // Update selected options
          selectedOptions[optionName] = this.textContent.trim();

          // Find matching variant
          const matchedVariant = findVariant(variants, selectedOptions);
          if (matchedVariant) {
            updateVariant(matchedVariant);
          }
        });
      });
    });

    function findVariant(variants, selectedOpts) {
      const optionValues = Object.values(selectedOpts);
      return variants.find((v) => {
        return v.options.every((opt, i) => opt === optionValues[i]);
      });
    }

    function updateVariant(variant) {
      // Update hidden input
      if (hiddenInput) {
        hiddenInput.value = variant.id;
      }

      // Update price
      if (priceEl) {
        let priceHTML = '';
        if (variant.compare_at_price && variant.compare_at_price > variant.price) {
          priceHTML += '<span class="product-price-strike">' + formatMoney(variant.compare_at_price) + '</span> ';
        }
        priceHTML += formatMoney(variant.price);
        priceEl.innerHTML = priceHTML;
      }

      // Update main image if variant has one
      if (mainImage && variant.featured_image) {
        mainImage.src = variant.featured_image.src;
      }

      // Update add button availability
      if (addBtn) {
        if (variant.available) {
          addBtn.disabled = false;
          addBtn.textContent = 'Add To Cart';
        } else {
          addBtn.disabled = true;
          addBtn.textContent = 'Sold Out';
        }
      }

      // Update URL without reload
      const url = new URL(window.location);
      url.searchParams.set('variant', variant.id);
      history.replaceState(null, '', url);
    }

    function formatMoney(cents) {
      return '$' + (cents / 100).toFixed(2);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVariantSelector);
  } else {
    initVariantSelector();
  }
})();
