import { space }    from './constants';
import splitChars   from './splitChars';

type Options = {
    /** if the mask is longer, fill with character */
    missing?: string;
};

const tokenizer    = /\\#|#|./gu;

/**
 * Use a simple mask to display a string
 *
 * @remark The simple mask is a string where '#' characters are replaced by characters from the input string.  Other characters in the mask
 * are output as-is, to output a '#' use '\#'
 *
 * @param input The string
 * @param mask The mask
 * @param __namedParameters see {@link Options}
 * @default missing space
 * @returns The mask filled with characters from the string
 */
export function mask(input: string, maskStr: string, { missing = space }: Options = {}): string {
    const chars = splitChars(input);
    let   index = 0;

    return maskStr.replace(tokenizer, token => (token === '\\#' ? '#' : token === '#' ? (chars[index++] ?? missing) : token));
}

export default mask;
