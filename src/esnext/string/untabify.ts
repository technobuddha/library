import { splitLines } from '../tokenization/split-lines.ts';
import { space } from '../unicode/unicode.ts';

/**
 * Replaces tabs in a string with spaces, aligning to the next tab stop.
 *
 * @param input - The string to untabify.
 * @param tabWidth - The number of spaces per tab stop (default: 4).
 * @returns The untabified string.
 * @group String
 * @category Formatting
 * @example
 * untabify('	Hello	World', 4); //     Hello   World
 */
export function untabify(input: string, tabWidth = 4): string {
  return splitLines(input)
    .map((line) => {
      let result = '';
      let col = 0;
      for (const char of line) {
        if (char === '\t') {
          const spaces = tabWidth - (col % tabWidth);
          result += space.repeat(spaces);
          col += spaces;
        } else {
          result += char;
          col += 1;
        }
      }
      return result;
    })
    .join('\n');
}
