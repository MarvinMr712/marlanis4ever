document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".card");
  const images = document.querySelectorAll(".card img");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  let interval = null;

  /* ANIMACIÓN SCROLL */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  cards.forEach(card => observer.observe(card));

  /* ABRIR */
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      lightbox.classList.add("active");
      showImage();
    });
  });

  function showImage() {
    lightboxImg.style.opacity = "0";
    lightboxImg.style.transform = "scale(0.95)";

    setTimeout(() => {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.style.opacity = "1";
      lightboxImg.style.transform = "scale(1)";
      updateArrows();
    }, 200);
  }

  function updateArrows() {
    prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    nextBtn.style.display = currentIndex === images.length - 1 ? "none" : "block";
  }

  function moveNext() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      showImage();
    }
  }

  function movePrev() {
    if (currentIndex > 0) {
      currentIndex--;
      showImage();
    }
  }

  nextBtn.addEventListener("click", moveNext);
  prevBtn.addEventListener("click", movePrev);

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
      lightbox.classList.remove("active");
    }
  });

  /* SWIPE */
  let startX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    let diff = startX - e.changedTouches[0].clientX;

    if (diff > 50) moveNext();
    else if (diff < -50) movePrev();
  });

  /* TECLADO */
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
      moveNext();
      startHolding("right");
    }

    if (e.key === "ArrowLeft") {
      movePrev();
      startHolding("left");
    }

    if (e.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });

  document.addEventListener("keyup", () => {
    clearInterval(interval);
  });

  function startHolding(direction) {
    clearInterval(interval);

    interval = setInterval(() => {
      if (direction === "right") moveNext();
      else movePrev();
    }, 200);
  }

});