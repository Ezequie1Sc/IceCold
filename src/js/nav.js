document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressFill = document.getElementById('progressFill');
  const currentSlideEl = document.getElementById('currentSlide');
  const totalSlidesEl = document.getElementById('totalSlides');
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;
  const AUTO_PLAY_DELAY = 5000;
  let isTransitioning = false;
  
  totalSlidesEl.textContent = String(totalSlides).padStart(2, '0');
  
  function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;
    isTransitioning = true;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    currentIndex = index;
    
    setTimeout(() => {
      slides[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
      currentSlideEl.textContent = String(currentIndex + 1).padStart(2, '0');
      
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
      setTimeout(() => {
        progressFill.style.transition = `width ${AUTO_PLAY_DELAY}ms linear`;
        progressFill.style.width = '100%';
      }, 50);
      
      isTransitioning = false;
    }, 100);
  }
  
  function nextSlide() {
    if (isTransitioning) return;
    const nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  }
  
  function prevSlide() {
    if (isTransitioning) return;
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  }
  
  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
  }
  
  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }
  
  nextBtn.addEventListener('click', function() {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });
  
  prevBtn.addEventListener('click', function() {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });
  
  indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      if (index !== currentIndex) {
        stopAutoPlay();
        goToSlide(index);
        startAutoPlay();
      }
    });
  });
  
  const carousel = document.querySelector('.carousel-wrapper');
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowLeft') {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    }
  });
  
  setTimeout(() => {
    progressFill.style.transition = `width ${AUTO_PLAY_DELAY}ms linear`;
    progressFill.style.width = '100%';
  }, 100);
  
  startAutoPlay();
});