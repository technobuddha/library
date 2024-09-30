import toCapitalCase from './to-capital-case';

/**
 * Convert an identifier string to pascal case
 *
 * @param input The identifier string
 * @returns the identifier in pascal case
 */
export function toPascalCase(input: string): string {
  return toCapitalCase(input.trim().replaceAll(/[-_.\s]+\w/gu, (c) => c.slice(-1).toUpperCase()));
}

export default toPascalCase;
