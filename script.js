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
  });

  /* ===== OBTENER IMAGENES VISIBLES ===== */
  function getImages() {
    return [...document.querySelectorAll(".mes:not([style*='none']) img")];
  }

  /* ===== ABRIR LIGHTBOX ===== */
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      currentImages = getImages();
      currentIndex = currentImages.indexOf(e.target);

      lightbox.classList.add("active");
      showImage();
    }
  });

  function showImage() {
    lightboxImg.src = currentImages[currentIndex].src;
    updateArrows();
  }

  function updateArrows() {
    prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    nextBtn.style.display = currentIndex === currentImages.length - 1 ? "none" : "block";
  }

  function next() {
    if (currentIndex < currentImages.length - 1) {
      currentIndex++;
      showImage();
    }
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      showImage();
    }
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  /* ===== CERRAR ===== */
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  /* ===== SWIPE CELULAR ===== */
  let startX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    let diff = startX - e.changedTouches[0].clientX;

    if (diff > 50) next();
    else if (diff < -50) prev();
  });

});