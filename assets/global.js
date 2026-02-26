/* ============================================
   THE CLEAR CUT V3 — Global JavaScript
   Core UI behaviors. Cart logic is in cart-api.js.
   ============================================ */

(function () {
  'use strict';

  /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /* ---------- Header Scroll Shadow ---------- */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 1) {
            header.classList.add('header--scrolled');
          } else {
            header.classList.remove('header--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ---------- Announcement Bar Rotation ---------- */
  function initAnnouncementBar() {
    const bar = document.querySelector('.announcement-bar');
    if (!bar) return;

    const messages = bar.querySelectorAll('.announcement-bar__message');
    if (messages.length <= 1) return;

    let currentIndex = 0;
    const prevBtn = bar.querySelector('.announcement-bar__prev');
    const nextBtn = bar.querySelector('.announcement-bar__next');

    function showMessage(index) {
      messages.forEach((msg, i) => {
        msg.classList.toggle('is-active', i === index);
      });
    }

    function next() {
      currentIndex = (currentIndex + 1) % messages.length;
      showMessage(currentIndex);
    }

    function prev() {
      currentIndex = (currentIndex - 1 + messages.length) % messages.length;
      showMessage(currentIndex);
    }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    let autoRotate = setInterval(next, 5000);

    bar.addEventListener('mouseenter', () => clearInterval(autoRotate));
    bar.addEventListener('mouseleave', () => {
      autoRotate = setInterval(next, 5000);
    });

    showMessage(0);
  }

  /* ---------- Mobile Menu ---------- */
  function initMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const openBtn = document.querySelector('[data-menu-open]');
    const closeBtn = document.querySelector('[data-menu-close]');

    if (!menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Close menu when clicking nav links
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------- Accordion ---------- */
  function initAccordions() {
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('.accordion__trigger');
      if (!trigger) return;

      const item = trigger.closest('.accordion__item');
      const content = item.querySelector('.accordion__content');
      const isOpen = item.classList.contains('is-open');

      // Close all siblings
      const parent = item.parentElement;
      parent.querySelectorAll('.accordion__item.is-open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.accordion__content').style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('is-open');
        content.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ---------- Initialize ---------- */
  function init() {
    initScrollReveal();
    initHeaderScroll();
    initAnnouncementBar();
    initMobileMenu();
    initAccordions();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
