<!-- Search component for search page, user can search by any query and include diet filters -->
<script>
  import { derived, writable } from "svelte/store";
  import { onMount } from "svelte";
  import { fetchSearchResults } from "../services/fetchSearchResults.js";
  import ExerciseCard from "./ExerciseCard.svelte";

  let searchResults = writable([]);
  let query = writable("");
  let loading = false;
  let error = writable("");
  let currentPage = writable(1);
  const resultsPerPage = 9;
  let totalResults = writable(0);
  let selectedType = writable([]);
  let searchTimeout;
  let searchQuery = writable("");
  

  const paginatedResults = derived(
  [searchResults, currentPage],
  ([$searchResults, $currentPage]) => {
    const start = ($currentPage - 1) * resultsPerPage;
    return $searchResults.slice(start, start + resultsPerPage);
  }
);

  // Add 1 second debounce to stop multiple calls to search API before typing is complete
  const debouncedFetchResults = debounce(fetchResults, 1000);

  // Timeout while user is typing to avoid multiple API calls
  function debounce(func, delay) {
    return function (...args) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Load the stored query from session storage if it exists
  onMount(async () => {
    if (
      typeof window !== "undefined" &&
      typeof sessionStorage !== "undefined"
    ) {
      console.log("Running in the browser");
      const storedQuery = sessionStorage.getItem("searchQuery");
      console.log("Stored query:", storedQuery);
      if (storedQuery) {
        query.set(storedQuery);
      }
    }
  });

  // Reactive statement to fetch results when query changes with debounce to give time for typing
  $: if ($query || $selectedType.length > 0) {
  debouncedFetchResults($query, ($currentPage - 1) * resultsPerPage, $selectedType);
}
  // Fetch search results from the API
  async function fetchResults(queryValue, offset, selectedMuscles) {
  loading = true;
  error.set("");
  try {
    const params = {};
    if (selectedMuscles.length > 0) params.muscle = selectedMuscles.join(",");
    params.limit = 50; // Get more results for client-side filtering

    const response = await fetchSearchResults(params);
    let filtered = response;

    // If search bar is not empty, filter by name (partial match)
    if (queryValue) {
      const q = queryValue.toLowerCase();
      filtered = response.filter(ex =>
        ex.name.toLowerCase().includes(q) ||
        ex.muscle?.toLowerCase().includes(q) ||
        ex.type?.toLowerCase().includes(q) ||
        ex.equipment?.toLowerCase().includes(q) ||
        ex.difficulty?.toLowerCase().includes(q)
      );
    }

    searchResults.set(filtered);
    totalResults.set(filtered.length);
    currentPage.set(1);
  } catch (err) {
    error.set("Failed to fetch search results.");
    searchResults.set([]);
    totalResults.set(0);
  } finally {
    loading = false;
  }
}

  // Handle search form submission
  function handleSearch(event) {
    event.preventDefault();
    const queryValue = event.target.querySelector("#searchQuery").value;
    if (queryValue) {
      searchQuery.set(queryValue);
      sessionStorage.setItem("searchQuery", queryValue);
      const typeValue = $selectedType.join(",");
      fetchResults(queryValue, 0, typeValue);
      currentPage.set(1); // Reset to first page on new search
    }
  }

  // Scroll to top of the page for next and previous
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleNextPage() {
    currentPage.update((n) => n + 1);
    scrollToTop();
  }

  function handlePreviousPage() {
    currentPage.update((n) => (n > 1 ? n - 1 : n));
    scrollToTop();
  }

  // Function to toggle type filters
  function toggleType(type) {
    selectedType.update((types) => {
      if (types.includes(type)) {
        return types.filter((t) => t !== type);
      } else {
        return [...types, type];
      }
    });
  }
</script>

<!-- Search results component -->
<div class="container-fluid container-background">
  <form
    class="d-flex flex-column align-items-end"
    id="searchForm"
    on:submit={handleSearch}
  >
    <div class="d-flex mb-3 w-100">
      <!-- Search bar with bind on query value -->
      <input
        class="form-control me-2"
        type="text"
        id="searchQuery"
        placeholder="Search exercises..."
        bind:value={$query}
      />
      <button class="btn btn-primary" type="submit">Search</button>
    </div>
    <!-- Filters with checked value depending if selectedType includes value -->
    <div id="typeFilter" class="d-flex flex-wrap justify-content-start">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="abdominalsCheckbox"
          value="abdominals"
          on:change={() => toggleType("abdominals")}
          checked={$selectedType.includes("abdominals")}
        />
        <label class="form-check-label" for="abdominalsCheckbox"
          >Abdominals</label
        >
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="bicepsCheckbox"
          value="biceps"
          on:change={() => toggleType("biceps")}
          checked={$selectedType.includes("biceps")}
        />
        <label class="form-check-label" for="bicepsCheckbox"
          >Biceps</label
        >
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="chestCheckbox"
          value="chest"
          on:change={() => toggleType("chest")}
          checked={$selectedType.includes("chest")}
        />
        <label class="form-check-label" for="chestCheckbox">Chest</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="glutesCheckbox"
          value="glutes"
          on:change={() => toggleType("glutes")}
          checked={$selectedType.includes("glutes")}
        />
        <label class="form-check-label" for="glutesCheckbox"
          >Glutes</label
        >
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="hamstringsCheckbox"
          value="hamstrings"
          on:change={() => toggleType("hamstrings")}
          checked={$selectedType.includes("hamstrings")}
        />
        <label class="form-check-label" for="hamstringsCheckbox"
          >Hamstrings</label
        >
      </div>
    </div>
  </form>

  <!-- Spinner to show while loading -->
  {#if loading}
    <div class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  {/if}
  <!-- Display error if search fails -->
  <div class="container">
    {#if $error}
      <!-- Show an error message if fetching data fails -->
      <div class="alert alert-danger" role="alert">
        {$error}
      </div>
    {:else if $searchResults.length === 0 && !loading}
      <!-- Show a message when no exercises -->
      <div class="alert alert-warning text-center" role="alert">
        No exercises found. Try making a new search.
      </div>
    {:else}
      <!-- Display exercises with exercise card component -->
      <div class="card-group row row-cols-1 row-cols-md-3 g-4">
        {#each $paginatedResults as result}
  <ExerciseCard exercise={result} />
{/each}
      </div>
      <!-- Pagination controls -->
      <div
        class="pagination-controls d-flex justify-content-between align-items-center mt-4"
      >
        <button
          class="btn btn-primary"
          on:click={handlePreviousPage}
          disabled={$currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {$currentPage} of {Math.ceil($totalResults / resultsPerPage)}
        </span>
        <button
          class="btn btn-primary"
          on:click={handleNextPage}
          disabled={$currentPage === Math.ceil($totalResults / resultsPerPage)}
        >
          Next
        </button>
      </div>
    {/if}
  </div>
</div>