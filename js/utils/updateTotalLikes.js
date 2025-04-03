export const updateTotalLikes = () => {
  let total = 0;

  // Récupère tous les compteurs de likes individuels
  document.querySelectorAll(".like-count").forEach((like) => {
    total += parseInt(like.textContent, 10);
  });

  // Met à jour le total affiché
  let displayElementTotal = document.querySelector(".total-likes");
  displayElementTotal.textContent = total;
};
