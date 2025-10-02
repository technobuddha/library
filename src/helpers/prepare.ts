import { keep } from "../esnext/string/keep.ts";
import { removeDiacritics } from "../esnext/unicode/remove-diacritics.ts";
import { space } from "../esnext/unicode/unicode.ts";

export function prepare(input: string, whitespace = false, diacritics = true): string {
  let text = diacritics ? removeDiacritics(input) : input;
  text = text.replaceAll(/[\s\p{P}\p{S}]+/gv, space);
  return keep(text, { alphabetic: true, letters: !diacritics, whitespace }).trim();
}
