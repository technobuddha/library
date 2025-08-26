import { space } from './unicode.ts';

/**
 * Options for the indentation functions: {@link  getIndent}, {@link indent}, and {@link unindent}
 *
 * @group String
 * @category Indentation
 */
export type IndentOptions = {
  /** The indentation character */
  indenter?: string;
};

/**
 * Indent each line of a string
 *
 * @param input - The string to indent
 * @param options - see {@link IndentOptions}
 * @defaultValue indenter space
 * @returns string with each line indented
 * @group String
 * @category Indentation
 */
export function indent(input: string, { indenter = space }: IndentOptions = {}): string {
  return input.replaceAll(/^/gmu, indenter);
}
