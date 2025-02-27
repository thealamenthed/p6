console.log("photographerMedias.js est bien chargé !");

export function photographerMedias(mediaData) {
  const {id, photographerId, title, image, video, likes, date, price} =
    mediaData;
  console.log("Appel de photographerMedias avec :", photographerId);

  // Détermine le chemin du fichier
  const mediaPath = image
    ? `/assets/photographers/${photographerId}/${image}`
    : `/assets/photographers/${photographerId}/${video}`;
  console.log(mediaPath);

  // Fonction pour créer un élément média (image ou vidéo)
  function createMediaElement() {
    const mediaElement = document.createElement("article");
    mediaElement.classList.add("media-card");

    // Vérifie si c'est une image ou une vidéo
    let media;
    if (image) {
      media = document.createElement("img");
      media.setAttribute("src", mediaPath);
      media.setAttribute("alt", title);
    } else if (video) {
      media = document.createElement("video");
      media.setAttribute("src", mediaPath);
      media.setAttribute("controls", "true");
    }

    media.classList.add("media-content");

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("media-info");

    const titleElement = document.createElement("p");
    titleElement.textContent = title;
    titleElement.classList.add("media-title");

    const likeElement = document.createElement("span");
    likeElement.textContent = `${likes} `;

    const heartIcon = document.createElement("img");
    heartIcon.src = "/assets/icons/heart.svg";
    heartIcon.alt = "Like";
    heartIcon.classList.add("heart-icon");

    likeElement.appendChild(heartIcon);

    mediaElement.appendChild(media);

    mediaElement.appendChild(infoContainer);
    infoContainer.appendChild(titleElement).appendChild(likeElement);

    return mediaElement;
  }
  console.log("test mediapath");
  console.log("Chemin du média généré :", mediaPath);

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
}
