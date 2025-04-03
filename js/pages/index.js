import {getPhotographers} from "../api/getPhotographers.js";
import {displayData} from "../utils/displayData.js";

// Initialisation
const init = async () => {
  // Récupère les données des photographes
  const {photographers} = await getPhotographers();

  // Affiche les données
  displayData(photographers);
};

// Démarre l'application
init();
