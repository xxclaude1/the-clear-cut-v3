/*
 * Session Recorder — The Clear Cut Analytics
 * Records visitor sessions: mouse movements, clicks, scrolls, page views, cart events
 * Stored in localStorage for replay on /pages/analytics
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'tcc_sessions';
  var SESSION_KEY = 'tcc_active_session';
  var MAX_SESSIONS = 100;
  var MOUSE_SAMPLE_MS = 80;
  var MOUSE_MIN_DELTA = 4;
  var SCROLL_DEBOUNCE_MS = 150;
  var SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min inactivity = new session

  // Don't record on the analytics page itself
  if (window.location.pathname === '/pages/analytics') return;

  // --- Utilities ---
  function uid() {
    return 's_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
  }

  function now() { return Date.now(); }

  function getSessions() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch(e) { return []; }
  }

  function saveSessions(sessions) {
    try {
      // Keep only last MAX_SESSIONS
      if (sessions.length > MAX_SESSIONS) sessions = sessions.slice(-MAX_SESSIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch(e) {
      // Storage full — remove oldest half
      sessions = sessions.slice(Math.floor(sessions.length / 2));
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions)); } catch(e2) {}
    }
  }

  function getActiveSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
    catch(e) { return null; }
  }

  function saveActiveSession(session) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); }
    catch(e) {}
  }

  // --- Session Management ---
  var session = getActiveSession();
  var isNew = false;

  if (!session || (now() - session.lastActivity > SESSION_TIMEOUT_MS)) {
    session = {
      id: uid(),
      start: now(),
      lastActivity: now(),
      device: {
        w: window.innerWidth,
        h: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
        ua: navigator.userAgent,
        touch: 'ontouchstart' in window
      },
      referrer: document.referrer || '(direct)',
      pages: [],
      cartEvents: [],
      abandoned: null
    };
    isNew = true;
  }

  // --- Current Page Recording ---
  var currentPage = {
    url: window.location.pathname + window.location.search,
    title: document.title,
    enter: now(),
    events: []
  };

  var pageStartTime = now();
  var lastMouseX = -1, lastMouseY = -1;
  var lastMouseRecord = 0;
  var recording = true;

  function relTime() { return now() - pageStartTime; }

  function addEvent(evt) {
    if (!recording) return;
    currentPage.events.push(evt);
    session.lastActivity = now();
  }

  // --- Mouse Movement (sampled) ---
  function onMouseMove(e) {
    var t = now();
    if (t - lastMouseRecord < MOUSE_SAMPLE_MS) return;
    var dx = Math.abs(e.clientX - lastMouseX);
    var dy = Math.abs(e.clientY - lastMouseY);
    if (dx < MOUSE_MIN_DELTA && dy < MOUSE_MIN_DELTA) return;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    lastMouseRecord = t;
    addEvent({e:'m', t:relTime(), x:e.clientX, y:e.clientY});
  }

  // --- Clicks ---
  function onClick(e) {
    var tag = e.target.tagName || '';
    var text = '';
    if (e.target.textContent) text = e.target.textContent.trim().substring(0, 50);
    var cls = e.target.className || '';
    if (typeof cls !== 'string') cls = '';
    addEvent({
      e:'c', t:relTime(), x:e.clientX, y:e.clientY,
      tag: tag.toLowerCase(),
      text: text,
      cls: cls.substring(0, 80)
    });
  }

  // --- Scroll ---
  var scrollTimer = null;
  function onScroll() {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      addEvent({
        e:'s', t:relTime(),
        y: window.scrollY,
        max: document.documentElement.scrollHeight - window.innerHeight
      });
    }, SCROLL_DEBOUNCE_MS);
  }

  // --- Resize ---
  var resizeTimer = null;
  function onResize() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      addEvent({e:'r', t:relTime(), w:window.innerWidth, h:window.innerHeight});
    }, 300);
  }

  // --- Cart Event Detection ---
  // Intercept fetch/XHR to /cart/add and /cart/change
  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function(url, opts) {
      var urlStr = typeof url === 'string' ? url : (url && url.url ? url.url : '');
      if (urlStr.indexOf('/cart/add') !== -1) {
        session.cartEvents.push({t: now(), a: 'add', url: window.location.pathname});
        session.hasCart = true;
      } else if (urlStr.indexOf('/cart/change') !== -1) {
        session.cartEvents.push({t: now(), a: 'change', url: window.location.pathname});
      }
      return origFetch.apply(this, arguments);
    };
  }

  // Detect checkout page
  if (window.location.pathname.indexOf('/checkouts') !== -1) {
    session.reachedCheckout = true;
    session.cartEvents.push({t: now(), a: 'checkout', url: window.location.pathname});
  }

  // --- Attach Listeners ---
  document.addEventListener('mousemove', onMouseMove, {passive: true});
  document.addEventListener('click', onClick, {passive: true});
  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onResize, {passive: true});

  // Touch events for mobile
  document.addEventListener('touchmove', function(e) {
    if (!e.touches || !e.touches[0]) return;
    onMouseMove({clientX: e.touches[0].clientX, clientY: e.touches[0].clientY});
  }, {passive: true});

  document.addEventListener('touchstart', function(e) {
    if (!e.touches || !e.touches[0]) return;
    onClick({
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
      target: e.target
    });
  }, {passive: true});

  // --- Save on Page Leave ---
  function flushPage() {
    recording = false;
    currentPage.exit = now();
    currentPage.duration = currentPage.exit - currentPage.enter;
    currentPage.scrollDepth = 0;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    if (docH > 0) currentPage.scrollDepth = Math.round((window.scrollY / docH) * 100);

    // Compress mouse events — remove consecutive moves that are very close
    var compressed = [];
    var lastEvt = null;
    for (var i = 0; i < currentPage.events.length; i++) {
      var ev = currentPage.events[i];
      if (ev.e === 'm' && lastEvt && lastEvt.e === 'm') {
        // Replace last mouse event if very close in time
        if (ev.t - lastEvt.t < MOUSE_SAMPLE_MS * 1.5) {
          compressed[compressed.length - 1] = ev;
          lastEvt = ev;
          continue;
        }
      }
      compressed.push(ev);
      lastEvt = ev;
    }
    currentPage.events = compressed;

    session.pages.push(currentPage);
    session.end = now();
    session.duration = session.end - session.start;
    session.pageCount = session.pages.length;

    // Detect abandonment
    if (session.hasCart && !session.reachedCheckout) {
      session.abandoned = 'cart';
    } else if (session.reachedCheckout) {
      // If they were on checkout but are now leaving (and page isn't thank_you)
      var lastUrl = currentPage.url || '';
      if (lastUrl.indexOf('/checkouts') !== -1 && lastUrl.indexOf('thank_you') === -1) {
        session.abandoned = 'checkout';
      }
    }

    saveActiveSession(session);

    // Persist to sessions list
    var sessions = getSessions();
    var idx = -1;
    for (var j = 0; j < sessions.length; j++) {
      if (sessions[j].id === session.id) { idx = j; break; }
    }
    if (idx >= 0) sessions[idx] = session;
    else sessions.push(session);
    saveSessions(sessions);
  }

  window.addEventListener('beforeunload', flushPage);
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') flushPage();
  });

  // Initial scroll depth record
  addEvent({e:'s', t:0, y:window.scrollY, max: document.documentElement.scrollHeight - window.innerHeight});

  // Save session reference
  saveActiveSession(session);
})();
