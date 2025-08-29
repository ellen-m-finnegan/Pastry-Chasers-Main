
<script>
  // State variables for form fields
  let name = "";
  let email = "";
  let message = "";
  // Tracks if the user has submitted the form
  let submitted = false;
  // Controls whether the modal is shown
  let showForm = false;


  // Handles form submission using Formspree, similar to aboutUs.astro
  let formResponse = "";
  let responseClass = "";
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/xvgboqwn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        formResponse = "Thank you for joining!";
        responseClass = "form-response success";
        submitted = true;
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, "errors")) {
          formResponse = data.errors.map((error) => error.message).join(", ");
        } else {
          formResponse = "Oops! There was a problem submitting your form";
        }
        responseClass = "form-response error";
      }
    } catch (error) {
      formResponse = `Oops! There was a problem submitting your form: ${error.message}`;
      responseClass = "form-response error";
    }
  }

  // Opens the modal popup
  function openForm() {
    showForm = true;
  }
</script>


<div class="signup-form-container center-content">
  <!-- Main button to open the sign-up modal. Text changes after sign-up. -->
  <button class="btn btn-primary btn-lg" on:click={openForm} disabled={submitted}>
    {submitted ? 'Thanks for joining!' : 'Join Pastry Chasers Run Club'}
  </button>

  <!-- Modal popup for the sign-up form -->
  {#if showForm}
    <div class="modal fade show" tabindex="-1" style="display: block; background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1050;">
      <div class="modal-dialog" style="margin-top: 10vh;">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Join Pastry Chasers Run Club!</h2>
            <!-- Close button for the modal -->
            <button type="button" class="btn-close" aria-label="Close" on:click={() => { showForm = false; }}></button>
          </div>
          <div class="modal-body">
            {#if !submitted}
              <!-- Sign-up form fields -->
              <form on:submit={handleSubmit} class="signup-form">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input id="name" name="name" class="form-control" type="text" bind:value={name} required />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input id="email" name="email" class="form-control" type="email" bind:value={email} required />
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Why do you want to join?</label>
                  <textarea id="message" name="message" class="form-control" rows="3" bind:value={message}></textarea>
                </div>
                <button class="btn btn-primary" type="submit">Sign Up</button>
                <div class={responseClass}>{formResponse}</div>
              </form>
            {:else}
              <!-- Thank you message after successful sign-up -->
              <div class="alert alert-success mt-3">
                <h4>Thank you for signing up, {name}!</h4>
                <p>We'll be in touch soon at {email}.</p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
