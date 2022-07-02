async function getCountryList() {
  const resp = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2,flags"
  );
  const json = await resp.json();
  return json;
}

/**
 * @param {{ cca2: string; }} country
 */
function getFlagLink(country) {
  return `https://countryflagsapi.com/svg/${country.cca2}`
}

export { getCountryList, getFlagLink };
