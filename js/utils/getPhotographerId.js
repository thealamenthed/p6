// Fonction pour récupérer l'ID du photographe dans l'URL
export const getPhotographerId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};
