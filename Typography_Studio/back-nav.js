/**
 * Typography Studio — Standalone Back Nav
 * Injected automatically when a sub-page is opened directly (file:// protocol).
 * Has no effect when the SPA router loads the page via fetch (http://).
 */
(function () {
  // Only activate when opened as a standalone file
  if (window.location.protocol !== 'file:') return;
  // Don't inject if the SPA global nav is already present
  if (document.getElementById('nav')) return;

  const style = document.createElement('style');
  style.textContent = `
    #ts-back-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
      display: flex; align-items: center; gap: 1rem;
      padding: 0.6rem 1.25rem;
      background: rgba(10,10,10,0.92);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    #ts-back-nav a {
      color: #fff;
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      opacity: 0.85;
      transition: opacity 0.15s;
    }
    #ts-back-nav a:hover { opacity: 1; }
    #ts-back-nav .ts-logo {
      font-size: 0.88rem;
      font-weight: 700;
      background: linear-gradient(135deg, #6366f1, #a5b4fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    #ts-back-nav .ts-sep { color: rgba(255,255,255,0.25); font-size: 0.75rem; }
    #ts-back-nav .ts-nav-links { display: flex; gap: 1rem; margin-left: auto; }
    body { padding-top: 44px; }
  `;
  document.head.appendChild(style);

  // Determine depth to root (part1/ and part2/ are one level deep)
  const depth = window.location.pathname.split('/').length - 1;
  const root = depth > 1 ? '../index.html' : 'index.html';

  const nav = document.createElement('nav');
  nav.id = 'ts-back-nav';
  nav.setAttribute('aria-label', 'Typography Studio navigation');
  nav.innerHTML = `
    <a class="ts-logo" href="${root}">Typography Studio</a>
    <span class="ts-sep">›</span>
    <a href="${root}">Home</a>
    <div class="ts-nav-links">
      <a href="../part1/anatomy.html">Anatomy</a>
      <a href="../part1/classification.html">Classification</a>
      <a href="../part1/psychology.html">Psychology</a>
      <a href="../part2/poster.html">Showcase</a>
      <a href="../part2/brand.html">Brand</a>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
})();
