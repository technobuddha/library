import { numbering } from './numbering/numbering.ts';
import { empty, space } from './unicode.ts';

/**
 * Get a short description of a number
 * @remarks this is a shortcut to calling cardinal with options \{groups: 1, digits: true\}
 * @example
 * ```typescript
 * summarize(1000000); // "1 million"
 * summarize(101323847382459); // "101 trillion"
 * summarize(1234); // "1.23 thousand"
 * summarize(0.00056); // "560 millionths"
 * ```
 * @param input - number to convert
 * @returns number as text
 * @group Math
 * @category Verbalization
 */
export function summarize(input: number): string {
  return numbering(input, {
    output: { integer: 'hybrid', fraction: 'alphabetic' },
    and: empty,
    hyphen: space,
    tolerance: 0.01,
    denominators: 'common',
    precision: 3,
    ordinal: false,
    shift: 'decimal',
  });
}
