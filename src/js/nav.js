document.addEventListener("DOMContentLoaded", () => {
  // ── SELECCIÓN DE ELEMENTOS DE INTERFAZ ──
  const slides = document.querySelectorAll(".carousel-slide");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const indicators = document.querySelectorAll(".indicators .indicator");
  const progressFill = document.getElementById("progressFill");
  const currentSlideText = document.getElementById("currentSlide");
  const totalSlidesText = document.getElementById("totalSlides");

  let currentIdx = 0;
  const totalSlides = slides.length;

  // Inicializar el contador total con formato de dos dígitos (ej: 05)
  if (totalSlidesText) {
    totalSlidesText.textContent = String(totalSlides).padStart(2, "0");
  }

  // ── FUNCIÓN CENTRAL DE ACTUALIZACIÓN DE DIAPOSITIVAS ──
  function updateCarousel(targetIdx) {
    // 1. Quitar estado activo al slide e indicador anterior
    slides[currentIdx].classList.remove("active");
    if (indicators[currentIdx]) {
      indicators[currentIdx].classList.remove("active");
    }

    // Pausar video si la diapositiva saliente contenía uno
    const currentVideo = slides[currentIdx].querySelector("video");
    if (currentVideo) {
      currentVideo.pause();
    }

    // Actualizar el índice al objetivo
    currentIdx = targetIdx;

    // 2. Añadir estado activo al nuevo slide e indicador coincidente
    slides[currentIdx].classList.add("active");
    if (indicators[currentIdx]) {
      indicators[currentIdx].classList.add("active");
    }

    // Reproducir video si la nueva diapositiva activa contiene uno
    const nextVideo = slides[currentIdx].querySelector("video");
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(err => console.log("Auto-play prevenido por navegador:", err));
    }

    // 3. Actualizar elementos de UI de Texto (Contador '01', '02'...)
    if (currentSlideText) {
      currentSlideText.textContent = String(currentIdx + 1).padStart(2, "0");
    }

    // 4. Actualizar barra de progreso azul superior de manera proporcional
    if (progressFill) {
      const progressPercent = ((currentIdx + 1) / totalSlides) * 100;
      progressFill.style.width = `${progressPercent}%`;
    }
  }

  // ── EVENTOS DE CONTROL (BOTONES NAVEGADORES) ──
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      // Ciclo infinito circular hacia adelante
      let nextIdx = currentIdx + 1;
      if (nextIdx >= totalSlides) nextIdx = 0;
      updateCarousel(nextIdx);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      // Ciclo infinito circular hacia atrás
      let prevIdx = currentIdx - 1;
      if (prevIdx < 0) prevIdx = totalSlides - 1;
      updateCarousel(prevIdx);
    });
  }

  // ── EVENTOS PARA INDICADORES DIRECTOS (DOTS) ──
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      const clickedIdx = parseInt(e.target.getAttribute("data-index"), 10);
      if (!isNaN(clickedIdx) && clickedIdx !== currentIdx) {
        updateCarousel(clickedIdx);
      }
    });
  });

  // ── EJECUCIÓN INICIAL / ARRANQUE DE INTERFAZ ──
  updateCarousel(0);
});