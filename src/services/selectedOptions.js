// Key used for storing selected options in sessionStorage
const SELECTED_OPTION_KEY = "selectedOption";

// Retrieve all selected options from sessionStorage, or return an empty array if none exist
export const getSelectedOptions = () => {
  const selectedOptions = sessionStorage.getItem(SELECTED_OPTION_KEY);
  // Split the stored string into an array, or return empty array if not found
  return selectedOptions ? selectedOptions.split(",") : [];
};

// Check if a specific option is currently selected
export const isSelectedOption = (option) => {
  const selectedOptions = getSelectedOptions();
  // Returns true if the option is in the selected options array
  return selectedOptions.includes(option);
};

// Add an option to the selected options if it is not already present
export const addSelectedOption = (option) => {
  const selectedOptions = getSelectedOptions();
  // Only add if the option is not already selected
  if (!selectedOptions.includes(option)) {
    selectedOptions.push(option);
    // Store the updated array as a comma-separated string
    sessionStorage.setItem(SELECTED_OPTION_KEY, selectedOptions.join(","));
  }
};

// Remove an option from the selected options
export const removeSelectedOption = (option) => {
  let selectedOptions = getSelectedOptions();
  // Filter out the option to be removed
  selectedOptions = selectedOptions.filter((opt) => opt !== option);
  // Store the updated array as a comma-separated string
  sessionStorage.setItem(SELECTED_OPTION_KEY, selectedOptions.join(","));
};
