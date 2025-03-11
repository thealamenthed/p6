import {photographerTemplate} from "../templates/index.js";
import {getPhotographers} from "../api/getPhotographers.js";
import {getPhotographerId} from "../utils/getPhotographerId.js";

// Affiche les infos du photographe sur la page
export const displayPhotographerData = async () => {
  const {photographers} = await getPhotographers();
  const photographerId = getPhotographerId();
  const photographer = photographers.find((p) => p.id == photographerId); // Cherche dans la liste le photographe correspondant à cet ID

  if (!photographer) {
    console.error("Photographe non trouvé !");
    return;
  }

  const photographerModel = photographerTemplate(photographer);
  const photographHeader = document.querySelector(".photograph-header");

  // Génération des éléments HTML via un fragment (meilleure perf)
  const fragment = document.createDocumentFragment();
  const photographerInfo = document.createElement("div");
  photographerInfo.classList.add("photographer-info");

  photographerInfo.innerHTML = `
    <h2>${photographer.name}</h2>
    <h3>${photographer.city}, ${photographer.country}</h3>
    <p>${photographer.tagline}</p>
  `;

  const imgElement = document.createElement("img");
  imgElement.src = photographerModel.picture;
  imgElement.alt = `Portrait de ${photographer.name}`;
  imgElement.classList.add("photographer-img");

  fragment.appendChild(photographerInfo);
  fragment.appendChild(imgElement);
  photographHeader.prepend(fragment);

  document.querySelector(
    ".price"
  ).textContent = `${photographer.price}€ / jour`;
};
