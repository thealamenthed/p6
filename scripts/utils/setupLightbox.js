export const setupLightbox = () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxMediaContainer = document.getElementById("lightbox-media");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const mediaElements = document.querySelectorAll(
    ".media-content img, .media-content video"
  );

  const mediaData = Array.from(mediaElements).map((media) => {
    let src =
      media.tagName.toLowerCase() === "video"
        ? media.querySelector("source")?.src // Récupère la source de la balise <source>
        : media.src; // Récupère la source le media

    return {
      src: src || "", // Évite les valeurs indésirables dans les données si vide ou "undefined"
      title:
        media.closest(".media-card").querySelector(".media-title")
          ?.textContent || "Sans titre",
      type: media.tagName.toLowerCase(), // Détermine le type de média soit vidéo ou img
    };
  });

  let currentIndex = 0;

  const showLightbox = (index) => {
    const currentMedia = mediaData[index];

    lightboxMediaContainer.innerHTML = "";

    if (currentMedia.type === "img") {
      const imageElement = document.createElement("img");
      imageElement.src = currentMedia.src;
      imageElement.alt = currentMedia.title;
      imageElement.setAttribute("aria-label", currentMedia.title);
      lightboxMediaContainer.appendChild(imageElement);
    } else if (currentMedia.type === "video") {
      const videoElement = document.createElement("video");
      videoElement.controls = true;
      videoElement.setAttribute("aria-label", currentMedia.title);
      videoElement.autoplay = true;
      videoElement.muted = true;

      const sourceElement = document.createElement("source");
      sourceElement.src = currentMedia.src;
      sourceElement.type = "video/mp4"; // Ajoute un type valide

      videoElement.appendChild(sourceElement);
      lightboxMediaContainer.appendChild(videoElement);

      // Charge la vidéo avant de la lire
      videoElement.load();
      videoElement.play().catch((error) => {
        console.error("Erreur de lecture automatique :", error);
      });
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
    lightboxMediaContainer.innerHTML = "";
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
