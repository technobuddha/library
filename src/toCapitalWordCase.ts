type Options = {
    /** Convert other characters in the string to lower case */
    lowerCase?: boolean;
};

/**
 * Capitalize the first letter of each word in a string
 *
 * @param input The string to capitalize
 * @param __namedParameters see {@link Options}
 * @default lowercase false
 */
export function toCapitalWordCase(input: string, { lowerCase = false }: Options = {}): string {
    return (lowerCase ? input.toLowerCase() : input).replace(/\b\w/ug, l => l.toUpperCase());
}

export default toCapitalWordCase;
