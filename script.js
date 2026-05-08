document.addEventListener("DOMContentLoaded", () => {

  const meses = document.querySelectorAll(".mes");
  const filtro = document.getElementById("filtro");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  let currentImages = [];

  /* ===== FILTRO ===== */
  filtro.addEventListener("change", () => {
    const value = filtro.value;

    meses.forEach(mes => {
      mes.style.display =
        value === "all" || mes.dataset.fecha === value
          ? "block"
          : "none";
    });

    // Cerrar lightbox si está abierto al cambiar filtro
    if (lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
    }
  });

  /* ===== OBTENER IMÁGENES VISIBLES ===== */
  function actualizarImagenesVisibles() {
    const imagenes = [];
    meses.forEach(mes => {
      const estilo = window.getComputedStyle(mes);
      if (estilo.display !== "none") {
        const imgs = mes.querySelectorAll("img");
        imgs.forEach(img => imagenes.push(img));
      }
    });
    currentImages = imagenes;
  }

  /* ===== MOSTRAR IMAGEN EN LIGHTBOX ===== */
  function mostrarImagen() {
    if (currentImages.length > 0 && currentImages[currentIndex]) {
      lightboxImg.src = currentImages[currentIndex].src;
      actualizarFlechas();
    }
  }

  /* ===== MOSTRAR/OCULTAR FLECHAS ===== */
  function actualizarFlechas() {
    // Navegación lineal: ocultar flechas en los extremos
    if (currentIndex === 0) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "flex";
    }
    
    if (currentIndex === currentImages.length - 1) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "flex";
    }
  }

  /* ===== NAVEGACIÓN ===== */
  function siguienteImagen() {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      mostrarImagen();
    }
  }

  function anteriorImagen() {
    if (currentIndex > 0) {
      currentIndex--;
      mostrarImagen();
    }
  }

  /* ===== ABRIR LIGHTBOX ===== */
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      
      actualizarImagenesVisibles();
      currentIndex = currentImages.indexOf(e.target);
      
      if (currentIndex !== -1) {
        lightbox.classList.add("active");
        mostrarImagen();
      }
    });
  });

  /* ===== EVENTOS BOTONES ===== */
  nextBtn.addEventListener("click", siguienteImagen);
  prevBtn.addEventListener("click", anteriorImagen);

  /* ===== CERRAR LIGHTBOX ===== */
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  /* ===== NAVEGACIÓN POR TECLADO ===== */
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    switch(e.key) {
      case "ArrowRight":
        e.preventDefault();
        siguienteImagen();
        break;
      case "ArrowLeft":
        e.preventDefault();
        anteriorImagen();
        break;
      case "Escape":
        lightbox.classList.remove("active");
        break;
    }
  });

  /* ===== SWIPE EN MÓVIL ===== */
  let touchStartX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    if (!lightbox.classList.contains("active")) return;
    
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        siguienteImagen();
      } else {
        anteriorImagen();
      }
    }
  });

  // Inicializar imágenes visibles
  actualizarImagenesVisibles();

});