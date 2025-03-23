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
    // Création d’un tableau de données mediaData
    let src =
      media.tagName.toLowerCase() === "video"
        ? media.querySelector("source")?.src // Récupère la source de la balise <source>
        : media.src; // Récupère l’URL de la source du média (vidéo ou image)

    return {
      src: src || "", // Évite les valeurs indésirables dans les données si vide ou "undefined"
      title:
        media.closest(".media-card").querySelector(".media-title") // Cherche le titre du média dans .media-title
          ?.textContent || "Sans titre",
      type: media.tagName.toLowerCase(), // Détermine le type de média soit vidéo ou img, Enregistre le type (img ou video).
    };
  });

  let currentIndex = 0; // Pour garder en mémoire l’élément actuellement affiché

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
      videoElement.autoplay = false;
      videoElement.muted = true;

      const sourceElement = document.createElement("source");
      sourceElement.src = currentMedia.src; // Assigne la bonne source AVANT d'ajouter au DOM
      sourceElement.type = "video/mp4"; // Ajoute un type valide

      videoElement.appendChild(sourceElement);
      lightboxMediaContainer.appendChild(videoElement);

      videoElement.addEventListener("canplay", () => {
        videoElement.play().catch((error) => {
          console.error("Erreur de lecture automatique :", error);
        });
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
    increment();
  });

  prevBtn.addEventListener("click", () => {
    decrement();
  });
  //Fermeture de la lightbox
  closeBtn.addEventListener("click", () => {
    document.activeElement.blur(); // Supprime le focus sur l'élément actif

    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", "true");
    lightboxMediaContainer.innerHTML = "";
  });

  //Clic en dehors de l’image pour fermer
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeBtn.click();
    }
  });

  // Gestion des touches clavier pour la navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") increment();
      if (e.key === "ArrowLeft") decrement();
      if (e.key === "Escape") closeBtn.click();
    }
  });

  const increment = () => {
    currentIndex = (currentIndex + 1) % mediaData.length; //Incrémente currentIndex et affiche le média suivant

    showLightbox(currentIndex);
  };

  const decrement = () => {
    currentIndex = (currentIndex - 1 + mediaData.length) % mediaData.length; //Décrémente currentIndex, avec gestion des boucles (dernier ➝ premier et inversement)
    showLightbox(currentIndex);
  };
};
