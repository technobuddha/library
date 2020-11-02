
/**
  * Convert an identifier string to underscore case
  * @param input        The identifer string
  */
export function toUnderscoreCase(input: string): string {
    return input.trim().replace(/[-_.\s]+\w/g, (c) => '_' + c.slice(-1).toUpperCase()).toLowerCase();
}

export default toUnderscoreCase;
