// Fonction pour récupérer les médias
export async function getPhotographerMedias() {
  try {
    // Attendre la réponse de la requête fetch
    const response = await fetch("/data/photographers.json");

    // Attendre la réponse en JSON
    const data = await response.json();

    // Retourne le tableau des médias
    return {
      media: data.media,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des médias :", error);
    return {
      media: [], // Retourne un tableau vide en cas d'erreur
    };
  }
}
