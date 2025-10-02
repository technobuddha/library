import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

import { empty } from './unicode.ts';

type NormalizationForm = 'NFC' | 'NFD' | 'NFKC' | 'NFKD';

type RemoveDiacriticsOptions = {
  denormalize?: NormalizationForm;
  normalize?: NormalizationForm;
};

/**
 * Regular expression to match all Unicode combining diacritical marks.
 * @internal
 */
const re = /\p{Mn}/gv;

/**
 * Remove all diacritics from a string
 * @param input - The string
 * @returns string with diacritics removed
 * @group Unicode
 * @category Normalization
 */
export function removeDiacritics(
  input: StringLike,
  { denormalize = 'NFD', normalize = 'NFC' }: RemoveDiacriticsOptions = {},
): string {
  return toString(input).normalize(denormalize).replaceAll(re, empty).normalize(normalize);
}
