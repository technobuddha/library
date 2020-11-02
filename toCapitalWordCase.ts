type Options = {
    lowerCase?: boolean;
}

/**
  * Capitalize the first letter of each word in a string
  * @param input        The string to capitalize
  * @param lowercase    Convert other characters in the string to lower case (default false)
  */
export function toCapitalWordCase(input: string, {lowerCase = false}: Options = {}): string {
    return (lowerCase ? input.toLowerCase() : input).replace(/\b\w/g, (l) => l.toUpperCase());
}

export default toCapitalWordCase;
