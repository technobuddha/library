import { cardinal } from './cardinal.ts';
import { floor } from './floor.ts';

type Frac = { numeric: string; alphabetic: string; value: number };

// prettier-ignore
const fractions: Frac[] = [
  // Don't use 1/10, 1/9, or 1/7 - they don't have other numerators, and are a different width
  // /* 0.100000 */ { value: 1/10, alphabetic: 'one‐tenth',     numeric: '⅒', },
  // /* 0.̅1̅1̅1̅1̅1̅1 */ { value: 1/9,  alphabetic: 'one‐ninth',     numeric: '⅑', },
  // /* 0.̅1̅4̅2̅8̅5̅7 */ { value: 1/7,  alphabetic: 'one‐seventh',   numeric: '⅐', },

  /* 0.125000 */ { value: 1/8,  alphabetic: 'one‐eighth',    numeric: '⅛', },
  /* 0.166666 */ { value: 1/6,  alphabetic: 'one‐sixth',     numeric: '⅙', },
  /* 0.200000 */ { value: 1/5,  alphabetic: 'one‐fifth',     numeric: '⅕', },
  /* 0.250000 */ { value: 1/4,  alphabetic: 'one‐fourth',    numeric: '¼', },
  /* 0.̅3̅3̅3̅3̅3̅3 */ { value: 1/3,  alphabetic: 'one‐third',     numeric: '⅓', },
  /* 0.375000 */ { value: 3/8,  alphabetic: 'three‐eighths', numeric: '⅜', },
  /* 0.400000 */ { value: 2/5,  alphabetic: 'two‐fifths',    numeric: '⅖', },
  /* 0.500000 */ { value: 1/2,  alphabetic: 'one‐half',      numeric: '½', },
  /* 0.600000 */ { value: 3/5,  alphabetic: 'three‐fifths',  numeric: '⅗', },
  /* 0.625000 */ { value: 5/8,  alphabetic: 'five‐eighths',  numeric: '⅝', },
  /* 0.̅6̅6̅6̅6̅6̅6 */ { value: 2/3,  alphabetic: 'two‐thirds',    numeric: '⅔', },
  /* 0.750000 */ { value: 3/4,  alphabetic: 'three‐fourths', numeric: '¾', },
  /* 0.800000 */ { value: 4/5,  alphabetic: 'four‐fifths',   numeric: '⅘', },
  /* 0.8̅3̅3̅3̅3̅3 */ { value: 5/6,  alphabetic: 'five‐sixths',   numeric: '⅚', },
  /* 0.875000 */ { value: 7/8,  alphabetic: 'seven‐eighths', numeric: '⅞', },
];

/**
 * Options for configuring fraction output.
 */
export type FractionOptions = {
  /**
   * Determines the format of the fraction output.
   *   - `'numeric'`: Outputs the fraction in numeric form (e.g., "3/4").
   *   - `'alphabetic'`: Outputs the fraction in alphabetic form (e.g., "three-fourths").
   */
  output?: 'numeric' | 'alphabetic';
};

/**
 * Converts a numeric input into a formatted fraction string, either in numeric or alphabetic form.
 *
 * The function finds the closest matching fraction from a predefined list and formats the output
 * based on the specified options. If the input is negative, the result is prefixed accordingly.
 * The output can be either a numeric representation (e.g., "1 1/2") or an alphabetic representation
 * (e.g., "one and one half").
 *
 * @param input - The number to convert to a fraction string.
 * @param options - An optional object specifying the output format.
 * @returns The formatted fraction string.
 */
export function fraction(input: number, { output = 'numeric' }: FractionOptions = {}): string {
  const sign = Math.sign(input);
  const pos = Math.abs(input);
  const whole = floor(pos);
  const frac = pos - whole;

  const [best] = fractions
    .map((f) => ({ ...f, diff: Math.abs(f.value - frac) }))
    .sort((a, b) => a.diff - b.diff);

  if (output === 'numeric') {
    const s = sign < 0 ? '-' : '';
    if (frac === 0) {
      return `${s}${whole}`;
    }
    return whole === 0 ? `${s}${best.numeric}` : `${s}${whole} ${best.numeric}`;
  }

  const s = sign < 0 ? 'negative ' : '';
  if (frac === 0) {
    return `${s}${cardinal(whole)}`;
  }
  return whole === 0 ? `${s}${best.alphabetic}` : `${s}${cardinal(whole)} and ${best.alphabetic}`;
}
