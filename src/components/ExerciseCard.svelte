<!-- Component to dynamically display an exercise -->
<script>
  import { setExercise } from "../services/store.js";
  import { onMount } from "svelte";
  import {
    addFavourite,
    removeFavourite,
    isFavourite,
  } from "../services/favourite.js";
  export let exercise;

  // Set current exercise in local storage and navigate to display exercise
  const setCurrentExercise = (exercise) => {
    setExercise(exercise);
    window.location.href = "./displayExercise";
  };

  // Favourites functionality
  let isFav = false;
  let showAddedPopup = false;
  let showRemovedPopup = false;

  const toggleFavourite = (exercise) => {
    isFav = isFavourite(exercise.name);
    if (isFav) {
      removeFavourite(exercise.name);
      showRemovedPopup = true;
      setTimeout(() => (showRemovedPopup = false), 2000); // Hide popup after 2 seconds
    } else {
      addFavourite(exercise);
      showAddedPopup = true;
      setTimeout(() => (showAddedPopup = false), 2000); // Hide popup after 2 seconds
    }
    isFav = !isFav;
  };

  function handleImageError(event) {
    event.target.src = "./images/exercicseImage.png";
  }

  // On mount, check if exercise is favourite and set isFav accordingly
  onMount(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      isFav = isFavourite(exercise.name);
    }
  });

  // Function to remove underscore
  function formatUnderscore(str) {
    return str ? str.replace(/_/g, " ") : "";
  }

    // Function to capitalize the first letter
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
</script>

<!-- Exercise Card -->
<div class="col">
  <div class="card">
    <!-- Use exercise image as API does not have images for exercises -->
    <img
        src="./images/exerciseImage.png"
        class="card-img-top sr-rounded-corners"
        alt={exercise.name}
      />

    <div class="card-body">
      <h5 class="card-title">{exercise.name}</h5>
      <div class="sr-exercise-details">
        <div class="sr-detail-item">
          <img
            src="./images/difficulty-icon.png"
            alt="Difficulty"
            class="sr-detail-icon"
          />
          <span class="sr-detail-name">Difficulty:</span>
          <span class="sr-detail-info">{capitalizeFirstLetter(exercise.difficulty)}</span>
        </div>
        <div class="sr-detail-item">
          <img
            src="./images/equipment-icon.png"
            alt="Equipment"
            class="sr-detail-icon"
          />
          <span class="sr-detail-name">Equipment:</span>
          <span class="sr-detail-info">{capitalizeFirstLetter(formatUnderscore(exercise.equipment))}</span>
        </div>
         <div class="sr-detail-item">
          <img
            src="./images/muscle-icon.png"
            alt="Muscle"
            class="sr-detail-icon"
          />
          <span class="sr-detail-name">Muscle:</span>
          <span class="sr-detail-info">{capitalizeFirstLetter(formatUnderscore(exercise.muscle))}</span>
        </div>
        <div class="button-container">
          <button
            class="btn btn-primary"
            on:click={() => setCurrentExercise(exercise)}
          >
            View Full Exercise
          </button>
          <button class="image-button" on:click={toggleFavourite(exercise)}>
            {#if isFav}
              <img
                src="./images/favouritedButton.png"
                alt="favourited"
                class="detail-icon"
              />
            {:else}
              <img
                src="./images/favouriteButton.png"
                alt="favourite"
                class="detail-icon"
              />
            {/if}
          </button>
          {#if showAddedPopup}
            <div class="popup popup-card">
              Added to favourites <img
                src="./images/happyIcon.png"
                alt="smiley face"
                class="detail-icon"
              />
            </div>
          {/if}
          {#if showRemovedPopup}
            <div class="popup popup-card">
              Removed from favourites <img
                src="./images/sadIcon.png"
                alt="sad face"
                class="detail-icon"
              />
            </div>
          {/if}
        </div>
        <div class="sr-detail-item badge-container">
          <span class="badge rounded-pill text-bg-secondary">{exercise.type}</span>
        </div>
      </div>
    </div>
  </div>
</div>