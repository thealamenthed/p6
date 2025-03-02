// Fonction pour récupérer les photographes
export async function getPhotographers() {
  try {
    // Attendre la réponse de la requête fetch
    const response = await fetch("/data/photographers.json");

    // Attendre la réponse en JSON
    const data = await response.json();
    console.log("Données JSON récupérées :", data); // Afficher les données JSON

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
}
