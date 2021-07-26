import toSmallCase from './toSmallCase';

/**
 * Convert an identifier string to a camel case
 *
 * @param input The identifier string
 * @returns string in camel case
 */
export function toCamelCase(input: string): string {
    return toSmallCase(input.trim().replace(/[-_.\s]+\w/ug, c => c.slice(-1).toUpperCase()));
}

export default toCamelCase;
