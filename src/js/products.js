// ── PRODUCTS.JS ──

document.addEventListener('DOMContentLoaded', function() {
  
  // ── GALERÍA DE IMÁGENES ──
  function initGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbBtns = document.querySelectorAll('.thumb-btn');
    
    if (mainImage && thumbBtns.length > 0) {
      thumbBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const imgSrc = this.getAttribute('data-img');
          if (imgSrc) {
            mainImage.src = imgSrc;
            
            // Actualizar clase active
            thumbBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
          }
        });
      });
      console.log('✅ Galería de imágenes inicializada');
      return true;
    } else {
      console.log('⏳ Esperando que la galería de productos se cargue...');
      return false;
    }
  }

  // ── SELECTOR DE CAPACIDAD ──
  function initCapacitySelector() {
    const capacityBtns = document.querySelectorAll('.capacity-btn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappText = document.getElementById('whatsappText');
    
    if (capacityBtns.length > 0 && whatsappBtn) {
      capacityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remover clase active de todos
          capacityBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          // Obtener datos
          const capacity = this.getAttribute('data-capacity');
          const btu = this.getAttribute('data-btu');
          const model = this.getAttribute('data-model');
          
          // Actualizar botón WhatsApp con mensaje personalizado
          const text = 'Hola%2C%20quiero%20pedir%20un%20aire%20acondicionado%20Mirage%20LiFE%20' + encodeURIComponent(capacity) + '%20(' + model + '%20-%20' + encodeURIComponent(btu) + ')';
          whatsappBtn.href = 'https://wa.me/529991403113?text=' + text;
          whatsappText.textContent = 'Pedir ahora';
        });
      });
      console.log('✅ Selector de capacidad inicializado');
      return true;
    } else {
      console.log('⏳ Esperando que el selector de capacidad se cargue...');
      return false;
    }
  }

  // ── ACORDEÓN DE AYUDA ──
  function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
      accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
          const body = this.nextElementSibling;
          const isOpen = this.getAttribute('aria-expanded') === 'true';
          
          // Cerrar todos los acordeones
          accordionHeaders.forEach(h => {
            h.setAttribute('aria-expanded', 'false');
            h.nextElementSibling.classList.remove('open');
          });
          
          // Abrir el actual si estaba cerrado
          if (!isOpen) {
            this.setAttribute('aria-expanded', 'true');
            body.classList.add('open');
          }
        });
      });
      console.log('✅ Acordeón inicializado');
      return true;
    } else {
      console.log('⏳ Esperando que el acordeón se cargue...');
      return false;
    }
  }

  // ── INICIALIZAR TODO ──
  function initAll() {
    // Intentar inicializar inmediatamente
    let galleryReady = initGallery();
    let selectorReady = initCapacitySelector();
    let accordionReady = initAccordion();
    
    // Si falta algún elemento, esperar y reintentar
    if (!galleryReady || !selectorReady || !accordionReady) {
      const checkInterval = setInterval(function() {
        const mainImage = document.getElementById('mainImage');
        const capacityBtns = document.querySelectorAll('.capacity-btn');
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        if (mainImage && capacityBtns.length > 0 && accordionHeaders.length > 0) {
          clearInterval(checkInterval);
          initGallery();
          initCapacitySelector();
          initAccordion();
          console.log('✅ Todo inicializado después de esperar');
        }
      }, 500);
      
      // Timeout de seguridad después de 10 segundos
      setTimeout(function() {
        clearInterval(checkInterval);
        console.log('⏱️ Timeout: No se pudieron cargar todos los elementos');
      }, 10000);
    }
  }

  // Iniciar
  initAll();
});