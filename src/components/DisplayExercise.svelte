<!-- Component that displays the current exercise stored locally -->

<script>
  // Import Svelte lifecycle and store utilities
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  // Import favourite management functions
  import {
    addFavourite,
    removeFavourite,
    isFavourite,
  } from "../services/favourite.js";

  // Store for the current exercise
  const exercise = writable(null);

  // State variables for favourite status and popups
  let isFav = false;
  let showAddedPopup = false;
  let showRemovedPopup = false;

  // On component mount, load exercise from localStorage if available
  onMount(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const storedExercise = localStorage.getItem("currentExercise");
      if (storedExercise) {
        const parsedExercise = JSON.parse(storedExercise);
        exercise.set(parsedExercise);
        isFav = isFavourite(parsedExercise.name); // Check if already favourited
      }
    }
  });

  // Handler for toggling favourite status
  const toggleFavourite = () => {
    exercise.update((current) => {
      if (isFav) {
        removeFavourite(current.name);
        showRemovedPopup = true;
        setTimeout(() => (showRemovedPopup = false), 2000); // Hide popup after 2 seconds
      } else {
        addFavourite(current);
        showAddedPopup = true;
        setTimeout(() => (showAddedPopup = false), 2000); // Hide popup after 2 seconds
      }
      isFav = !isFav;
      return current;
    });
  };

  // Reactive statement: split instructions into steps for display
  $: instructionSteps = $exercise && $exercise.instructions
    ? $exercise.instructions.split('.').map(s => s.trim()).filter(Boolean)
    : [];

  // Utility: Capitalise first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

</script>

<main>
  <!-- Display the exercise if it exists -->
  {#if $exercise}
    <div class="container section-background">
      <!-- Header row: exercise name and favourite button -->
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <h1 class="display-4">{$exercise.name}</h1>
          <div>
            <!-- Favourite button toggles status -->
            <button class="image-button" on:click={toggleFavourite}>
              {#if isFav}
                <img
                  src="/Pastry-Chasers-Main/images/favouritedButton.png"
                  alt="favourited"
                  class="detail-icon"
                />
              {:else}
                <img
                  src="/Pastry-Chasers-Main/images/favouriteButton.png"
                  alt="favourite"
                  class="detail-icon"
                />
              {/if}
            </button>
            <!-- Popup for adding to favourites -->
            {#if showAddedPopup}
              <div class="popup popup-display">
                Added to favourites <img
                  src="/Pastry-Chasers-Main/images/happyIcon.png"
                  alt="smiley face"
                  class="detail-icon"
                />
              </div>
            {/if}
            <!-- Popup for removing from favourites -->
            {#if showRemovedPopup}
              <div class="popup popup-display">
                Removed from favourites <img
                  src="/Pastry-Chasers-Main/images/sadIcon.png"
                  alt="sad face"
                  class="detail-icon"
                />
              </div>
            {/if}
          </div>
        </div>
      </div>
      <!-- Exercise details: Muscle, Equipment, Difficulty -->
      <div class="row mb-4">
        <div class="col-md-4">
          <div class="bg-light p-3 rounded">
            <h3
              class="bg-secondary text-white px-2 py-1 rounded"
              style="display: inline-block;"
            >
              Muscle Group
            </h3>
            <ul class="list-group list-unstyled">
              <li class="list-group-item">
                {capitalizeFirstLetter($exercise.muscle)}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="bg-light p-3 rounded">
            <h3
              class="bg-secondary text-white px-2 py-1 rounded"
              style="display: inline-block;"
            >
              Equipment
            </h3>
            <ul class="list-group list-unstyled">
              <li class="list-group-item">
                {capitalizeFirstLetter($exercise.equipment)}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="bg-light p-3 rounded">
            <h3
              class="bg-secondary text-white px-2 py-1 rounded"
              style="display: inline-block;"
            >
              Difficulty
            </h3>
            <ul class="list-group list-unstyled">
              <li class="list-group-item">
                {capitalizeFirstLetter($exercise.difficulty)}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Instructions section -->
      <div class="row">
        <div class="col-12">
          <div class="bg-light p-3 rounded section-background">
            <h3
              class="bg-secondary text-white px-2 py-1 rounded"
              style="display: inline-block;"
            >
              Instructions
            </h3>
            <!-- Bootstrap List Group for Styling -->
            <div class="list-group">
              {#each instructionSteps as step, i}
                <div class="list-group-item instruction-step">
                  <h2 class="step-number">Step {i + 1}</h2>
                  <p class="step-text">{step}.</p>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Fallback if no exercise found -->
    <div class="container">
      <p>Exercise not found.</p>
    </div>
  {/if}
</main>