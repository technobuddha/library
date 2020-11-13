import escapeRegExp         from 'lodash/escapeRegExp';
import { empty }            from './constants';
import clean                from './clean';
import {collapseWhitespace} from './collapse';

const badChars = /[/\\:*?<>|.]+/g;

type Options = {
    maxLength?: number,
    replacement?: string,
    disambiguate?: number,
    separator?: string
}

/**
  * Escape a string so that it can be used as a filename
  * @param input        The string to escape
  */
export function toFilename(input: string, {maxLength = 64, replacement = '-', disambiguate = 10, separator = '…'}: Options = {}): string {
    let suffix = empty;
    const compress = new RegExp('\\s*' + escapeRegExp(replacement) + '[\\s' + escapeRegExp(replacement) + ']*', 'g');

    input = clean(collapseWhitespace(input.normalize('NFC').replace('"', "'").replace(badChars, replacement)).replace(compress, replacement), replacement);

    if(suffix.length === 0 && input.length > maxLength) {
        suffix = input.slice(-disambiguate);
        input = input.substr(0, input.length - suffix.length);
    }

    if(suffix.length > maxLength)
        suffix = suffix.substr(0, maxLength);

    const length = maxLength - suffix.length;

    if(input.length > length)
        input = input.substr(0, length);

    if(input.length === 0)
        input = replacement;

    if(suffix.length > 0)
        return input + separator + suffix;
    else
        return input;
}

export default toFilename;
