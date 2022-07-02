<script>
  import { fade } from "svelte/transition";

  export let countries;
  let guess;
  export let answer;
  export let correct;
  export let guessCountry;
</script>

<main>
  <div class="options" in:fade={{ duration: 700 }}>
    {#each countries as country}
      {#if correct != undefined}
        {#if country == answer}
          {#if country == guess}
            <button disabled class="option correct-guess">
              {country.name.common}
            </button>
          {:else}
            <button disabled class="option correct">
              {country.name.common}
            </button>
          {/if}
        {:else if country == guess}
          <button disabled class="option not-correct-guess">
            {country.name.common}
          </button>
        {:else}
          <button disabled class="option not-correct">
            {country.name.common}
          </button>
        {/if}
      {:else}
        <button
          class="option"
          on:click={() => {
            guess = country;
            guessCountry(guess);
          }}
        >
          {country.name.common}
        </button>
      {/if}
    {/each}
  </div>
</main>

<style>
  .option {
    font-size: 3.5vmin;
  }

  .correct-guess {
    cursor: not-allowed;
    background-color: var(--green) !important;
    border-color: var(--green) !important;
  }

  .not-correct-guess {
    cursor: not-allowed;
    background-color: var(--red) !important;
    border-color: var(--red) !important;
  }

  .not-correct {
    cursor: not-allowed;
    background-color: transparent !important;
    border-color: var(--red) !important;
  }

  .correct {
    cursor: not-allowed;
    background-color: transparent !important;
    border-color: var(--green) !important;
  }

  .options {
    margin-top: 10px;
    display: grid;
    justify-content: center;
    grid-template-columns: 40% 40%;
    gap: 5px;
  }
</style>
