import isNil        from 'lodash/isNil';
import escapeRegExp from 'lodash/escapeRegExp';
import { space }    from './constants';

type Options = {
    /** The indentation character */
    indenter?: string;
};

/**
 * Determine the indentation level of text
 *
 * @param input The indented text
 * @param __namedParameters see {@link Options}
 * @default indenter space
 * @returns The minimum amount of indentation on each line
 */
export function getIndent(input: string, { indenter = space }: Options = {}): number {
    const matches = new RegExp(`^(${escapeRegExp(indenter)})+`, 'ugm').exec(input);
    if(isNil(matches))
        return 0;

    return (Math.min(...matches.map(m => m.length))) / indenter.length;
}

export default getIndent;
