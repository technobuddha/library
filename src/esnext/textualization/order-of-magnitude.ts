import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { illion } from './illion.ts';

/**
 * Get the spelled out word for an exponent
 * @remarks This is only using the exponent, There is no limit to the numbers this function can represents, however Javascript/Typescript can only represent
 * numbers up to 1e308, which limits the numbers that this method can represent to 10 \*\* 10 \*\* 308 which is really really big.
 * @param exponent - The exponent to convert
 * @returns Order of Magnitude as text
 * @example
 * ```typescript
 * orderOfMagnitude(3); // "thousand"
 * orderOfMagnitude(6); // "million"
 * orderOfMagnitude(9); // "billion"
 * orderOfMagnitude(0); // ""
 * orderOfMagnitude(-3); // null
 * ```
 * @group Number
 * @category Formatting
 */
export function orderOfMagnitude(exponent: NumberLike): string | null {
  return illion('000', toNumber(exponent), false).word;
}
