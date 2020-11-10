import { space }    from './constants';
import splitChars   from './splitChars';

type Options = {
    missing?: string;
}

const tokenizer    = /\\#|#|./gu;

export function mask(input: string, mask: string, {missing = space}: Options = {}): string {
    const chars = splitChars(input);
    let   index = 0;

    return mask.replace(tokenizer, token => token === '\\#' ? '#' : token === '#' ? (chars[index++] ?? missing) : token);
}

export default mask;
