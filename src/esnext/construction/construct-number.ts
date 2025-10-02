import { type DeconstructedNumber } from './deconstructed-number.ts';

/**
 * Reconstructs a number from its deconstructed representation.
 * @param deconstructed - An object containing the sign, mantissa, and exponent of the number.
 * @returns The reconstructed number.
 * @example
 * ```typescript
 * constructNumber({ sign: 1, mantissa: '123', exponent: 0 }); // 1.23
 * constructNumber({ sign: -1, mantissa: '500', exponent: 2 }); // -5
 * constructNumber({ sign: 1, mantissa: '', exponent: 0 }); // 0
 * ```
 * @group Math
 * @category Number
 */
export function constructNumber(
  deconstructed: Omit<DeconstructedNumber, 'value' | 'fractional' | 'whole'>,
): number {
  if (deconstructed.mantissa === '') {
    return deconstructed.sign * 0;
  }

  return (
    deconstructed.sign *
    Number.parseFloat(
      `${deconstructed.mantissa.slice(0, 1)}.${deconstructed.mantissa.slice(1)}e${deconstructed.exponent}`,
    )
  );
}
