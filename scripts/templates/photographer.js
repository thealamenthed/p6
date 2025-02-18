export function photographerTemplate(data) {
  const {name, id, portrait, city, country, tagline, price} = data;

  const picture = `/assets/photographers/photographers_Id_photos/${portrait}`;

  function photographerId(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    // Redirige vers la page photographer.html en passant l'ID comme paramètre
    window.location.href = `photographer.html?id=${id}`;
  }

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("role", "article");
    article.setAttribute("aria-labelledby", `photographer-${id}-title`);
    article.setAttribute("tabindex", "0");

    const linkPhotographerPage = document.createElement("a");
    linkPhotographerPage.href = `photographer.html?id=${id}`;
    linkPhotographerPage.setAttribute("title", `Voir le profil de ${name}`);
    linkPhotographerPage.addEventListener("click", photographerId);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `photo de ${name}`);
    img.classList.add("photographer_section_img");

    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("id", `photographer-${id}-title`);
    h2.classList.add("photographer_section_name");
    h2.setAttribute("aria-label", `Le photographe se nomme ${name}`);

    const cityLocation = document.createElement("h3");
    cityLocation.textContent = `${city}, ${country}`;
    cityLocation.classList.add("photographer_section_city");
    cityLocation.setAttribute(
      "aria-label",
      `localisation du photographe ${city}, ${country}`
    );

    const tag = document.createElement("p");
    tag.textContent = tagline;
    tag.classList.add("photographer_section_tagline");
    tag.setAttribute("aria-label", `devise du photographe ${tagline}`);

    const prix = document.createElement("p");
    prix.textContent = `${price}€ / jour`;
    prix.classList.add("photographer_section_price");
    prix.setAttribute("aria-label", `tarif du photographe ${price}€ / jour`);

    // Ajout des éléments au lien
    linkPhotographerPage.appendChild(img);
    linkPhotographerPage.appendChild(h2);

    // Ajout du lien à l'article
    article.appendChild(linkPhotographerPage);
    article.appendChild(cityLocation);
    article.appendChild(tag);
    article.appendChild(prix);

    return article;
  }

  return {name, picture, city, country, tagline, price, getUserCardDOM};
}
