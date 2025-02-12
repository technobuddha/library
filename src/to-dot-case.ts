/**
 * Convert an identifier string to a dot form
 *
 * @param input - The identifier string
 * @returns the identifier in dot form
 * @group String
 * @category Case Conversion
 */
export function toDotCase(input: string): string {
  return input
    .trim()
    .replaceAll(/[-_.\s]+\w/gu, (c) => `.${c.slice(-1)}`)
    .toLocaleLowerCase();
}
