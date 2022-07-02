import { getCountryList } from "./api";

/**
 * The maximum is exclusive and the minimum is inclusive
 * @param {number} min
 * @param {number} max
 */
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * @param {number} amount
 */
async function getCountries(amount) {
  let list = await getCountryList();
  let result = [];

  for (let i = 0; i < amount; i++) {
    const countryIndex = random(0, list.length);
    result.push(list[countryIndex]);
    list.splice(countryIndex, 1);
  }

  return result;
}

export { getCountries, random };
