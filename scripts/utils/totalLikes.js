import {getPhotographerMedias} from "../api/getPhotographerMedias.js";
import {getPhotographerId} from "../utils/getPhotographerId.js";
import {updateTotalLikes} from "../utils/updateTotalLikes.js";

const totalLikes = async () => {
  const {media} = await getPhotographerMedias();

  const photographerId = getPhotographerId(); // Récupère l'ID du photographe

  // Filtrer les médias pour le photographe
  const photographerMedia = media.filter(
    (item) => item.photographerId == photographerId
  );

  let total = photographerMedia.reduce(
    (acc, current) => acc + current.likes,
    0
  );

  return total;
};

// export const displayTotalLikes = async () => {
//   let result = await totalLikes();

//   let displayElementTotal = document.querySelector(".total-likes");

//   displayElementTotal.innerHTML = result;

//   console.log("voici le total de likes : " + result);
// };

export const displayTotalLikes = () => {
  updateTotalLikes(); // Met à jour le total au chargement
};
