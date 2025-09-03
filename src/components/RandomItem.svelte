<!-- Component to display a random exercise that was got from API on index load, cycles thru all 50 exercises -->
<script>
  import { writable, get } from "svelte/store";
  import { getExercises } from "../services/exerciseService.js";
  import ModalExercise from "./ModalExercise.svelte";

  let exercises = writable([]);
  let currentExerciseIndex = writable(0);
  let showModal = writable(false);

  async function fetchRandomExercises() {
    const params = {
      type: "strength",
      limit: 50,
    };
    const data = await getExercises(params);
    exercises.set(Array.isArray(data) ? data : []);
    currentExerciseIndex.set(0);
    showModal.set(true);
  }

  // Use get() to access the value inside functions
  function nextExercise() {
    const arr = get(exercises);
    currentExerciseIndex.update((n) => {
      console.log("Roll Again clicked", n, arr.length);
      return arr.length > 0 ? (n + 1) % arr.length : 0;
    });
  }

  function closeModal() {
    showModal.set(false);
  }
</script>

<!-- Button to fetch random exercises -->
<div class="center-content">
  <button class="btn btn-primary btn-lg" on:click={fetchRandomExercises}>
    Get Random Exercise
  </button>
</div>

<!-- Modal to display the exercise -->
{#if $showModal}
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header modal-background">
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button type="button" class="btn-close" on:click={closeModal}
          ></button>
        </div>
        <div class="modal-body modal-body">
          {#if $exercises.length > 0}
            <ModalExercise exercise={$exercises[$currentExerciseIndex]} />
          {:else}
            <p>Loading...</p>
          {/if}
        </div>
        <div class="modal-footer modal-background">
          <button class="btn btn-primary" on:click={closeModal}> Close </button>
          <!-- Roll again option to get next exercise -->
          <button class="btn btn-primary" on:click={nextExercise}>
            Roll Again <img
              src="/images/dice.png"
              alt="dice"
              class="detail-icon"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
{/if}