export const setupLightbox = () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxMediaContainer = document.getElementById("lightbox-media");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const mediaElements = document.querySelectorAll(
    ".media-content img, .media-content video"
  ); // Sélectionne les images et vidéos

  const mediaData = Array.from(mediaElements).map((media) => ({
    src: media.src,
    title:
      media.closest(".media-card").querySelector(".media-title").textContent ||
      "Sans titre", // Récupère le titre du média depuis son parent
    type: media.tagName.toLowerCase(),
  }));

  let currentIndex = 0;

  const showLightbox = (index) => {
    const currentMedia = mediaData[index];

    lightboxMediaContainer.innerHTML = ""; // Nettoie le conteneur

    if (currentMedia.type === "img") {
      const imageElement = document.createElement("img");
      imageElement.src = currentMedia.src;
      imageElement.alt = currentMedia.title;
      imageElement.setAttribute("aria-label", currentMedia.title);
      lightboxMediaContainer.appendChild(imageElement);
    } else if (currentMedia.type === "video") {
      const videoElement = document.createElement("video");
      videoElement.src = currentMedia.src;
      videoElement.controls = true;
      videoElement.setAttribute("aria-label", currentMedia.title);
      lightboxMediaContainer.appendChild(videoElement);
    }

    lightboxTitle.textContent = currentMedia.title;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.focus();
    currentIndex = index;
  };

  // Ajout du clic et du focus clavier (Enter et Espace)
  mediaElements.forEach((media, index) => {
    media.addEventListener("click", () => showLightbox(index));

    media.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showLightbox(index);
      }
    });
  });

  nextBtn.setAttribute("aria-label", "Image suivante");
  prevBtn.setAttribute("aria-label", "Image précédente");
  closeBtn.setAttribute("aria-label", "Fermer la lightbox");

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
    lightboxMediaContainer.innerHTML = ""; // Supprime le contenu
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeBtn.click();
    }
  });

  // Gestion des touches clavier pour la navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") nextBtn.click();
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "Escape") closeBtn.click();
    }
  });
};
