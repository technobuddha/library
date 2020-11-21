import toString         from 'lodash/toString';
import { space, empty } from './constants';

export type Options = { 
    /** Conjunction to insert in the last position (default 'and') */
    conjunction?: string,
    /** If true, use the oxford comma */
    oxford?: boolean,
    /** String used to separate values (default ',') */
    separator?: string
};

/**
 * Create a string from an array, separating values and inserting a conjunction
 * 
 * @param input Array of values
 * @param __namedParameters see {@link Options}
 */
export function coordinate<T = unknown>(input: ArrayLike<T>, {conjunction = 'and', oxford = true, separator = ','}: Options = {}): string {
    if(input.length > 0)
    {
        let text = toString(input[0]);

        for(let i = 1; i < input.length - 1; i++)
            text += separator + space + toString(input[i]);

        if(input.length > 1)
            text += (oxford && input.length > 2 ? separator : empty) + space + conjunction + space + toString(input[input.length - 1]);

        return text;
    }
    return empty;
}

export default coordinate
