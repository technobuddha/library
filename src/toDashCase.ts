/**
 * Convert an identifier string to a dash form
 *
 * @param input The identifier string
 * @returns the ientifier in dash form
 */
export function toDashCase(input: string): string {
    return input.trim().replace(/[-_.\s]+\w/ug, c => `-${c.slice(-1)}`).toLowerCase();
}

export default toDashCase;
