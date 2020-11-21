import toCapitalCase  from './toCapitalCase';

/**
 * Convert an identifier string to pascal case
 * 
 * @param input The identifer string
 * @returns the identifier in pasca case
 */
export function toPascalCase(input: string): string {
    return toCapitalCase(input.trim().replace(/[-_.\s]+\w/g, (c) => c.slice(-1).toUpperCase()));
}

export default toPascalCase;
