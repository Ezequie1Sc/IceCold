// ─────────────────────────────────────────────
//  components.js — CORRECCIÓN FINAL
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

  const elements = Array.from(document.querySelectorAll('[data-component]'));

  for (const el of elements) {
    const name = el.getAttribute('data-component');
    const url  = componentMap[name];
    if (!url) continue;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();

      const template = document.createElement('template');
      template.innerHTML = html.trim();

      const parent = el.parentNode;
      Array.from(template.content.childNodes).forEach(node => {
        parent.insertBefore(node.cloneNode(true), el);
      });

      el.remove();

    } catch (err) {
      console.warn(`[components] Error cargando: ${name}`, err);
    }
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();

  // ESPERAR A QUE TODO EL DOM ESTÉ LISTO
  setTimeout(initNav, 200);
}

// ─────────────────────────────────────────────
//  initNav (INCLUIDO AQUÍ PARA EVITAR DUPLICADOS)
// ─────────────────────────────────────────────
function initNav() {
  console.log('🔍 Iniciando NAV...');
  
  const hamburger = document.getElementById('nav-hamburger');
  const drawer    = document.getElementById('nav-drawer');
  const overlay   = document.getElementById('nav-drawer-overlay');
  const closeBtn  = document.getElementById('nav-drawer-close');

  // DEBUG: Verificar si los elementos existen
  console.log('✅ Hamburger:', hamburger);
  console.log('✅ Drawer:', drawer);
  console.log('✅ Overlay:', overlay);
  console.log('✅ CloseBtn:', closeBtn);

  if (!hamburger || !drawer || !overlay) {
    console.error('❌ Elementos del nav NO encontrados');
    return;
  }

  function openDrawer() {
    console.log('🟢 Abriendo drawer');
    drawer.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    console.log('🔴 Cerrando drawer');
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeDrawer();
  });

  // Scroll suave
  const NAV_HEIGHT = 64;

  function smoothScrollTo(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  }

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

  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  console.log('✅ NAV inicializado correctamente');
}

document.addEventListener('DOMContentLoaded', loadComponents);