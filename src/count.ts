export type Options = {
    /** if true, counts overlapping strings */
    overlap?: boolean;
};

/**
 * Compute the number of times a substring occors within a string
 *
 * @param input The string
 * @param supstring The substring to look for
 * @param __namedParameters see {@link Options}
 * @return number of times *substring* occurs within *input*
 */
export function count(input: string, substring: string, { overlap = false }: Options = {}): number {
    const step = overlap ? 1 : substring.length;
    let   cnt  = 0;
    let   pos  = 0;

    while((pos = input.indexOf(substring, pos)) >= 0) {
        cnt++;
        pos += step;
    }

    return cnt;
}

export default count;
