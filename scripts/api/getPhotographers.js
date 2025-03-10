// Fonction pour récupérer les photographes
export const getPhotographers = async () => {
  try {
    // Attendre la réponse de la requête fetch
    const response = await fetch("/data/photographers.json");

    // Attendre la réponse en JSON
    const data = await response.json();
    // Retourne le tableau des photographes
    return {
      photographers: data.photographers,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des photographes :", error);
    return {
      photographers: [], // Retourne un tableau vide en cas d'erreur
    };
  }
};
