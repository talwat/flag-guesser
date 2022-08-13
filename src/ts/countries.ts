interface Country {
  cca2: string;
  name: { common: string };
}

/**
 * The maximum is exclusive and the minimum is inclusive
 */
function random(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getCountries(amount: number, countryList: Country[]): Country[] {
  const list: Country[] = countryList;
  const result: Country[] = [];

  for (let i = 0; i < amount; i++) {
    const countryIndex = random(0, list.length);
    result.push(list[countryIndex]);
    list.splice(countryIndex, 1);
  }

  return result;
}

function getAnswer(options: Country[]) {
  return options[random(0, options.length)];
}

function emptyCountry(): Country {
  return { cca2: "", name: { common: "" } };
}

export { getCountries, random, getAnswer, emptyCountry, type Country };
