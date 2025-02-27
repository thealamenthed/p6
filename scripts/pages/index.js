import {getPhotographers} from "../api/getPhotographers.js";
import {photographerTemplate} from "../templates/index.js";

// Fonction pour afficher les données des photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  // Parcours chaque photographe et créer une carte pour chacun
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Fonction d'initialisation
async function init() {
  // Récupère les données des photographes
  const {photographers} = await getPhotographers();

  // Affiche les données
  displayData(photographers);
}

// Démarre l'application
init();
