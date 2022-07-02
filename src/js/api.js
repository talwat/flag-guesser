async function getCountryList() {
  const resp = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2"
  );
  const json = await resp.json();
  return json;
}

export { getCountryList };
