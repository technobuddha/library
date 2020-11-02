
/**
  * Convert an identifier string to a dash form
  * @param input        The identifier string
  */
export function toDashCase(input: string): string {
    return input.trim().replace(/[-_.\s]+\w/g, (c) => '-' + c.slice(-1)).toLowerCase();
}

export default toDashCase;
