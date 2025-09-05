<!-- Component to display a random exercise fetched from the API on index load, cycles through all 50 exercises -->
<script>
  import { writable, get } from "svelte/store";
  import { getExercises } from "../services/exerciseService.js";
  import ModalExercise from "./ModalExercise.svelte";

  // Store for the list of exercises
  let exercises = writable([]);
  // Store for the index of the currently displayed exercise
  let currentExerciseIndex = writable(0);
  // Store to control modal visibility
  let showModal = writable(false);

  // Fetch random exercises from API and show modal
  async function fetchRandomExercises() {
    const params = {
      type: "strength", // Only fetch strength exercises
      limit: 50,       // Limit to 50 exercises
    };
    const data = await getExercises(params);
    exercises.set(Array.isArray(data) ? data : []);
    currentExerciseIndex.set(0); // Start with the first exercise
    showModal.set(true);         // Show the modal  
  }

  // Move to the next exercise in the list
  function nextExercise() {
    const arr = get(exercises);
    currentExerciseIndex.update((n) => {
      console.log("Roll Again clicked", n, arr.length);
       // Cycle through exercises, wrap around to start
      return arr.length > 0 ? (n + 1) % arr.length : 0;
    });
  }

  // Close the modal
  function closeModal() {
    showModal.set(false);
  }
</script>

<!-- Button to fetch random exercises and open modal -->
<div class="center-content">
  <button class="btn primary-button btn-lg" on:click={fetchRandomExercises}>
    Get Random Exercise
  </button>
</div>

<!-- Modal to display the current exercise -->
{#if $showModal}
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal header with close button -->
        <div class="modal-header modal-background">
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button type="button" class="btn-close" on:click={closeModal}
          ></button>
        </div>
        <!-- Modal body: show exercise details or loading message -->
        <div class="modal-body modal-body">
          {#if $exercises.length > 0}
            <!-- Pass the current exercise to ModalExercise component -->
            <ModalExercise exercise={$exercises[$currentExerciseIndex]} />
          {:else}
            <p>Loading...</p>
          {/if}
        </div>
        <!-- Modal footer with close and roll again buttons -->
        <div class="modal-footer modal-background">
          <button class="btn primary-button" on:click={closeModal}> Close </button>
          <!-- Roll again option to get next exercise -->
          <button class="btn primary-button" on:click={nextExercise}>
            Roll Again <img
              src="/Pastry-Chasers-Main/images/dice.png"
              alt="dice"
              class="detail-icon"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal backdrop for overlay effect -->
  <div class="modal-backdrop fade show"></div>
{/if}