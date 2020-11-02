type Options = {
    upperCase?: boolean;
}

/**
  * Convert the first letter of a string to lower case
  * @param input        The string to make small case
  * @param upperCase    Convert other characters in the string to upper case (default false)
  */
export function toSmallCase(input: string, {upperCase = false}: Options = {}): string {
    return input[0].toLowerCase() + (upperCase ? input.slice(1).toUpperCase() : input.slice(1));
}

export default toSmallCase;
