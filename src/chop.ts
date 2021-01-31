import { empty }  from './constants';
import isFinite from 'lodash/isFinite';

export type Options = {
    /** If true, the last block will be omitted if has insufficient characters **/
    truncate?: boolean;
};

/**
 * Break a string into equal sized segments of characters
 *
 * @param input The string to break apart
 * @param length The length of each segment
 * @returns Array of segments
 */
export function chop(input: string, length: number, { truncate = false }: Options = {}): string[] {
    return length > 0 && isFinite(length) ? new RegExp(`.{${truncate ? empty : '1,'}${length}}`, 'gu').exec(input) as string[] : [ input ];
}

export default chop;
