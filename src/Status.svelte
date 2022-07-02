<script>
  import { fade } from "svelte/transition";

  export let loaded;
  export let answer;
  export let correct;
</script>

<main>
  {#if loaded}
    <h1 in:fade={{ duration: 300 }} class="status-header">Loading...</h1>
  {:else if correct == undefined}
    <h1 in:fade={{ duration: 300 }} class="status-header">Guess!</h1>
  {:else if correct}
    <h1 in:fade={{ duration: 300 }} class="status-header">Correct!</h1>
  {:else}
    <h1 in:fade={{ duration: 300 }} class="status-header">
      Incorrect, the answer was: {answer.name.common}
    </h1>
  {/if}
</main>

<style>
  .status-header {
    font-size: 32px;
    margin: 5px;
  }
</style>
