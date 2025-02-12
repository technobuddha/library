/**
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
 * @param __namedParameters - see {@link IndentOptions}
 * @defaultValue indenter space
 * @returns string with each line indented
 * @group String
 * @category Indentation
 */
export function indent(input: string, { indenter = ' ' }: IndentOptions = {}): string {
  return input.replaceAll(/^/gmu, indenter);
}
