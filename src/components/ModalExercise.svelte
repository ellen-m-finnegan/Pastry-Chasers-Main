<!-- ModalExercise.svelte: Bootstrap modal contents, includes ExerciseCard-like functionality for modal display -->
<script>
  import { setExercise } from "../services/store.js";
  import { onMount } from "svelte";
  import {
    addFavourite,
    removeFavourite,
    isFavourite,
  } from "../services/favourite.js";
  // Receive exercise object as a prop
  export let exercise;


  // State variables for favourite status and popups
  let isFav = false;
  let showAddedPopup = false;
  let showRemovedPopup = false;

  // Set current exercise in local storage and navigate to display page
  const setCurrentExercise = (exercise) => {
    setExercise(exercise);
    window.location.href = "/Pastry-Chasers-Main/displayExercise";
  };

  // Toggle favourite status for this exercise
  const toggleFavourite = (exercise) => {
    isFav = isFavourite(exercise.name);
    if (isFav) {
      removeFavourite(exercise.name);
      showRemovedPopup = true;
      setTimeout(() => (showRemovedPopup = false), 2000);
    } else {
      addFavourite(exercise);
      showAddedPopup = true;
      setTimeout(() => (showAddedPopup = false), 2000);
    }
    isFav = !isFav;
  };

  // On mount, check if exercise has been favourited and set isFav accordingly
  onMount(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      isFav = isFavourite(exercise.name);
    }
  });

  // Update isFav reactively if exercise changes
  $: if (exercise) {
    isFav = isFavourite(exercise.name);
  }

    // Function to remove underscore
  function formatUnderscore(str) {
    return str ? str.replace(/_/g, " ") : "";
  }

    // Function to capitalize the first letter
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
</script>

<!-- Modal Content: Displays the current exercise details -->
<div class="container">
  <!-- Use exercise image as API does not return an image -->
  <img
      src="/Pastry-Chasers-Main/images/exerciseImage.png"
      class="img-fluid rounded-corners img-top"
      alt={exercise.name}
    />

  <h5 class="modal-header">{exercise.name}</h5>
  <div class="exercise-details">
    <div class="detail-item">
      <img 
        src="/Pastry-Chasers-Main/images/difficulty-icon.png" 
        alt="Difficulty" 
        class="detail-icon" 
      />
      <span class="detail-name">Difficulty:</span>
      <span class="detail-info">{capitalizeFirstLetter(exercise.difficulty)}</span>
    </div>
    <div class="detail-item">
      <img
        src="/Pastry-Chasers-Main/images/equipment-icon.png"
        alt="Equipment"
        class="detail-icon"
      />
      <span class="detail-name">Equipment:</span>
      <span class="detail-info">{capitalizeFirstLetter(formatUnderscore(exercise.equipment))}</span>
    </div>
    <div class="detail-item">
          <img
            src="/Pastry-Chasers-Main/images/muscle-icon.png"
            alt="Muscle"
            class="detail-icon"
          />
          <span class="detail-name">Muscle:</span>
          <span class="detail-info">{capitalizeFirstLetter(formatUnderscore(exercise.muscle))}</span>
    </div>
    <br />
    <!-- Buttons for viewing and favouriting -->
    <div class="center-content modal-button-container">
      <!-- View full exercise button -->
      <button class="btn primary-button" on:click={() => setCurrentExercise(exercise)}>
        View Full Exercise
      </button>
      <!-- Favourite toggle button -->
      <button class="image-button" on:click={() => toggleFavourite(exercise)}>
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
        <div class="popup popup-modal">
          Added to favourites <img
            src="/Pastry-Chasers-Main/images/happyIcon.png"
            alt="smiley face"
            class="detail-icon"
          />
        </div>
      {/if}
      <!-- Popup for removing from favourites -->
      {#if showRemovedPopup}
        <div class="popup popup-modal">
          Removed from favourites <img
            src="/Pastry-Chasers-Main/images/sadIcon.png"
            alt="sad face"
            class="detail-icon"
          />
        </div>
      {/if}
    </div>
    <div class="sr-detail-item modal-badge-container">
        <span class="badge rounded-pill text-bg-secondary">{exercise.type}</span>
    </div>
  </div>
</div>