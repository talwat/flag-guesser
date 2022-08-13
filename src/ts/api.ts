import type { Country } from "./countries";

async function getCountryList(): Promise<Country[]> {
  const url: string = "https://restcountries.com/v3.1/all?fields=name,cca2";
  const resp: Response = await fetch(url);
  const json: Country[] = (await resp.json()) as Country[];

  return json;
}

function getFlagLink(country: Country): string {
  return `https://countryflagsapi.com/svg/${country.cca2}`;
}

export { getCountryList, getFlagLink };
