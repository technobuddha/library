export type ToCapitalWordCaseOptions = {
  /** Convert other characters in the string to lower case */
  lowerCase?: boolean;
};

/**
 * Capitalize the first letter of each word in a string
 *
 * @param input - The string to capitalize
 * @param __namedParameters - see {@link ToCapitalWordCaseOptions}
 * @defaultValue lowercase false
 */
export function toCapitalWordCase(
  input: string,
  { lowerCase = false }: ToCapitalWordCaseOptions = {},
): string {
  return (lowerCase ? input.toLocaleLowerCase() : input).replaceAll(/\b\w/gu, (l) =>
    l.toLocaleUpperCase(),
  );
}
