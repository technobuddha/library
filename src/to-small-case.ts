export type ToSmallCaseOptions = {
  /** Convert other characters in the string to upper case */
  upperCase?: boolean;
};

/**
 * Convert the first letter of a string to lower case
 *
 * @param input - The string to make small case
 * @defaultValue upperCase false
 * @returns the string in small case
 */
export function toSmallCase(input: string, { upperCase = false }: ToSmallCaseOptions = {}): string {
  return (
    input[0].toLocaleLowerCase() + (upperCase ? input.slice(1).toLocaleUpperCase() : input.slice(1))
  );
}
