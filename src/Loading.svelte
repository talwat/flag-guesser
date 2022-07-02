<script>
  import Loader from "./lib/Loader.svelte";
</script>

<div class="loading">
  <Loader />
</div>

<style>
  .loading {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>
