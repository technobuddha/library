import { type Numbering } from './numbering.ts';

export function getDenominators(denominators: Numbering['denominators']): number[] {
  if (denominators === 'common' || denominators === undefined) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 12];
  }

  if (denominators === 'wrench') {
    return [1, 2, 4, 8, 16, 32];
  }

  return denominators;
}
