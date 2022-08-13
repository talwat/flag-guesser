<script lang="ts">
  import Main from "./Main.svelte";
</script>

<Main />

<style>
  @import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900);

  :root {
    --blue: #0a84ff;
    --indigo: #5e5ce6;
    --red: #ff453a;
    --green: rgb(48, 209, 88);

    --bg-5: #2c2c2e;
    --bg-4: #1c1c1e;
    --bg-3: #3a3a3c;
    --bg-2: #48484a;
    --bg-1: #636366;
    --bg-0: #8e8e93;

    --fg: white;
  }

  :global(button) {
    border-style: solid;
    border-width: 2px;
    border-radius: 8px;
    color: var(--fg);
    background-color: var(--bg-5);
    border-color: var(--bg-5);
    padding: 4px;
    margin: 0;
  }

  :global(*) {
    font-family: 'Roboto', sans-serif !important;
    color: var(--fg);
    transition: background-color 0.2s, color 0.2s;
  }

  :global(p) {
    margin: 0;
  }

  :global(body, html, #app, main) {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    background-color: var(--bg-4);
  }
</style>
