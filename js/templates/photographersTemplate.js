export const photographersTemplate = (data) => {
  const {name, id, portrait, city, country, tagline, price} = data;

  const picture = `assets/medias/photographers/photographers_Id_photos/${portrait}`;

  const getUserCardDOM = () => {
    const article = document.createElement("article");
    article.setAttribute("role", "article");
    article.setAttribute("aria-labelledby", `photographer-${id}-title`);
    article.setAttribute("tabindex", "0");

    article.innerHTML = `
      <article role="article" aria-labelledby="photographer-${id}-title" tabindex="0">
        <a href="photographer.html?id=${id}" title="Voir le profil de ${name}">
        <img src="${picture}" alt="photo de ${name}" class="photographer_section_img">
        <h2 id="photographer-${id}-title" class="photographer_section_name" aria-label="Le photographe se nomme ${name}">${name}</h2></a>
        <h3 class="photographer_section_city" aria-label="localisation du photographe ${city}, ${country}">${city}, ${country}</h3>
        <p class="photographer_section_tagline" aria-label="devise du photographe ${tagline}">
          ${tagline}
        </p>
        <p class="photographer_section_price" aria-label="tarif du photographe ${price}€ / jour">${price}€ / jour</p>
      </article>
`;

    return article;
  };

  return {name, picture, city, country, tagline, price, getUserCardDOM};
};
