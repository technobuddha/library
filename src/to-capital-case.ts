/**
 * Options for the {@link toCapitalCase} function
 *
 * @group String
 * @category Case Conversion
 */
export type CapitalCaseOptions = {
  /** Convert the rest of the string to lower case */
  lowerCase?: boolean;
};

/**
 * Capitalize the first letter of a string
 * @param input - The string to capitalize
 * @param options - see {@link CapitalCaseOptions}
 * @defaultValue lowerCase default
 * @group String
 * @category Case Conversion
 */
export function toCapitalCase(
  input: string,
  { lowerCase = false }: CapitalCaseOptions = {},
): string {
  return (
    input.charAt(0).toLocaleUpperCase() +
    (lowerCase ? input.slice(1).toLocaleLowerCase() : input.slice(1))
  );
}
