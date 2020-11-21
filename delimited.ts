import { empty } from './constants';

/**
 * Return a field from a delimited string
 * 
 * @param input The delimited string
 * @param delimiter The delimiter string
 * @param index The position of the desired field, 0 is the first field, negative numbers count backwards from the end (default 0)
 * @param count The number of fields to return (default 1)
 */
export function delimited(input: string, delimiter: string, index = 0, count = 1): string {
    if(count <= 0)
        return empty;
    else {
        const splits = input.split(delimiter);
        const start  = index < 0 ? splits.length + index : index;
        return splits.slice(start, start + count).join(delimiter);
    }
}

export default delimited;
