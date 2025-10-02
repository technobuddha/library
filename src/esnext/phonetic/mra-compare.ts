import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { mra } from './mra.ts';

/**
 * Result of MRA comparison.
 * @group Phonetic
 * @category MRA
 */
export type MraCompare = {
  /** The two MRA codes being compared */
  codex: [string, string];
  /** Minimum similarity threshold */
  minimum: number;
  /** Calculated similarity score */
  similarity: number;
  /** Whether the codes are considered a match */
  matching: boolean;
};

/**
 * Compares two strings using the Match Rating Approach (MRA).
 * @param a - First string
 * @param b - Second string
 * @returns Comparison result or null if codes are too different
 * @group Phonetic
 * @category MRA
 */
export function mraCompare(a: StringLike, b: StringLike): MraCompare | null {
  const codexA = mra(a);
  const codexB = mra(b);

  if (Math.abs(codexA.length - codexB.length) > 3) {
    return null;
  }

  const sum = codexA.length + codexB.length;
  const minimum =
    sum <= 4 ? 5
    : sum > 4 && sum <= 7 ? 4
    : sum > 7 && sum <= 11 ? 3
    : 2;

  let len = Math.max(codexA.length, codexB.length);
  let codexALR = empty;
  let codexBLR = empty;
  for (let i = 0; i < len; i++) {
    if (codexA[i] !== codexB[i]) {
      codexALR += codexA[i] ?? empty;
      codexBLR += codexB[i] ?? empty;
    }
  }

  len = Math.max(codexALR.length, codexBLR.length);
  let codexARL = empty;
  let codexBRL = empty;
  for (let i = 0; i < len; i++) {
    const lA = codexALR[codexALR.length - 1 - i];
    const lB = codexBLR[codexBLR.length - 1 - i];

    if (lA !== lB) {
      codexARL += lA ?? empty;
      codexBRL += lB ?? empty;
    }
  }

  const unmatched = Math.max(codexARL.length, codexBRL.length);
  const similarity = 6 - unmatched;
  const matching = similarity >= minimum;

  return {
    codex: [codexA, codexB],
    minimum,
    similarity,
    matching,
  };
}
