import {displayPhotographerData} from "../utils/displayPhotographerData.js";
import {setupDropdown} from "../utils/setupDropdown.js";
import {displayTotalLikes} from "../utils/totalLikes.js";
import {displayPhotographerMedias} from "../utils/displayPhotographerMedias.js";
import {setupLightbox} from "../utils/setupLightbox.js";

// Attendre l'affichage des médias avant d'activer la lightbox
const init = async () => {
  await displayPhotographerData();
  await displayPhotographerMedias();
  setupDropdown();
  setupLightbox();
  displayTotalLikes();
};

init();
