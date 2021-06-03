import toCapitalCase  from './toCapitalCase';

/**
 * Convert an identifier string to pascal case
 *
 * @param input The identifer string
 * @returns the identifier in pascal case
 */
export function toPascalCase(input: string): string {
    return toCapitalCase(input.trim().replace(/[-_.\s]+\w/ug, c => c.slice(-1).toUpperCase()));
}

export default toPascalCase;
