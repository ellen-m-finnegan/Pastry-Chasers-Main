const FAVOURITES_KEY = "favourites";

// Get stored favourites or return an empty array if none are found
export const getFavourites = () => {
  const favourites = localStorage.getItem(FAVOURITES_KEY);
  return favourites ? JSON.parse(favourites) : [];
};

// Add an exercise to the favourites
export const addFavourite = (exercise) => {
  const favourites = getFavourites();
  if (!favourites.find((r) => r.name === exercise.name)) {
    favourites.push(exercise);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  }
};

// Remove an exercise from the favourites
export const removeFavourite = (exerciseName) => {
  let favourites = getFavourites();
  favourites = favourites.filter((r) => r.name !== exerciseName);
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
};

// Check if an exercise is currently a favourite
export const isFavourite = (exerciseName) => {
  const favourites = getFavourites();
  return favourites.some((r) => r.name === exerciseName);
};
