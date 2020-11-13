export type Options = {
  /** If true, the last block will be omitted if has less characters the *length* **/
    truncate?: boolean;
};

/**
 * Break a string into segments of *length* characters
 * 
 * @param input The string to break apart
 * @param length The length of each segment
 * @returns Array of segments
 */
export function chop(input: string, length: number, {truncate = false}: Options = {}): string[]
{
    return length > 0 ? input.match(new RegExp('.' + (truncate ? `{${length}}` : `{1,${length}}`), 'g')) as string[] : [input];
}

export default chop;
