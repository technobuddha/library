export type Options = {
    /** Convert other characters in the string to upper case */
    upperCase?: boolean;
};

/**
 * Convert the first letter of a string to lower case
 *
 * @param input The string to make small case
 * @default upperCase false
 * @returns the string in small case
 */
export function toSmallCase(input: string, { upperCase = false }: Options = {}): string {
    return input[0].toLowerCase() + (upperCase ? input.slice(1).toUpperCase() : input.slice(1));
}

export default toSmallCase;
