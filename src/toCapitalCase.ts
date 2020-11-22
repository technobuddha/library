export type Options = {
    /** Convert the rest of the string to lower case */
    lowerCase?: boolean;
}

/**
 * Capitalize the first letter of a string
 * @param input The string to capitalize
 * @param __namedParameters see {@link Options}
 * @default lowerCase default
 */
 export function toCapitalCase(input: string, {lowerCase = false}: Options = {}): string {
    return input.charAt(0).toUpperCase() + (lowerCase ? input.slice(1).toLowerCase() : input.slice(1));
}

export default toCapitalCase;
