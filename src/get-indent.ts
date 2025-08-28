import { type IndentOptions } from './indent.ts';
import { space } from './unicode.ts';

/**
 * Determine the indentation level of text
 * @param input - The indented text
 * @param options - see {@link IndentOptions}
 * @defaultValue indenter space
 * @returns The minimum amount of indentation on each line
 * @group String
 * @category Indentation
 */
export function getIndent(input: string, { indenter = space }: IndentOptions = {}): number {
  const matches = new RegExp(`^(${RegExp.escape(indenter)})+`, 'ugm').exec(input);
  if (matches == null) {
    return 0;
  }

  return Math.min(...matches.map((m) => m.length)) / indenter.length;
}
