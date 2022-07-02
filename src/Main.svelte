<script>
  import Confetti from "js-confetti";
  import { fade } from "svelte/transition";

  import { getCountries, random } from "./js/countries";

  import Loading from "./Loading.svelte";
  import Options from "./Options.svelte";
  import Status from "./Status.svelte";

  let answer = undefined;
  let countries = undefined;
  let imageURL = undefined;
  let imageLoaded = false;
  let correct = undefined;

  let score = 0;
  let total = 0;
  let percent = 0;

  let timeOutID = undefined;

  const jsConfetti = new Confetti();

  function reset() {
    score = 0;
    total = 0;
    percent = 0;
    clearTimeout(timeOutID);
    newFlags();
  }

  function newFlags() {
    answer = undefined;
    countries = undefined;
    imageLoaded = undefined;
    imageURL = undefined;
    correct = undefined;

    getCountries(4).then((result) => {
      countries = result;
      answer = countries[random(0, countries.length)];
      imageURL = `https://countryflagsapi.com/svg/${answer.cca2}`;

      load().then(() => {
        imageLoaded = true;
      });
    });
  }

  function load() {
    return new Promise(function (resolve) {
      let img = new Image();
      img.onload = resolve;
      img.src = imageURL;
    });
  }

  /**
   * @param {object} guess
   */
  function guessCountry(guess) {
    if (correct != undefined) {
      return;
    }

    total++;

    if (guess === answer) {
      correct = true;
      score++;
      jsConfetti.addConfetti({
        confettiRadius: 6,
        confettiNumber: 500,
      });
    } else {
      correct = false;
    }

    percent = Math.round((score / total) * 100);
    timeOutID = setTimeout(function () {
      newFlags();
    }, 3000);
  }

  newFlags();
</script>

<main>
  <div class="cursor" />
  <div class="info-container">
    <h1 class="main-header">Flag Guesser</h1>
    <Status
      loaded={countries == undefined || !imageLoaded}
      {answer}
      {correct}
    />
    <div class="score-container">
      <span class="score">Score: {score}/{total} {percent}%</span>
      <button on:click={reset} class="reset-btn">Reset Score</button>
    </div>
  </div>

  {#if countries != undefined && imageLoaded}
    <div class="info-container">
      <img
        in:fade={{ duration: 300 }}
        class="flag-image"
        src={imageURL}
        alt={answer.name}
      />
    </div>

    <Options {countries} {answer} {correct} {guessCountry} />
  {:else}
    <Loading />
  {/if}
</main>

<style>
  .main-header {
    font-size: 42px;
    margin: 5px;
  }

  .info-container {
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
  }

  .info-container > h1 {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .flag-image {
    max-width: 90vw;
    max-height: 50vh;
    border-radius: 10px;
    border: var(--border) 3px solid;
  }

  .score {
    font-size: 24px;
    margin: 5px;
  }
  @media only screen and (max-width: 300px) {
    .score {
      font-size: 18px;
      margin: 5px;
    }
  }

  .reset-btn {
    margin: 5px;
    font-size: 18px;
    padding: 3px;
    padding-top: 1px;
    padding-bottom: 1px;
  }

  .score-container {
    display: flex;
    align-items: center;
  }
</style>
