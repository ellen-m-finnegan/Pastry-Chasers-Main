const SELECTED_OPTION_KEY = "selectedOption";

// Get stored options or return an empty array if none are found
export const getSelectedOptions = () => {
  const selectedOptions = sessionStorage.getItem(SELECTED_OPTION_KEY);
  return selectedOptions ? selectedOptions.split(",") : [];
};

// Check if an option is currently selected
export const isSelectedOption = (option) => {
  const selectedOptions = getSelectedOptions();
  return selectedOptions.includes(option);
};

// Add an option to the selected options
export const addSelectedOption = (option) => {
  const selectedOptions = getSelectedOptions();
  if (!selectedOptions.includes(option)) {
    selectedOptions.push(option);
    sessionStorage.setItem(SELECTED_OPTION_KEY, selectedOptions.join(","));
  }
};

// Remove an option from the selected options
export const removeSelectedOption = (option) => {
  let selectedOptions = getSelectedOptions();
  selectedOptions = selectedOptions.filter((opt) => opt !== option);
  sessionStorage.setItem(SELECTED_OPTION_KEY, selectedOptions.join(","));
};
