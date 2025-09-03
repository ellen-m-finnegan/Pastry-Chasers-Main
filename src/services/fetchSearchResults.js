import { searchExercises } from "./exerciseService";

const API_KEY = "d23c+r1ELW1wx72q4S+UVg==lie4avxP7aBrkZiv";
const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

// Fetches search results from the API for exercises
export async function fetchSearchResults({
  query = null,
  muscle = null,
  type = null,
  difficulty = null,
  equipment = null,
}) {
  const params = {};

  if (query) params.name = query;
  if (muscle) params.muscle = muscle;
  if (type) params.type = type;
  if (difficulty) params.difficulty = difficulty;
  if (equipment) params.equipment = equipment;

  try {
    const response = await searchExercises(params);
    return response;
  } catch (err) {
    console.error("Failed to fetch search results:", err);
    throw new Error("Failed to fetch search results.");
  }
}
