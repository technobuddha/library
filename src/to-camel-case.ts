import toSmallCase from './to-small-case.js';

/**
 * Convert an identifier string to a camel case
 *
 * @param input The identifier string
 * @returns string in camel case
 */
export function toCamelCase(input: string): string {
  return toSmallCase(input.trim().replaceAll(/[-_.\s]+\w/gu, (c) => c.slice(-1).toUpperCase()));
}

export default toCamelCase;
