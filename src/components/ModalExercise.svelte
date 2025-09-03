<!-- Bootstrap modal contents, that includes same functionality as ExerciseCard but designed for modal -->
<script>
  import { setExercise } from "../services/store.js";
  import { onMount } from "svelte";
  import {
    addFavourite,
    removeFavourite,
    isFavourite,
  } from "../services/favourite.js";
  export let exercise;

  // Fall back image if API does not return an image
  const fallbackImage = "/images/fallbackImage.png";

  // Needed for favourites functionality
  let isFav = false;
  let showAddedPopup = false;
  let showRemovedPopup = false;

  // Function to set the current exercise in local storage and navigate to display exercise
  const setCurrentExercise = (exercise) => {
    setExercise(exercise);
    window.location.href = "/displayExercise";
  };

  // Function to handle image errors and set fallback image
  function handleImageError(event) {
    event.target.src = fallbackImage;
  }

  // Favourites functionality
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

  // On mount, check if exercise is favourite and set isFav accordingly
  onMount(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      isFav = isFavourite(exercise.name);
    }
  });

  $: if (exercise) {
    isFav = isFavourite(exercise.name);
  }
</script>

<!-- Modal Content: Displays the current exercise -->
<div class="container">
  <!-- Use fallback image if API does not return an image -->
  {#if exercise.image}
    <img
      src={exercise.image}
      class="img-fluid custom-rounded img-top"
      alt={exercise.name}
      on:error={handleImageError}
    />{:else}
    <img
      src={fallbackImage}
      class="img-fluid custom-rounded img-top"
      alt={exercise.name}
    />
  {/if}

  <h5 class="modal-header">{exercise.name}</h5>
  <div class="exercise-details">
    <div class="detail-item">
      <img src="/images/time-icon.png" alt="Difficulty" class="detail-icon" />
      <span class="detail-name">Difficulty:</span>
      <span class="detail-info">{exercise.difficulty}</span>
    </div>
    <div class="detail-item">
      <img
        src="/images/servings-icon.png"
        alt="Equipment"
        class="detail-icon"
      />
      <span class="detail-name">Equipment:</span>
      <span class="detail-info">{exercise.equipment}</span>
    </div>
    <br />
    <div class="center-content modal-button-container">
      <button class="btn btn-primary" on:click={() => setCurrentExercise(exercise)}>
        View Full Exercise
      </button>
      <button class="image-button" on:click={() => toggleFavourite(exercise)}>
        {#if isFav}
          <img
            src="/images/favouritedButton.png"
            alt="favourited"
            class="detail-icon"
          />
        {:else}
          <img
            src="/images/favouriteButton.png"
            alt="favourite"
            class="detail-icon"
          />
        {/if}
      </button>
      {#if showAddedPopup}
        <div class="popup popup-modal">
          Added to favourites <img
            src="/images/happyIcon.png"
            alt="smiley face"
            class="detail-icon"
          />
        </div>
      {/if}
      {#if showRemovedPopup}
        <div class="popup popup-modal">
          Removed from favourites <img
            src="/images/sadIcon.png"
            alt="sad face"
            class="detail-icon"
          />
        </div>
      {/if}
    </div>
    <div class="sr-detail-item modal-badge-container">
      {#each exercise.type as type}
        <span class="badge rounded-pill text-bg-secondary">{type}</span>
      {/each}
    </div>
  </div>
</div>