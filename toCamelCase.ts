import toSmallCase from './toSmallCase';

/**
  * Convert an idenfifer string to a camel case
  * @param input        The identifier string
  */
export function toCamelCase(input: string): string {
    return toSmallCase(input.trim().replace(/[-_.\s]+\w/g, (c) => c.slice(-1).toUpperCase()));
}

export default toCamelCase;
