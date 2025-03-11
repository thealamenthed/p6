import {getPhotographerMedias} from "../api/getPhotographerMedias.js";
import {photographerMedias} from "../templates/photographerMedias.js";
import {getPhotographerId} from "../utils/getPhotographerId.js";

// Affiche les médias du photographe
export const displayPhotographerMedias = async (tri = "popularité") => {
  const {media} = await getPhotographerMedias(); // Récupère les médias du photographe
  const photographerId = getPhotographerId(); // Récupère l'ID du photographe

  // Filtre les médias pour chaque photographe
  const photographerMedia = await getTypesTri(tri, photographerId, media);

  const mediaContainer = document.getElementById(
    "photographer-all-medias-container"
  );
  mediaContainer.innerHTML = ""; // évite les doublonsmedias

  // Crée et ajoute chaque média dans le conteneur
  photographerMedia.forEach((mediaItem) => {
    const mediaElement = photographerMedias(mediaItem).createMediaElement();

    // ******* Ajout d'accessibilité **
    mediaElement.setAttribute("tabindex", "0"); // Rendre focusable au clavier
    mediaElement.setAttribute("role", "button"); // Indique que c'est interactif
    mediaElement.setAttribute("aria-label", "Ouvrir le média en grand"); // Aide les lecteurs d'écran

    // **Gestion de l'ouverture via "Enter"**
    mediaElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        mediaElement.click(); // Simule un clic
      }
    });

    mediaContainer.appendChild(mediaElement);
  });
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
