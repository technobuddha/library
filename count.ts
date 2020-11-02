
type Options = {
    overlap?: boolean
};

/**
  * Compute the number of times a substring occors within a string
  * @param input        The string
  * @param supstring    The substring to look for
  */
export function count(input: string, substring: string, {overlap = false}: Options = {}): number {
    const step  = overlap ? 1 : substring.length;
    let   count = 0;
    let   pos   = 0;

    while((pos = input.indexOf(substring, pos)) >= 0) {
        count++;
        pos += step;
    }

    return count;
}

export default count;
