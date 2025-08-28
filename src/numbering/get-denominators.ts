import { type Numbering } from './numbering.ts';

/**
 * Returns an array of denominators based on the provided `denominators` parameter.
 *
 * - If `denominators` is `'common'`, returns the default set: `[1, 2, 3, 4, 5, 6, 7, 8, 12]`.
 * - If `denominators` is `'wrench'`, returns the wrench set: `[1, 2, 4, 8, 16, 32]`.
 * - Otherwise, returns the provided array of denominators.
 *
 * @param denominators - The type or array of denominators to use. Can be `'common'`, `'wrench'`, or a custom array of numbers.
 * @returns An array of denominators as numbers.
 * @internal
 */
export function getDenominators(denominators: Numbering['denominators']): number[] {
  if (denominators === 'common' || denominators === undefined) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 12];
  }

  if (denominators === 'wrench') {
    return [1, 2, 4, 8, 16, 32];
  }

  return denominators;
}
