export const setupLightbox = () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const mediaElements = document.querySelectorAll(".media-content");

  const mediaData = Array.from(mediaElements).map((media) => ({
    src: media.src,
    title: media.getAttribute("data-title") || "Sans titre",
  }));

  let currentIndex = 0;

  const showLightbox = (index) => {
    lightboxImg.src = mediaData[index].src;
    lightboxTitle.textContent = mediaData[index].title;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.focus();
    currentIndex = index;
  };

  mediaElements.forEach((media, index) => {
    media.addEventListener("click", () => showLightbox(index));
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % mediaData.length;
    showLightbox(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
    showLightbox(currentIndex);
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeBtn.click();
    }
  });

  document.addEventListener(
    "keydown",
    (e) => {
      if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") closeBtn.click();
      }
    },
    {once: true}
  );
};
