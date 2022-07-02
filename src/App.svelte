<script>
  import Main from "./Main.svelte";
</script>

<main>
  <Main />
</main>

<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto");

  :global(button) {
    cursor: pointer;
    background-color: var(--bg-2);
    border-radius: 10px;
    border: solid 5px var(--bg-2);
    transition: 0.15s;
  }
  :global(button):hover {
    border-color: var(--bg-3);
  }
  :global(button):active {
    border-color: var(--bg-3);
    background-color: var(--bg-3);
  }

  :global(body) {
    background-color: var(--bg-1);
    margin: 0;
  }

  :global(*) {
    font-family: Roboto;
    color: var(--fg);
  }

  :root {
    --bg-0: #333333;
    --bg-1: #4d4d4d;
    --bg-2: #666666;
    --bg-3: #808080;
    --red: #db4437;
    --green: #0f9d58;
    --border: #111111;
    --fg: white;
    --link: #4285f4;
  }
</style>
