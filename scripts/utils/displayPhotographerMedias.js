import {getPhotographerMedias} from "../api/getPhotographerMedias.js";
import {photographerMedias} from "../templates/photographerMediasTemplate.js";
import {getPhotographerId} from "../utils/getPhotographerId.js";
import {setupLightbox} from "../utils/setupLightbox.js";

// Affiche les médias du photographe
export const displayPhotographerMedias = async (tri = "popularité") => {
  const {media} = await getPhotographerMedias();
  const photographerId = getPhotographerId();

  // Filtre les médias pour chaque photographe
  const photographerMedia = await getTypesTri(tri, photographerId, media);

  const mediaContainer = document.getElementById(
    "photographer-all-medias-container"
  );
  mediaContainer.innerHTML = ""; // évite les doublons

  photographerMedia.forEach((mediaItem) => {
    // Utilisation de la factory pour créer le media element
    const mediaElement = photographerMedias(mediaItem).createMediaElement();

    // Ajout d'accessibilité
    mediaElement.setAttribute("tabindex", "0");
    mediaElement.setAttribute("role", "button");
    mediaElement.setAttribute("aria-label", "Ouvrir le média en grand");

    // Gestion de l'ouverture via "Enter"
    mediaElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        mediaElement.click();
      }
    });

    mediaContainer.appendChild(mediaElement);
  });
  setupLightbox();
};

// Action de tri sur le dropdown
const getTypesTri = async (tri, id, medias) => {
  if (tri === "popularité") {
    return medias
      .filter((media) => media.photographerId === parseInt(id))
      .sort((a, b) => b.likes - a.likes);
  } else if (tri === "date") {
    return medias
      .filter((media) => media.photographerId === parseInt(id))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (tri === "titre") {
    return medias
      .filter((media) => media.photographerId === parseInt(id))
      .sort((a, b) => a.title.localeCompare(b.title));
  }
};
