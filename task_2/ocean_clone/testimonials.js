/* robust_autoscroll.js
   - Waits for window.onload (images/styles ready)
   - Validates DOM structure and logs helpful warnings
   - Clones only the original children once for a seamless loop
   - Animates translateY on .ts-inner
   - Pauses only the hovered column (pointerenter/pointerleave on cards)
*/

(function () {
  // tweak these to change overall feel
  const GLOBAL_MULTIPLIER = 35;   // lower = slower
  const DEFAULT_SPEED = 0.012;    // base px-per-ms

  function debug(...args) {
    // set to false to silence debug output
    if (window.__TS_DEBUG === true) console.log('[ts-scroll]', ...args);
  }

  function initColumn(col) {
    const inner = col.querySelector('.ts-inner');
    if (!inner) {
      console.warn('ts-column without .ts-inner found', col);
      return null;
    }

    // find how many original children exist before we clone
    // We mark original length on dataset so cloning runs only once
    let originalCount = parseInt(col.dataset.__origCount || '0', 10);
    if (!originalCount) {
      originalCount = inner.children.length;
      col.dataset.__origCount = originalCount;
    }

    if (originalCount === 0) {
      console.warn('No cards found inside .ts-inner — add .ts-card children', col);
      return null;
    }

    // If col.dataset._cloned is set, we skip cloning to avoid doubling repeatedly
    if (!col.dataset._cloned) {
      // clone only the originalCount nodes (in case inner was already extended)
      const nodes = Array.from(inner.children).slice(0, originalCount);
      nodes.forEach(n => inner.appendChild(n.cloneNode(true)));
      col.dataset._cloned = '1';
      debug('cloned', originalCount, 'nodes for', col);
    } else {
      debug('already cloned for', col);
    }

    // ensure inner uses transform for animation
    inner.style.willChange = 'transform';
    inner.style.transform = 'translateY(0px)';

    // pause/resume state using hoverCount (avoids flicker when moving between cards)
    let hoverCount = 0;
    let paused = false;

    function setPaused(val) {
      paused = !!val;
      col.classList.toggle('ts-paused', paused);
    }

    // Attach pointerenter/pointerleave to cards (delegation also possible)
    const cards = inner.querySelectorAll('.ts-card');
    if (!cards || cards.length === 0) debug('no cards found in inner', inner);

    cards.forEach(card => {
      card.addEventListener('pointerenter', () => {
        hoverCount += 1;
        setPaused(true);
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        hoverCount = Math.max(0, hoverCount - 1);
        if (hoverCount === 0) setPaused(false);
      }, { passive: true });

      // keyboard accessibility
      card.addEventListener('focusin', () => {
        hoverCount += 1; setPaused(true);
      });
      card.addEventListener('focusout', () => {
        hoverCount = Math.max(0, hoverCount - 1);
        if (hoverCount === 0) setPaused(false);
      });
    });

    // hold on pointerdown, resume on pointerup
    col.addEventListener('pointerdown', () => setPaused(true), { passive: true });
    document.addEventListener('pointerup', () => { if (hoverCount === 0) setPaused(false); }, { passive: true });

    // compute originalHeight (half of inner after cloning)
    function computeOriginalHeight() {
      // force reflow to read updated heights
      const total = inner.scrollHeight;
      const orig = total / 2;
      debug('computed heights', { total, orig });
      return orig || 1; // guard against zero
    }

    const originalHeight = computeOriginalHeight();
    const speedBase = parseFloat(col.dataset.speed) || DEFAULT_SPEED;

    // animation state
    let offset = 0;
    let lastTs = null;
    let raf = null;

    function step(ts) {
      if (lastTs === null) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;

      if (!paused) {
        offset += speedBase * dt * GLOBAL_MULTIPLIER;

        // wrap offset in [0, originalHeight)
        if (offset >= originalHeight) offset -= originalHeight;
        if (offset < 0) offset += originalHeight;

        // apply transform (negative value to move content up)
        inner.style.transform = `translateY(${-offset}px)`;
      }

      raf = requestAnimationFrame(step);
    }

    // start animation - but guard for images still loading: if originalHeight is very small, wait
    if (originalHeight < 10) {
      // try again after short delay (images may be loading)
      debug('originalHeight small, delaying start', originalHeight);
      setTimeout(() => {
        const newH = computeOriginalHeight();
        if (newH >= 10) {
          lastTs = null;
          raf = requestAnimationFrame(step);
        } else {
          // final fallback start anyway
          lastTs = null;
          raf = requestAnimationFrame(step);
        }
      }, 200);
    } else {
      raf = requestAnimationFrame(step);
    }

    // return controller so caller can cancel if needed
    return {
      stop() { cancelAnimationFrame(raf); },
      resume() { setPaused(false); },
      pause() { setPaused(true); }
    };
  }

  function initAll() {
    const cols = Array.from(document.querySelectorAll('.ts-column'));
    if (cols.length === 0) {
      console.warn('No .ts-column elements found on page.');
      return;
    }
    debug('initializing', cols.length, 'columns');

    const controllers = cols.map(initColumn);

    // Pause everything when page hidden to save CPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cols.forEach(c => c.classList.add('ts-hidden-pause'));
      } else {
        cols.forEach(c => c.classList.remove('ts-hidden-pause'));
      }
    });
  }

  // Run after full load (images/fonts ready)
  if (document.readyState === 'complete') {
    initAll();
  } else {
    window.addEventListener('load', initAll);
  }

  // optional: allow debug via window.__TS_DEBUG = true
})();
