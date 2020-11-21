import { space }                from './constants';
import clean                    from './clean';

export type Options = {
    /** If true, trim  */
    trim?: boolean;
}

/**
 * Replace all breaking space (space, tab, carriage return, new line) with a single space
 * 
 * @param input The string
 * @param trim  If true, remove leading and trailing whitespace
 */
export function collapseBreakingspace(input: string, {trim = true}: Options = {}): string {
    if(trim)
        return clean(input.replace(/[\t\r\n ]+/g, space), '\t\r\n ');
    else
        return input.replace(/[\t\r\n ]+/g, space);
}

export default collapseWhitespace;
