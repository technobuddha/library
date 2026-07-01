import { splitLines } from '../tokenization/split-lines.ts';
import { space } from '../unicode/unicode.ts';

import { type IndentOptions } from './indent.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Determine the indentation level of text
 * @param input - The indented text
 * @param options - see {@link IndentOptions}
 * @defaultValue indenter space
 * @returns The minimum amount of indentation on each line
 * @group String
 * @category Indentation
 */
export function getIndent(input: StringLike, { indenter = space }: IndentOptions = {}): number {
  let indent = Infinity;

  for (const line of splitLines(toString(input))) {
    let lineIndent = 0;
    for (let i = 0; i < line.length; i += indenter.length) {
      if (line.slice(i, i + indenter.length) === indenter) {
        lineIndent++;
      } else {
        break;
      }
    }

    if (lineIndent * indenter.length < line.length) {
      indent = Math.min(indent, lineIndent);
    }
  }

  return indent === Infinity ? 0 : indent;
}
