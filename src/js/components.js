// ─────────────────────────────────────────────
//  components.js — v3
// ─────────────────────────────────────────────

async function loadComponents() {
  const componentMap = {
    nav:      'src/components/nav.html',
    hero:     'src/components/hero.html',
    trust:    'src/components/trust.html',
    services: 'src/components/services.html',
    nosotros: 'src/components/nosotros.html',
    gallery:  'src/components/gallery.html',
    products: 'src/components/products.html',
    contact:  'src/components/contact.html',
    footer:   'src/components/footer.html'
  };

  const elements = document.querySelectorAll('[data-component]');

  for (const el of elements) {
    const name = el.getAttribute('data-component');
    const url  = componentMap[name];
    if (!url) continue;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      el.outerHTML = html;
    } catch (err) {
      console.warn(`[components] Error cargando: ${name}`, err);
    }
  }

  // Lucide icons
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ✅ Inicializar nav DESPUÉS de que todos los componentes estén en el DOM
  // setTimeout(0) cede el control al browser para que procese el HTML insertado
  setTimeout(initNav, 0);
}

// ─────────────────────────────────────────────
//  initNav
// ─────────────────────────────────────────────
function initNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const drawer    = document.getElementById('nav-drawer');
  const overlay   = document.getElementById('nav-drawer-overlay');
  const closeBtn  = document.getElementById('nav-drawer-close');

  // Debug: ver qué encuentra
  console.log('[initNav] hamburger:', hamburger);
  console.log('[initNav] drawer:', drawer);
  console.log('[initNav] overlay:', overlay);
  console.log('[initNav] closeBtn:', closeBtn);

  if (!hamburger) { console.error('[initNav] ❌ No se encontró #nav-hamburger'); return; }
  if (!drawer)    { console.error('[initNav] ❌ No se encontró #nav-drawer');    return; }
  if (!overlay)   { console.error('[initNav] ❌ No se encontró #nav-drawer-overlay'); return; }

  // ── Funciones open/close ──
  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ── Listeners ──
  hamburger.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
    console.log('[initNav] ✅ closeBtn listener adjuntado');
  } else {
    console.error('[initNav] ❌ No se encontró #nav-drawer-close');
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeDrawer();
  });

  // ── Scroll suave ──
  const NAV_HEIGHT = 64;

  function smoothScrollTo(id) {
    const el = document.getElementById(id);
    if (!el) { console.warn('[scroll] Sección no encontrada:', id); return; }
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // Todos los links ancla: desktop + drawer
  document.querySelectorAll('.nav-links a[href^="#"], .nav-drawer-links a[href^="#"]')
    .forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        if (drawer.classList.contains('open')) {
          closeDrawer();
          setTimeout(() => smoothScrollTo(id), 320);
        } else {
          smoothScrollTo(id);
        }
      });
    });

  // ── Scroll effect en header ──
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  console.log('[initNav] ✅ Todo inicializado correctamente');
}

document.addEventListener('DOMContentLoaded', loadComponents);