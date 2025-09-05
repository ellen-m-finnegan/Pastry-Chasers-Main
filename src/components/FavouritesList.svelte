<!-- Component to display all favourites that are stored in local storage -->
<script>
  import { onMount } from "svelte";
  import { getFavourites } from "../services/favourite";
  import ExerciseCard from "./ExerciseCard.svelte";

  // Array to hold all favourited exercises
  let allExercises = [];

  // When the component mounts, load favourites from local storage
  onMount(() => {
    const favourites = getFavourites();
    if (favourites) {
      allExercises = favourites; // Set the array to the favourites
    }
    console.log("all exercises" + JSON.stringify(allExercises));
  });
</script>

<main>
  <div class="container">
    <div class="title-button-container">
      <h1 class="display-4">Favourite Exercises</h1>
      <img
        src="./images/running-croissant2.png"
        alt="running croissant"
      />
    </div>
    <div class="container container-background">
      <div class="card-group row row-cols-1 row-cols-md-3 g-4">
        <!-- Loop through allExercises and render an ExerciseCard for each -->
        {#each allExercises as result}
          <ExerciseCard exercise={result} />
        {/each}
      </div>
    </div>
  </div>
</main>