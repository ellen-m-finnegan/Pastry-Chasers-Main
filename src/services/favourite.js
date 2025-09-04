// Key used for storing favourites in localStorage
const FAVOURITES_KEY = "favourites";

// Retrieve all stored favourites from localStorage, or return an empty array if none exist
export const getFavourites = () => {
  const favourites = localStorage.getItem(FAVOURITES_KEY);
  return favourites ? JSON.parse(favourites) : [];
};

// Add an exercise to the favourites list if it is not already present
export const addFavourite = (exercise) => {
  const favourites = getFavourites();
  // Only add if the exercise is not already in favourites (by name)
  if (!favourites.find((r) => r.name === exercise.name)) {
    favourites.push(exercise);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  }
};

// Remove an exercise from the favourites list by its name
export const removeFavourite = (exerciseName) => {
  let favourites = getFavourites();
  // Filter out the exercise with the given name
  favourites = favourites.filter((r) => r.name !== exerciseName);
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
};

// Check if an exercise is currently in the favourites list by its name
export const isFavourite = (exerciseName) => {
  const favourites = getFavourites();
  // Returns true if any favourite matches the given name
  return favourites.some((r) => r.name === exerciseName);
};
