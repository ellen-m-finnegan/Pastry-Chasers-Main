
<!-- Display all exercises for browse using Random API call, this does not have offset in response so needs own pagination -->
<script>
  import ExerciseCard from "./ExerciseCard.svelte";
  import { getExercises } from "../services/exerciseService.js";
  import {
    getSelectedOptions,
    addSelectedOption,
    removeSelectedOption,
  } from "../services/selectedOptions.js";

  export let exercisesPerPage;
  export let currentPage;
  let allExercises = { exercises: [] };
  let exercises = [];

  // Get saved option from session storage
  let selectedOptions = getSelectedOptions();
  let isLoading = false;

  // Flag to stop multiple fetches at once due to reactive statement
  let fetchInProgress = false;

  // Function to update the URL with the selected option
  const updateURL = (options) => {
    if (options) {
      const url = new URL(window.location);
      url.searchParams.set("selectedOptions", options.join(","));
      window.history.pushState({}, "", url);
    }
  };

  // Get a paginated list of exercises
  const getPaginatedExercises = (page) => {
    if (!allExercises || !Array.isArray(allExercises.exercises)) {
      return [];
    }
    const start = (page - 1) * exercisesPerPage;
    const end = start + exercisesPerPage;
    return allExercises.exercises.slice(start, end);
  };

  // Fetch exercises from API or session storage
  const fetchExercises = async (refresh = false) => {
    if (fetchInProgress) return;
    fetchInProgress = true;
    isLoading = true;
    try {
      const sortedOptions = selectedOptions.slice().sort().join("_");
      const storageKey = `allExercises_${sortedOptions}`;
      const storedExercises = sessionStorage.getItem(storageKey);

      if (storedExercises && !refresh) {
        allExercises = JSON.parse(storedExercises);
        if (!allExercises || !Array.isArray(allExercises.exercises)) {
          allExercises = { exercises: [] };
        }
      } else {
        // Build valid API params
        const params = {};
        if (selectedOptions.length > 0) {
          selectedOptions.forEach(option => {
            if (
              [
                "abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms",
                "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps",
                "traps", "triceps"
              ].includes(option)
            ) {
              params.muscle = option;
            } else if (
              [
                "strength", "stretching", "cardio", "strongman",
                "powerlifting", "plyometrics", "olympic_weightlifting"
              ].includes(option)
            ) {
              params.type = option;
            }
          });
        }
        params.limit = 27;

        // Fetch from API
        let apiResult = await getExercises(params);
        // Defensive: API returns array, wrap it
        if (Array.isArray(apiResult)) {
          allExercises = { exercises: apiResult };
        } else if (apiResult && Array.isArray(apiResult.exercises)) {
          allExercises = apiResult;
        } else {
          allExercises = { exercises: [] };
        }
        sessionStorage.setItem(storageKey, JSON.stringify(allExercises));
      }
      currentPage = 1;
      exercises = getPaginatedExercises(currentPage);
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
      allExercises = { exercises: [] };
      exercises = [];
    } finally {
      isLoading = false;
      fetchInProgress = false;
    }
  };

  // Reactive statement: fetch when selectedOptions change
  $: {
    const sortedOptions = selectedOptions.slice().sort().join("_");
    const storageKey = `allExercises_${sortedOptions}`;
    const storedExercises = sessionStorage.getItem(storageKey);

    if (selectedOptions.length > 0) {
      if (storedExercises) {
        allExercises = JSON.parse(storedExercises);
        if (!allExercises || !Array.isArray(allExercises.exercises)) {
          allExercises = { exercises: [] };
        }
      } else {
        fetchExercises(true);
      }
    } else {
      fetchExercises(true);
    }
    exercises = getPaginatedExercises(currentPage);
  }

  // Scroll to top for pagination
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination functions
  const updateExercises = (page) => {
    exercises = getPaginatedExercises(page);
    currentPage = page;
    scrollToTop();
  };
  const prevPage = () => {
    if (currentPage > 1) {
      updateExercises(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < Math.ceil((allExercises.exercises?.length ?? 0) / exercisesPerPage)) {
      updateExercises(currentPage + 1);
    }
  };

  // Update URL when selectedOptions change
  $: updateURL(selectedOptions);

  // Capitalize helper
  const capitalizeFirstLetter = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  // Checkbox change handler
  const handleCheckboxChange = (event) => {
    const option = event.target.value;
    if (event.target.checked) {
      addSelectedOption(option);
    } else {
      removeSelectedOption(option);
    }
    selectedOptions = getSelectedOptions();
  };

  const availableOptions = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
    "strength",
    "stretching",
    "cardio",
    "strongman",
    "powerlifting",
    "plyometrics",
    "olympic_weightlifting"
  ];
</script>

<!--HTML code for the ExercisePagination component-->
<div class="container-fluid container-background">
  <div class="title-button-container">
    <h4
      class="bg-secondary text-white px-2 py-1 rounded"
      style="display: inline-block;"
    >
      {selectedOptions.map(capitalizeFirstLetter).join(", ")}
    </h4>
    <!--Option to refresh exercises using boolean, to get new set of results if user unhappy-->
    <div class="button-container d-flex">
      <button class="btn btn-secondary me-2" on:click={() => fetchExercises(true)}
        >Refresh Exercises</button
      >
      <!-- Bootstrap dropdown menu with checkbox to change selected options -->
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Add Options
        </button>
        <ul class="dropdown-menu p-3" aria-labelledby="dropdownMenuButton">
          {#each availableOptions as option}
            <li class="mb-2">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={option}
                  id={option}
                  on:change={handleCheckboxChange}
                  checked={selectedOptions.includes(option)}
                />
                <label class="form-check-label" for={option}>
                  {capitalizeFirstLetter(option)}
                </label>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
  <!-- Bootstrap spinner to show while loading -->
  {#if isLoading}
    <div class="text-center my-4">
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  {/if}
  <!-- Display exercises -->
  <div class="card-group row row-cols-1 row-cols-md-3 g-4">
    {#each exercises as exercise}
      {#if exercise && exercise.name}
        <div class="col-md-4">
          <ExerciseCard {exercise} />
        </div>
      {:else}
        <div>Error: Invalid exercise data</div>
      {/if}
    {/each}
  </div>
  <!-- Cycle through pages of saved results -->
  <div
    class="pagination-controls d-flex justify-content-between align-items-center mt-4"
  >
    <button
      class="btn btn-primary"
      on:click={prevPage}
      disabled={currentPage === 1}>Previous</button
    >
    <span class="page-number">Page {currentPage}</span>
    <button
      class="btn btn-primary"
      on:click={nextPage}
      disabled={currentPage ===
        Math.ceil(allExercises.exercises.length / exercisesPerPage)}>Next</button
    >
  </div>
</div>
