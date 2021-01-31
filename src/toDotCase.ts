/**
 * Convert an identifier string to a dot form
 *
 * @param input The identifier string
 * @returns the identifier in dot form
 */
export function toDotCase(input: string): string {
    return input.trim().replace(/[-_.\s]+\w/ug, c => `.${c.slice(-1)}`).toLowerCase();
}

export default toDotCase;
