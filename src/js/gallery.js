// ── GALLERY.JS ──

document.addEventListener('DOMContentLoaded', function() {
  
  // ── CARRUSEL DE TRABAJOS ──
  function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const currentSlideText = document.getElementById('currentSlide');
    const totalSlidesText = document.getElementById('totalSlides');
    
    // Verificar si los elementos existen
    if (!slides.length || !indicators.length) {
      console.log('⏳ Esperando que el carrusel se cargue...');
      return false;
    }
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Inicializar contador
    if (totalSlidesText) {
      totalSlidesText.textContent = String(totalSlides).padStart(2, '0');
    }
    
    function updateCarousel(index) {
      // Remover clase active del slide actual
      slides[currentIndex].classList.remove('active');
      indicators[currentIndex].classList.remove('active');
      
      // Pausar video si existe
      const currentVideo = slides[currentIndex].querySelector('video');
      if (currentVideo) {
        currentVideo.pause();
      }
      
      currentIndex = index;
      
      // Activar nuevo slide
      slides[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
      
      // Reproducir video si existe
      const newVideo = slides[currentIndex].querySelector('video');
      if (newVideo) {
        newVideo.currentTime = 0;
        newVideo.play().catch(() => {});
      }
      
      // Actualizar contador
      if (currentSlideText) {
        currentSlideText.textContent = String(currentIndex + 1).padStart(2, '0');
      }
      
      // Actualizar barra de progreso
      if (progressFill) {
        const progress = ((currentIndex + 1) / totalSlides) * 100;
        progressFill.style.width = `${progress}%`;
      }
    }
    
    // Event Listeners
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
    
    indicators.forEach(indicator => {
      indicator.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        if (index !== currentIndex) {
          updateCarousel(index);
        }
      });
    });
    
    // Teclas de dirección
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(nextIndex);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel(prevIndex);
      }
    });
    
    // Inicializar
    updateCarousel(0);
    console.log('✅ Carrusel de trabajos inicializado');
    return true;
  }

  // Intentar inicializar el carrusel inmediatamente
  let carouselInitialized = initCarousel();
  
  // Si no se encontraron elementos, intentar de nuevo cada 500ms
  if (!carouselInitialized) {
    const checkInterval = setInterval(function() {
      const slides = document.querySelectorAll('.carousel-slide');
      if (slides.length > 0) {
        clearInterval(checkInterval);
        initCarousel();
        console.log('✅ Carrusel inicializado después de esperar');
      }
    }, 500);
    
    // Timeout de seguridad después de 10 segundos
    setTimeout(function() {
      clearInterval(checkInterval);
      console.log('⏱️ Timeout: No se pudo cargar el carrusel de trabajos');
    }, 10000);
  }
});