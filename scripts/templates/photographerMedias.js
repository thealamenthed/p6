import {updateTotalLikes} from "../utils/updateTotalLikes.js";

export const photographerMedias = (mediaData) => {
  const {id, photographerId, title, image, video, likes, date, price} =
    mediaData;

  const mediaPath = image
    ? `/assets/photographers/${photographerId}/${image}`
    : `/assets/photographers/${photographerId}/${video}`;

  const createMediaElement = () => {
    const mediaElement = document.createElement("article");
    mediaElement.classList.add("media-card");

    let media;
    if (image) {
      media = document.createElement("img");
      media.src = mediaPath;
      media.alt = title;
    } else if (video) {
      media = document.createElement("video");
      media.src = mediaPath;
      media.controls = true;
    }
    media.classList.add("media-content");

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("media-info");

    const titleElement = document.createElement("p");
    titleElement.textContent = title;
    titleElement.classList.add("media-title");

    const likeContainer = document.createElement("span");
    likeContainer.classList.add("like-container");

    const likeElement = document.createElement("span");
    likeElement.textContent = likes;
    likeElement.classList.add("like-count");

    const heartIcon = document.createElement("img");
    heartIcon.src = "/assets/icons/heart-red.svg";
    heartIcon.alt = "Like";
    heartIcon.classList.add("heart-icon");

    // Ajout de l'interaction "Like" et mise à jour du total des likes
    heartIcon.addEventListener("click", () => {
      let currentLikes = parseInt(likeElement.textContent, 10);

      if (!heartIcon.classList.contains("liked")) {
        likeElement.textContent = currentLikes + 1;
        heartIcon.classList.add("liked");
      } else {
        likeElement.textContent = currentLikes - 1;
        heartIcon.classList.remove("liked");
      }

      updateTotalLikes(); // Recalcule le total des likes après chaque clic
    });

    likeContainer.appendChild(likeElement);
    likeContainer.appendChild(heartIcon);

    infoContainer.appendChild(titleElement);
    infoContainer.appendChild(likeContainer);

    mediaElement.appendChild(media);
    mediaElement.appendChild(infoContainer);

    return mediaElement;
  };

  return {
    id,
    photographerId,
    title,
    mediaPath,
    likes,
    date,
    price,
    createMediaElement,
  };
};
