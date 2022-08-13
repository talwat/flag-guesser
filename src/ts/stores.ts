import { writable, type Writable } from "svelte/store";
import type { Country } from "./countries";

export const countryList: Writable<Country[]> = writable([]);
