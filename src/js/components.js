// Loads HTML partials into elements with data-component attribute
async function loadComponents() {
  const componentMap = {
    nav: 'src/components/nav.html',
    hero: 'src/components/hero.html',
    trust: 'src/components/trust.html',
    services: 'src/components/services.html',
    nosotros: 'src/components/nosotros.html',
    gallery: 'src/components/gallery.html',
    products: 'src/components/products.html',
    contact: 'src/components/contact.html',
    footer: 'src/components/footer.html'
  };

  const elements = document.querySelectorAll('[data-component]');
  
  for (const el of elements) {
    const name = el.getAttribute('data-component');
    const url = componentMap[name];
    
    if (url) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const html = await response.text();
          el.outerHTML = html;
        }
      } catch (err) {
        console.warn(`Failed to load component: ${name}`, err);
      }
    }
  }
}