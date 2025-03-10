const contactBtn = document.querySelector(".contact_button");
const closeBtn = document.querySelector(".close_modal");

const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  formElements[0].focus(); // Mettre le focus sur le premier champ
  document.addEventListener("keydown", handleKeyDown);
};

const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  contactBtn.focus(); // Remet le focus sur le bouton après fermeture
  document.removeEventListener("keydown", handleKeyDown);
};

// Ajout des écouteurs d'événements
contactBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal(); // Ferme la modal si on clique en dehors du formulaire
  }
});
