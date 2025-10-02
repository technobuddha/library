// cspell:disable
/* eslint-disable no-secrets/no-secrets */
/**
 * Talisman phonetics/soundex
 * ===========================
 *
 * The Soundex algorithm.
 *
 * [Reference]: https://en.wikipedia.org/wiki/Soundex
 *
 * [Authors]:
 * Robert C. Russel
 * Margaret King Odell
 */
import { removeDiacritics as deburr } from "@technobuddha/library";

import { squeeze, translation } from "./helpers/index.ts";

const REFINED_TRANSLATIONS = translation(
  "AEIOUYWHBPFVCKSGJQXZDTLMNR",
  "00000000112233344555667889",
);

export function soundexRefined(input: string): string {
  const name = deburr(input)
    .toUpperCase()
    .replaceAll(/[^A-Z]/gv, "");

  if (name === "") {
    return "";
  }

  const firstLetter = name.charAt(0);

  // Process the code for the name's tail
  let tail = "";

  for (let i = 0, l = name.length; i < l; i++) {
    tail += REFINED_TRANSLATIONS[name[i]];
  }

  // Composing the code from the tail
  const code = squeeze(tail);

  return firstLetter + code;
}
