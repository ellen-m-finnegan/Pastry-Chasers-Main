// Svelte store for storing the current reciie and search query
import { writable } from "svelte/store";

// Check if the code is running in the browser
const isBrowser =
  typeof window !== "undefined" && typeof localStorage !== "undefined";

// Get the current exercise from localStorage
const storedExercise = isBrowser
  ? localStorage.getItem("currentExercise")
  : null;

// Create a writable store for the current exercise
export const currentExercise = writable(
  storedExercise ? JSON.parse(storedExercise) : null
);

// If the code is running in the browser, subscribe to the currentExercise store
if (isBrowser) {
  currentExercise.subscribe((value) => {
    if (value) {
      // If a exercise is set, store it in localStorage
      localStorage.setItem("currentExercise", JSON.stringify(value));
    } else {
      // If no exercise is set, remove it from localStorage
      localStorage.removeItem("currentExercise");
    }
  });
}
// Set the current exercise in the store
export function setExercise(data) {
  currentExercise.set(data);
}

// Get the current exercise from the store
export const getExercise = () => {
  if (!isBrowser) return null;
  const exercise = localStorage.getItem("currentExercise");
  return exercise ? JSON.parse(exercise) : null;
};

// Svelte store for storing the search query
export const searchQuery = writable("");
