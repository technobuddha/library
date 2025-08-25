import { type DeconstructedNumber } from './@types/deconstructed-number.ts';

/**
 * Reconstructs a number from its deconstructed representation.
 *
 * @param deconstructed - An object containing the sign, mantissa, and exponent of the number.
 * @returns The reconstructed number.
 * @group Math
 * @category Number
 */
export function constructNumber(deconstructed: Omit<DeconstructedNumber, 'value'>): number {
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
