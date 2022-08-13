<script lang="ts" context="module">
  import {
    writable,
    derived,
    type Writable,
    type Readable,
  } from "svelte/store";

  export const options: Writable<Country[]> = writable([]);
  export const answer: Writable<Country> = writable(emptyCountry());
  export const guessed: Writable<Country | undefined> = writable(undefined);
  export const result: Writable<"correct" | "incorrect" | "loading" | null> =
    writable(null);

  export const score: Writable<number> = writable(0);
  export const total: Writable<number> = writable(0);
  export const percent: Readable<number> = derived(
    [score, total],
    ([$score, $total]) => {
      let raw: number = Math.round(($score / $total) * 100);
      return raw ? raw : 0;
    }
  );
</script>

<script lang="ts">
  import Confetti from "js-confetti";
  import { onMount } from "svelte";
  import { countryList } from "./ts/stores";
  import { getCountryList, getFlagLink } from "./ts/api";
  import {
    emptyCountry,
    getAnswer,
    getCountries,
    type Country,
  } from "./ts/countries";

  import Loading from "./Loading.svelte";
  import { fade } from "svelte/transition";

  onMount(async () => {
    $countryList = await getCountryList();
    newCountries();
  });

  const jsConfetti: Confetti = new Confetti();

  let imageURL: string;

  let timeOutID: NodeJS.Timeout;

  async function load(): Promise<void> {
    $result = "loading";

    return new Promise(function (resolve) {
      let img: HTMLImageElement = new Image();
      img.onload = () => {
        $result = null;

        resolve();
      };
      img.src = imageURL;
    });
  }

  function newCountries(): void {
    $options = getCountries(4, $countryList);
    $answer = getAnswer($options);
    imageURL = getFlagLink($answer);

    clearTimeout(timeOutID);

    $result = null;
  }

  function guess(option: Country): void {
    $guessed = option;

    if ($guessed === $answer) {
      $result = "correct";
      $score++;
      jsConfetti.addConfetti({
        confettiRadius: 6,
        confettiNumber: 500,
      });
    } else {
      $result = "incorrect";
    }

    $total++;

    timeOutID = setTimeout(newCountries, 3000);
  }

  function resetScore(): void {
    $score = 0;
    $total = 0;
    newCountries();
  }
</script>

<main>
  <div class="master">
    <div class="info">
      <p class="header important">Flag Guesser</p>
      {#key $result}
        <p class="status-txt important" in:fade={{ duration: 300 }}>
          {$result === "loading"
            ? "Loading..."
            : $result === "correct"
            ? "Correct!"
            : $result === "incorrect"
            ? `Incorrect, the answer was: ${$answer.name.common}`
            : "Guess!"}
        </p>
      {/key}
      <div class="scores">
        <p class="score-txt">Score: {$score}/{$total} {$percent}%</p>
        <button class="reset-score-btn" on:click={resetScore}
          >Reset Score</button
        >
      </div>
    </div>
    {#key $answer}
      {#await load()}
        <Loading />
      {:then}
        <div class="flag" in:fade={{ duration: 300 }}>
          <img class="flag-image" src={imageURL} alt={$answer.name.common} />
        </div>
        <div class="options" in:fade={{ duration: 700 }}>
          {#each $options as option}
            <button
              class={($result === null
                ? "option-btn-wait"
                : option === $answer && option === $guessed
                ? "correct-picked correct"
                : option === $answer
                ? "correct"
                : option === $guessed
                ? "incorrect-picked incorrect"
                : "incorrect") + " option-btn"}
              disabled={$result !== null}
              on:click={() => guess(option)}>{option.name.common}</button
            >
          {/each}
        </div>
      {:catch}
        <p>An error occured.</p>
      {/await}
    {/key}
  </div>
</main>

<style>
  .important {
    font-weight: 500;
  }

  .info {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-direction: column;
    margin: 12px;
  }

  .info > p {
    width: 100%;
    text-align: center;
  }

  .score-txt {
    font-size: 24px;
    text-align: center;
    margin: 6px;
  }

  .master {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    height: 100%;
  }

  .flag {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;
  }

  .scores {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .flag-image {
    max-width: 90vw;
    max-height: 50vh;
    border-radius: 10px;
    border: var(--border) 3px solid;
  }

  .options {
    display: grid;
    justify-items: stretch;
    justify-content: center;
    grid-template-columns: calc(40% - 2px) calc(40% - 2px);
    padding: 8px;
    margin: 0;
    gap: 4px;
  }

  .status-txt {
    font-size: 32px;
  }

  .header {
    font-size: 42px;
  }

  .correct-picked {
    background-color: var(--green);
  }

  .incorrect-picked {
    background-color: var(--red);
  }

  .correct {
    border-color: var(--green);
  }

  .incorrect {
    border-color: var(--red);
  }

  .reset-score-btn {
    font-size: 18px;
    min-height: 32px;
  }

  .option-btn-wait:hover,
  .reset-score-btn:hover {
    border-color: var(--bg-3);
  }

  .option-btn-wait:active,
  .reset-score-btn:active {
    border-color: var(--bg-3);
    background-color: var(--bg-3);
  }

  @media only screen and (max-width: 500px) {
    .options {
      grid-template-columns: 80%;
    }

    .header {
      font-size: 32px;
    }

    .status-txt {
      font-size: 24px;
    }

    .score-txt {
      font-size: 20px;
      margin: 3px;
    }
  }

  .option-btn {
    font-size: 26px;
  }
</style>
