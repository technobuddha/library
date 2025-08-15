/**
 * Convert an identifier string to a kebab-case form
 *
 * @param input - The identifier string
 * @returns the identifier in kebab-case form
 * @group String
 * @category Case Conversion
 */
export function toKebabCase(input: string): string {
  return input
    .trim()
    .replaceAll(/[-_.\s]+\w/gu, (c) => `-${c.slice(-1)}`)
    .toLocaleLowerCase();
}
