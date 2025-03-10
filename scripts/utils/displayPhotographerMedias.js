import {getPhotographerMedias} from "../api/getPhotographerMedias.js";
import {photographerMedias} from "../templates/photographerMedias.js";
import {getPhotographerId} from "../utils/getPhotographerId.js";

// Affiche les médias du photographe
export const displayPhotographerMedias = async () => {
  const {media} = await getPhotographerMedias(); // Récupère les médias du photographe
  const photographerId = getPhotographerId(); // Récupère l'ID du photographe

  // Filtrer les médias pour le photographe
  const photographerMedia = media.filter(
    (item) => item.photographerId == photographerId
  );

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
