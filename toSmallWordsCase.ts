type Options = {
    upperCase?: boolean
} 

/**
  * Convert the first letter of each word in a string to lower case
  * @param input		The string to make small case
  * @param upperCase	Convert other characters in the string to upper case (default false)
  */
export function toSmallWordsCase(input: string, {upperCase = false}: Options = {}): string {
    return (upperCase ? input.toUpperCase() : input).replace(/\b\w/g, (c) => c.toLowerCase());
}

export default toSmallWordsCase;
