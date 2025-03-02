export function setupDropdown() {
  const button = document.getElementById("dropdown-btn");
  const menu = document.getElementById("dropdown-menu");
  const options = document.querySelectorAll(".dropdown-item");
  const selectedOption = document.getElementById("selected-option");
  const arrow = document.querySelector(".dropdown-icon");

  // Initialisation : cache l'option sélectionnée
  options.forEach((option) => {
    option.style.display =
      option.textContent.trim() === selectedOption.textContent.trim()
        ? "none"
        : "block";
  });

  // Ouvrir/fermer le menu
  button.addEventListener("click", function () {
    const expanded = button.getAttribute("aria-expanded") === "true";

    arrow.style.transform = expanded ? "rotate(0deg)" : "rotate(180deg)";
    button.setAttribute("aria-expanded", !expanded);
    menu.style.display = expanded ? "none" : "block";
  });

  // Maj le bouton avec l'option sélectionnée
  options.forEach((option) => {
    option.addEventListener("click", function () {
      // Afficher toutes les options avant de changer l'option
      options.forEach((o) => (o.style.display = "block"));
      selectedOption.textContent = option.textContent;
      option.style.display = "none"; // Cacher l'option sélectionnée
      button.setAttribute("aria-expanded", "false");
      menu.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
    });
  });

  // Ajout de la navigation au clavier
  button.addEventListener("keydown", function (e) {
    const visible = button.getAttribute("aria-expanded") === "true";
    const items = [...menu.querySelectorAll(".dropdown-item")];
    let currentIndex = items.findIndex((item) =>
      item.classList.contains("active")
    );

    // Si aucune option n'est active, initialiser sur le premier élément
    if (currentIndex === -1 && visible) {
      currentIndex = 0;
      items[currentIndex].classList.add("active");
      menu.setAttribute("aria-activedescendant", items[currentIndex].id);
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      if (!visible) {
        button.click(); // Ouvre le menu si ce n'est pas déjà fait
        setTimeout(() => {
          items[0].classList.add("active"); // Assure que le premier élément est actif
          menu.setAttribute("aria-activedescendant", items[0].id);
        }, 10);
        return;
      }

      if (e.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
      }

      items.forEach((item) => item.classList.remove("active"));
      items[currentIndex].classList.add("active");
      menu.setAttribute("aria-activedescendant", items[currentIndex].id);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const activeItem = menu.querySelector(".dropdown-item.active");
      if (activeItem) {
        // Maj le texte du bouton avec l'option sélectionnée
        selectedOption.textContent = activeItem.textContent;

        // Cache l'option sélectionnée du menu
        options.forEach((o) => (o.style.display = "block"));
        activeItem.style.display = "none"; // Cacher l'option sélectionnée

        // Ferme le menu
        button.setAttribute("aria-expanded", "false");
        menu.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
      }
    }
  });
}
