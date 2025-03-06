export const photographerMedias = (mediaData) => {
  const {id, photographerId, title, image, video, likes, date, price} =
    mediaData;

  console.log(mediaData);

  // Détermine le chemin du fichier
  const mediaPath = image
    ? `/assets/photographers/${photographerId}/${image}`
    : `/assets/photographers/${photographerId}/${video}`;

  // Fonction pour créer un élément média (image ou vidéo)
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
    heartIcon.src = "/assets/icons/heart.svg";
    heartIcon.alt = "Like";
    heartIcon.classList.add("heart-icon");

    // Ajout de l'interaction "Like"
    heartIcon.addEventListener("click", () => {
      let currentLikes = parseInt(likeElement.textContent, 10); //garantit qu'on obtient bien un nombre entier en base 10

      if (!heartIcon.classList.contains("liked")) {
        likeElement.textContent = currentLikes + 1;
        heartIcon.classList.add("liked"); // Ajoute une classe pour identifier le like actif
      } else {
        likeElement.textContent = currentLikes - 1;
        heartIcon.classList.remove("liked"); // Supprime la classe pour désactiver le like
      }
    });

    // Ajout des éléments au DOM
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
