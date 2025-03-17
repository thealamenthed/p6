import {displayPhotographerMedias} from "../utils/displayPhotographerMedias.js";
export const setupDropdown = () => {
  const button = document.getElementById("dropdown-btn");
  const menu = document.getElementById("dropdown-menu");
  const options = document.querySelectorAll(".dropdown-item");
  const selectedOption = document.getElementById("selected-option");
  const arrow = document.querySelector(".dropdown-icon");

  // Fonction pour sélectionner une option
  const selectOption = (option) => {
    selectedOption.textContent = option.textContent;

    // Afficher toutes les options avant de masquer celle sélectionnée
    options.forEach((o) => (o.style.display = "block"));
    option.style.display = "none"; // Masque l'option sélectionnée

    // Fermer le menu
    button.setAttribute("aria-expanded", "false");
    menu.style.display = "none";
    arrow.style.transform = "rotate(0deg)";

    // Appliquer le tri
    displayPhotographerMedias(option.textContent.trim().toLowerCase());
  };

  // Ouvrir/fermer le menu au clic
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    const expanded = button.getAttribute("aria-expanded") === "true";

    arrow.style.transform = expanded ? "rotate(0deg)" : "rotate(180deg)";
    button.setAttribute("aria-expanded", !expanded);
    menu.style.display = expanded ? "none" : "block";

    // Cache l'option actuellement sélectionnée quand le menu s'ouvre
    options.forEach((option) => {
      option.style.display =
        option.textContent.trim() === selectedOption.textContent.trim()
          ? "none"
          : "block";
    });
  });

  // Ajout des événements pour chaque option
  options.forEach((option) => {
    option.setAttribute("tabindex", "0"); // Rend chaque option focusable

    // Sélection au clic
    option.addEventListener("click", function (event) {
      event.stopPropagation();
      selectOption(option);
    });

    // Sélection au clavier
    option.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectOption(option);
      }
    });

    // Ajoute la classe "active" quand une option est focusée
    option.addEventListener("focus", function () {
      options.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
    });
  });

  // Fermer le dropdown en cliquant en dehors
  document.addEventListener("click", function () {
    button.setAttribute("aria-expanded", "false");
    menu.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
  });

  // Navigation au clavier (flèches + échap)
  button.addEventListener("keydown", function (e) {
    const visible = button.getAttribute("aria-expanded") === "true";
    const items = [...menu.querySelectorAll(".dropdown-item")];
    let currentIndex = items.findIndex((item) =>
      item.classList.contains("active")
    );

    if (!visible) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        button.click(); // Ouvre le menu
        setTimeout(() => {
          items[0].focus(); // Met le focus sur la première option
        }, 10);
      }
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      currentIndex =
        e.key === "ArrowDown"
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;

      items[currentIndex].focus();
    }

    if (e.key === "Escape") {
      button.setAttribute("aria-expanded", "false");
      menu.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
    }
  });
};
