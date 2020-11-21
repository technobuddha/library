import isNil        from 'lodash/isNil';
import escapeRegExp from 'lodash/escapeRegExp';
import { space }    from './constants';

type Options = {
    /** The indentation character */
    indenter?: string
}

/**
 * Determine the indentation level of text
 * 
 * @param input The indented text
 * @param __namedParameters see {@link Options}
 * @default indenter space
 * @returns The minimum amount of indentation on each line
 */
export function getIndent(input: string, {indenter = space}: Options = {}): number {
    const matches = input.match(new RegExp('^(' + escapeRegExp(indenter) + ')+', 'gm'));
    if(isNil(matches))
        return 0;

    return (Math.min(...matches.map(m => m.length)) || 0) / indenter.length;
}

export default getIndent;
