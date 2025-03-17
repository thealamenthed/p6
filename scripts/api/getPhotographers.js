let photographersCache = null;

export const getPhotographers = async () => {
  if (photographersCache) return {photographers: photographersCache};

  try {
    const response = await fetch("../../data/photographers.json");
    if (!response.ok)
      throw new Error("Erreur lors du chargement des photographes");

    const data = await response.json();
    photographersCache = data.photographers; // Mise en cache
    return {photographers: photographersCache};
  } catch (error) {
    console.error(error);
    return {photographers: []};
  }
};
