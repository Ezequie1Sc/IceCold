// ── PRODUCTS.JS ──

// Esperar a que el DOM esté completamente cargado
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
      console.log('⏳ Esperando que el carrusel de productos se cargue...');
      return false;
    }
  }

  // Intentar inicializar la galería inmediatamente
  let galleryInitialized = initGallery();
  
  // Si no se encontraron elementos, intentar de nuevo después de que se carguen los componentes
  if (!galleryInitialized) {
    // Intentar cada 500ms hasta que se cargue el contenido
    const checkInterval = setInterval(function() {
      const mainImage = document.getElementById('mainImage');
      if (mainImage) {
        clearInterval(checkInterval);
        initGallery();
        console.log('✅ Galería inicializada después de esperar');
      }
    }, 500);
    
    // Timeout de seguridad después de 10 segundos
    setTimeout(function() {
      clearInterval(checkInterval);
      console.log('⏱️ Timeout: No se pudo cargar la galería de productos');
    }, 10000);
  }

  // ── CARRUSEL DE PRODUCTOS (si existe) ──
  const track = document.getElementById('carouselTrack');
  if (track) {
    const slides = track.querySelectorAll('.product-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (slides.length > 0) {
      let currentIndex = 0;
      const totalSlides = slides.length;
      
      function updateCarousel(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          const nextIndex = (currentIndex + 1) % totalSlides;
          updateCarousel(nextIndex);
        });
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
          updateCarousel(prevIndex);
        });
      }
      
      dots.forEach(dot => {
        dot.addEventListener('click', function() {
          const index = parseInt(this.getAttribute('data-index'));
          updateCarousel(index);
        });
      });
    }
  }

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
      console.log('⏳ Esperando que el carrusel de productos se cargue...');
      return false;
    }
  }

  // Intentar inicializar la galería inmediatamente
  let galleryInitialized = initGallery();
  
  // Si no se encontraron elementos, intentar de nuevo después de que se carguen los componentes
  if (!galleryInitialized) {
    const checkInterval = setInterval(function() {
      const mainImage = document.getElementById('mainImage');
      if (mainImage) {
        clearInterval(checkInterval);
        initGallery();
        console.log('✅ Galería inicializada después de esperar');
      }
    }, 500);
    
    setTimeout(function() {
      clearInterval(checkInterval);
      console.log('⏱️ Timeout: No se pudo cargar la galería de productos');
    }, 10000);
  }
});
});