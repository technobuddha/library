/**
 * Convert an identifier string to a dash form
 *
 * @param input - The identifier string
 * @returns the identifier in dash form
 * @group String
 * @category Case Conversion
 */
export function toDashCase(input: string): string {
  return input
    .trim()
    .replaceAll(/[-_.\s]+\w/gu, (c) => `-${c.slice(-1)}`)
    .toLocaleLowerCase();
}
