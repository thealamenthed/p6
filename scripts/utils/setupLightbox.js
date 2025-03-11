export const setupLightbox = () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxMediaContainer = document.getElementById("lightbox-media");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const mediaElements = document.querySelectorAll(".media-content");

  const mediaData = Array.from(mediaElements).map((media) => ({
    src: media.src,
    title: media.getAttribute("data-title") || "Sans titre",
    type: media.tagName.toLowerCase(), // On ajoute le type du média (img ou video)
  }));

  //console.log(mediaData);
  //console.log(mediaElements);

  let currentIndex = 0;

  const showLightbox = (index) => {
    console.log(mediaData);
    const currentMedia = mediaData[index];

    // Si le média est une image
    if (currentMedia.type === "img") {
      // Créer une balise image dans le conteneur lightbox
      const imageElement = document.createElement("img");
      imageElement.src = currentMedia.src;
      imageElement.alt = currentMedia.title;
      imageElement.setAttribute("aria-label", currentMedia.title);
      lightboxMediaContainer.innerHTML = ""; // Vider le conteneur
      lightboxMediaContainer.appendChild(imageElement); // Ajouter l'image
    }
    // Si le média est une vidéo
    else if (currentMedia.type === "video") {
      const videoElement = document.createElement("video");
      videoElement.src = currentMedia.src;
      videoElement.controls = true;
      videoElement.setAttribute("aria-label", currentMedia.title);
      lightboxMediaContainer.innerHTML = ""; // Vider le conteneur
      lightboxMediaContainer.appendChild(videoElement); // Ajouter la vidéo
    }

    lightboxTitle.textContent = currentMedia.title;
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.focus();
    currentIndex = index;
  };

  mediaElements.forEach((media, index) => {
    console.log(media, index);
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

    // Supprimer l'élément média (image ou vidéo) lorsque la lightbox se ferme
    lightboxMediaContainer.innerHTML = "";
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

const getMediaData = () => {
  const element = document.querySelectorAll(".media-content");

  return Array.from(element).map((media) => ({
    src: media.src,
    title: media.getAttribute("data-title") || "Sans titre",
    type: media.tagName.toLowerCase(), // On ajoute le type du média (img ou video)
  }));
};
