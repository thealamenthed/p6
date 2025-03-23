import {MediaFactory} from "../factories/MediasFactory.js";
import {updateTotalLikes} from "../utils/updateTotalLikes.js";

export const photographerMedias = (mediasData) => {
  const {id, photographerId, title, image, video, likes, date, price} =
    mediasData;

  const mediaPath = image
    ? `/assets/photographers/${photographerId}/${image}`
    : `/assets/photographers/${photographerId}/${video}`;

  // Utilisation de la MediaFactory pour créer un élément média (image ou vidéo)
  const mediaElement = new MediaFactory(mediasData).createMediaElement();

  const createMediaElement = () => {
    const mediaContainer = document.createElement("article");
    mediaContainer.classList.add("media-card");

    const mediaContent = document.createElement("div");
    mediaContent.classList.add("media-content");
    mediaContainer.setAttribute("role", "group");

    mediaContent.appendChild(mediaElement);

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
    likeElement.setAttribute("aria-live", "polite");

    const heartButton = document.createElement("button");
    heartButton.classList.add("heart-button");
    heartButton.setAttribute("aria-label", "Ajouter un like");
    heartButton.setAttribute("tabindex", "0");
    heartButton.setAttribute("role", "button");

    const heartIcon = document.createElement("img");
    heartIcon.src = "/assets/icons/heart-red.svg";
    heartIcon.alt = "";
    heartIcon.classList.add("heart-icon");

    heartButton.appendChild(heartIcon);

    const toggleLike = () => {
      let currentLikes = parseInt(likeElement.textContent, 10);

      if (!heartButton.classList.contains("liked")) {
        likeElement.textContent = currentLikes + 1;
        heartButton.classList.add("liked");
        heartButton.setAttribute("aria-label", "Retirer le like");
      } else {
        likeElement.textContent = currentLikes - 1;
        heartButton.classList.remove("liked");
        heartButton.setAttribute("aria-label", "Ajouter un like");
      }

      updateTotalLikes();
    };

    heartButton.addEventListener("click", toggleLike);
    heartButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleLike();
      }
    });

    likeContainer.appendChild(likeElement);
    likeContainer.appendChild(heartButton);

    infoContainer.appendChild(titleElement);
    infoContainer.appendChild(likeContainer);

    mediaContainer.appendChild(mediaContent);
    mediaContainer.appendChild(infoContainer);

    return mediaContainer;
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
