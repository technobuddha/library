import { empty, space } from '../constants.ts';

import { numbering } from './numbering.ts';

/**
 * Get a short description of a number
 *
 * @remarks this is a shortcut to calling cardinal with options \{groups: 1, digits: true\}
 *
 * @example 1000000 "1 million"
 * @example 101323847382459 "101 trillion"
 *
 * @param input - number to convert
 * @returns number as text
 *
 * @group Math
 * @category Numbers
 */
export function summarize(input: number): string {
  return numbering(input, {
    output: { integer: 'hybrid', fraction: 'alphabetic' },
    and: empty,
    hyphen: space,
    tolerance: 0.01,
    denominators: 'common',
    precision: 2,
  });
}
