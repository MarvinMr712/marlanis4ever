document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".card");
  const images = document.querySelectorAll(".card img");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");

  /* ===== ANIMACIÓN SCROLL ===== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => observer.observe(card));

  /* ===== LIGHTBOX ===== */
  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
    });
  });

  /* CERRAR BOTÓN */
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  /* CERRAR AL HACER CLICK FUERA */
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove("active");
    }
  });

});