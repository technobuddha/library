export type ToSmallWordsCaseOptions = {
  /** Convert other characters in the string to upper case */
  upperCase?: boolean;
};

/**
 * Convert the first letter of each word in a string to lower case
 *
 * @param input - The string to make small case
 * @defaultValue upperCase false
 * @returns string in small case
 */
export function toSmallWordsCase(
  input: string,
  { upperCase = false }: ToSmallWordsCaseOptions = {},
): string {
  return (upperCase ? input.toLocaleUpperCase() : input).replaceAll(/\b\w/gu, (c) =>
    c.toLocaleLowerCase(),
  );
}
