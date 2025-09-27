import { empty } from '../unicode.ts';

import { type Diff } from './difference.ts';

/**
 * Rehydrate the text in a diff from a string of line hashes to real lines of
 * text.
 * @param diffs - Array of diff tuples.
 * @param lineArray - Array of unique strings.
 * @internal
 */
export function charsToLines(diffs: Diff[], lineArray: string[]): void {
  for (const diff of diffs) {
    const chars = diff.text;
    const text = [];
    for (const char of chars) {
      text.push(lineArray[char.charCodeAt(0)]);
    }
    diff.text = text.join(empty);
  }
}
