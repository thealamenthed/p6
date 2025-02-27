import {getPhotographerMedias} from "../api/getPhotographerMedias.js";
import {photographerMedias} from "../templates/photographerMedias.js";
import {getPhotographerId} from "../utils/getPhotographerId.js";

// Fonction pour afficher les médias du photographe
export async function displayPhotographerMedias() {
  const {media} = await getPhotographerMedias(); // Récupère les médias du photographe
  const photographerId = getPhotographerId(); // Récupère l'ID du photographe

  // Filtrer les médias pour le photographe
  const photographerMedia = media.filter(
    (item) => item.photographerId == photographerId
  );

  // Sélectionne le conteneur des médias
  const mediaContainer = document.getElementById(
    "photographer-all-medias-container"
  );
  mediaContainer.innerHTML = ""; // Efface le contenu existant pour éviter les doublonsmedias

  // Crée et ajoute chaque média dans le conteneur
  photographerMedia.forEach((mediaItem) => {
    const mediaElement = photographerMedias(mediaItem).createMediaElement();
    mediaContainer.appendChild(mediaElement);
  });
}
