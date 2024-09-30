/**
 * Convert an identifier string to underscore case
 *
 * @param input The identifier string
 * @returns the identifier in underscore case
 */
export function toUnderscoreCase(input: string): string {
  return input
    .trim()
    .replaceAll(/[-_.\s]+\w/gu, (c) => `_${c.slice(-1).toUpperCase()}`)
    .toLowerCase();
}

export default toUnderscoreCase;
