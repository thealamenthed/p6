// Sélection des éléments
const contactForm = document.getElementById("contact_form");
const contactBtn = document.querySelector(".contact_button");
const closeBtn = document.querySelector(".close_modal");
const modal = document.getElementById("contact_modal");
const firstInput = document.getElementById("prenom");

// Affiche la modal
function displayModal() {
  modal.style.display = "block";
  firstInput.focus(); // Mettre le focus sur le premier champ
  document.addEventListener("keydown", handleKeyDown);
}

// Ferme la modal
function closeModal() {
  modal.style.display = "none";
  contactBtn.focus(); // Remet le focus sur le bouton après fermeture
  document.removeEventListener("keydown", handleKeyDown);
}

// Gérer la fermeture avec la touche "Escape"
const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

// Ajout des écouteurs d'événements
contactBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);

// Ferme la modal si on clique en dehors du formulaire
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Fonction de validation
const validateField = (input, minLength = 2) => {
  const errorSpan = document.getElementById(`${input.id}-error`);
  if (input.value.trim().length < minLength) {
    errorSpan.textContent = `Veuillez entrer ${minLength} caractères ou plus.`;
    input.setAttribute("aria-invalid", "true");
    return false;
  } else {
    errorSpan.textContent = "";
    input.removeAttribute("aria-invalid");
    return true;
  }
};

// Validation de l'email
const validateEmail = (input) => {
  const errorSpan = document.getElementById(`${input.id}-error`);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(input.value.trim())) {
    errorSpan.textContent = "Veuillez entrer une adresse email valide.";
    input.setAttribute("aria-invalid", "true");
    return false;
  } else {
    errorSpan.textContent = "";
    input.removeAttribute("aria-invalid");
    return true;
  }
};

// Gestion de la soumission du formulaire
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Vérifications
  const isPrenomValid = validateField(document.getElementById("prenom"));
  const isNomValid = validateField(document.getElementById("nom"));
  const isEmailValid = validateEmail(document.getElementById("email"));
  const isMessageValid = validateField(document.getElementById("message"), 10);

  if (isPrenomValid && isNomValid && isEmailValid && isMessageValid) {
    // Si tout est valide, afficher les données
    const formData = {
      prenom: document.getElementById("prenom").value,
      nom: document.getElementById("nom").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
    console.log("Données envoyées :", formData);
    closeModal();
  }
});

// Ajout d'écouteurs d'événements pour la validation en temps réel
document
  .getElementById("prenom")
  .addEventListener("input", () =>
    validateField(document.getElementById("prenom"))
  );
document
  .getElementById("nom")
  .addEventListener("input", () =>
    validateField(document.getElementById("nom"))
  );
document
  .getElementById("email")
  .addEventListener("input", () =>
    validateEmail(document.getElementById("email"))
  );
document
  .getElementById("message")
  .addEventListener("input", () =>
    validateField(document.getElementById("message"), 10)
  );
