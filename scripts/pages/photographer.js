import {photographerTemplate} from "../templates/photographer.js";
import {getPhotographers} from "../utils/getPhotographers.js";

// Fonction pour récupérer l'ID du photographe dans l'URL
function getPhotographerId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // Récupère l'ID du photographe
}

// Fonction pour afficher les infos du photographe sur la page
async function displayPhotographerData() {
  const {photographers} = await getPhotographers(); // Récupère les données
  const photographerId = getPhotographerId(); // Récupère l'ID dans l'URL

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

  const nameElement = document.createElement("h1");
  nameElement.textContent = photographer.name;

  const locationElement = document.createElement("h2");
  locationElement.textContent = `${photographer.city}, ${photographer.country}`;

  const taglineElement = document.createElement("p");
  taglineElement.textContent = photographer.tagline;

  const priceElement = document.createElement("p");
  priceElement.textContent = `${photographer.price}€ / jour`;

  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", photographerModel.picture);
  imgElement.setAttribute("alt", `Portrait de ${photographer.name}`);
  imgElement.classList.add("photographer-img");

  // Ajout des éléments dans le header
  photographerInfo.appendChild(nameElement);
  photographerInfo.appendChild(locationElement);
  photographerInfo.appendChild(taglineElement);
  photographerInfo.appendChild(priceElement);

  photographHeader.prepend(imgElement);
  photographHeader.prepend(photographerInfo);
}

// Initialise la page
displayPhotographerData();
