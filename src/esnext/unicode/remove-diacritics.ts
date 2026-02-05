import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

import { empty } from './unicode.ts';

/**
 * Unicode normalization forms as defined by the ECMAScript String.prototype.normalize method.
 *
 * - 'NFC': Canonical Composition
 * - 'NFD': Canonical Decomposition
 * - 'NFKC': Compatibility Composition
 * - 'NFKD': Compatibility Decomposition
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 *
 * @group Unicode
 * @category Normalization
 */
export type NormalizationForm = 'NFC' | 'NFD' | 'NFKC' | 'NFKD';

/**
 * Options for removing diacritics from a string.
 *
 * @group Unicode
 * @category Normalization
 */
export type RemoveDiacriticsOptions = {
  /** The normalization form to use before removing diacritics (default: 'NFD'). */
  denormalize?: NormalizationForm;
  /** The normalization form to use after removing diacritics (default: 'NFC'). */
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
