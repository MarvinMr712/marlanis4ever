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

  /* FILTRO */
  filtro.addEventListener("change", () => {
    const value = filtro.value;

    meses.forEach(mes => {
      mes.style.display =
        value === "all" || mes.dataset.fecha === value
          ? "block"
          : "none";
    });
  });

  /* IMÁGENES VISIBLES */
  function updateImagesList() {
    return [...document.querySelectorAll(".mes:not([style*='none']) img")];
  }

  /* ABRIR */
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      currentImages = updateImagesList();
      currentIndex = currentImages.indexOf(e.target);

      lightbox.classList.add("active");
      showImage();
    }
  });

  function showImage() {
    lightboxImg.src = currentImages[currentIndex].src;

    prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    nextBtn.style.display =
      currentIndex === currentImages.length - 1 ? "none" : "block";
  }

  function moveNext() {
    if (currentIndex < currentImages.length - 1) {
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

  nextBtn.onclick = moveNext;
  prevBtn.onclick = movePrev;

  closeBtn.onclick = () => lightbox.classList.remove("active");

});