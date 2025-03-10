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
  const lightboxTitle = document.querySelector(".lightbox-title");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // Récupère tous les médias et stocke leurs sources + titres
  const mediaElements = document.querySelectorAll(".media-content");
  const mediaData = Array.from(mediaElements).map((media) => ({
    src: media.src,
    title: media.getAttribute("data-title") || "Sans titre", // Utilise un attribut data-title
  }));

  let currentIndex = 0; // Index de l'image actuelle

  // Affiche une image et son titre dans la lightbox
  const showLightbox = (index) => {
    lightboxImg.src = mediaData[index].src;
    lightboxTitle.textContent = mediaData[index].title; // Affiche le titre
    lightbox.style.display = "flex";
    currentIndex = index;
  };

  // Ajoute un gestionnaire d'événements pour chaque image
  mediaElements.forEach((media, index) => {
    media.addEventListener("click", () => {
      showLightbox(index);
    });
  });

  // Bouton "Suivant"
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % mediaData.length;
    showLightbox(currentIndex);
  });

  // Bouton "Précédent"
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + mediaData.length) % mediaData.length;
    showLightbox(currentIndex);
  });

  // Ferme la lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Ferme en cliquant en dehors de l'image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Navigation avec le clavier
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") {
        nextBtn.click();
      } else if (e.key === "ArrowLeft") {
        prevBtn.click();
      } else if (e.key === "Escape") {
        closeBtn.click();
      }
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
