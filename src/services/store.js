// Svelte store for storing the current exercise and search query
import { writable } from "svelte/store";

// Check if the code is running in the browser (for localStorage access)
const isBrowser =
  typeof window !== "undefined" && typeof localStorage !== "undefined";

// Get the current exercise from localStorage if available
const storedExercise = isBrowser
  ? localStorage.getItem("currentExercise")
  : null;

// Create a writable Svelte store for the current exercise
export const currentExercise = writable(
  storedExercise ? JSON.parse(storedExercise) : null
);

// Subscribe to the currentExercise store and update localStorage when it changes (browser only)
if (isBrowser) {
  currentExercise.subscribe((value) => {
    if (value) {
      // Store the exercise in localStorage if set
      localStorage.setItem("currentExercise", JSON.stringify(value));
    } else {
      // Remove from localStorage if exercise is unset
      localStorage.removeItem("currentExercise");
    }
  });
}

// Function to set the current exercise in the store
export function setExercise(data) {
  currentExercise.set(data);
}

// Function to get the current exercise from localStorage (browser only)
export const getExercise = () => {
  if (!isBrowser) return null;
  const exercise = localStorage.getItem("currentExercise");
  return exercise ? JSON.parse(exercise) : null;
};

// Svelte store for storing the search query string
export const searchQuery = writable("");
