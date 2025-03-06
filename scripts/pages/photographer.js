import {photographerTemplate} from "../templates/index.js";
import {getPhotographers} from "../api/getPhotographers.js";
import {getPhotographerMedias} from "../api/getPhotographerMedias.js";
import {setupDropdown} from "../utils/setupDropdown.js";
import {displayTotalLikes} from "../utils/totalLikes.js";
import {getPhotographerId} from "../utils/getPhotographerId.js";
import {displayPhotographerMedias} from "../utils/displayPhotographerMedias.js";

// Affiche les infos du photographe sur la page
const displayPhotographerData = async () => {
  const {photographers} = await getPhotographers(); // Récupère les données
  const photographerId = getPhotographerId(); // Récupère l'ID ds l'URL

  // Trouve le photographe correspondant
  const photographer = photographers.find((p) => p.id == photographerId);

  if (!photographer) {
    console.error("Photographe non trouvé !");
    return;
  }

  // Génère le template du photographe
  const photographerModel = photographerTemplate(photographer);

  // Sélectionne le header
  const photographHeader = document.querySelector(".photograph-header");

  // Crée les éléments HTML du photographe
  const photographerInfo = document.createElement("div");
  photographerInfo.classList.add("photographer-info");

  const nameElement = document.createElement("h2");
  nameElement.textContent = photographer.name;

  const locationElement = document.createElement("h3");
  locationElement.textContent = `${photographer.city}, ${photographer.country}`;

  const taglineElement = document.createElement("p");
  taglineElement.textContent = photographer.tagline;

  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", photographerModel.picture);
  imgElement.setAttribute("alt", `Portrait de ${photographer.name}`);
  imgElement.classList.add("photographer-img");

  const priceElement = document.querySelector(".price");
  priceElement.textContent = `${photographer.price}€ / jour`;

  // Ajout des éléments dans le header
  photographerInfo.appendChild(nameElement);
  photographerInfo.appendChild(locationElement);
  photographerInfo.appendChild(taglineElement);
  // photographerInfo.appendChild(priceElement);

  photographHeader.prepend(imgElement);
  photographHeader.prepend(photographerInfo);
};

const setupLightbox = () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const mediaElements = document.querySelectorAll(".media-content");

  mediaElements.forEach((media) => {
    media.addEventListener("click", () => {
      lightbox.style.display = "flex"; // Affiche la lightbox
      lightboxImg.src = media.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none"; // Ferme la lightbox
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none"; // Ferme aussi en cliquant en dehors de l'image
    }
  });
};

// Attendre l'affichage des médias avant d'activer la lightbox
const init = async () => {
  await displayPhotographerData();
  await displayPhotographerMedias();
  setupDropdown();
  setupLightbox(); // Maintenant, les images existent bien

  displayTotalLikes();
};

init();
