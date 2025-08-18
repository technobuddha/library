/**
 * Options for the {@link toCapitalWordCase} function
 *
 * @group String
 * @category Case Conversion
 */
export type CapitalWordCaseOptions = {
  /** Convert other characters in the string to lower case */
  lowerCase?: boolean;
};

/**
 * Capitalize the first letter of each word in a string
 *
 * @param input - The string to capitalize
 * @param options - see {@link CapitalWordCaseOptions}
 * @defaultValue lowercase false
 * @group String
 * @category Case Conversion
 */
export function toCapitalWordCase(
  input: string,
  { lowerCase = false }: CapitalWordCaseOptions = {},
): string {
  return (lowerCase ? input.toLocaleLowerCase() : input).replaceAll(/\b\w/gu, (l) =>
    l.toLocaleUpperCase(),
  );
}
