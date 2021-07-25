import escapeRegExp         from 'lodash/escapeRegExp';
import { empty }            from './constants';
import collapseWhitespace   from './collapseWhitespace';
import clean                from './clean';

const badChars = /[/\\:*?<>|.]+/ug;

export type Options = {
    /** the file name will be truncated to this length */
    maxLength?: number;
    /** character to use to replace "bad" characters */
    replacement?: string;
    /** number of characters to presere at the end of the filename when truncated (for disambiguation) */
    disambiguate?: number;
    /** string to separate the main section from the disambiguated section */
    separator?: string;
};

/**
 * Convert a string so that it can be used as a filename
 *
 * @param input The string to escape
 * @param __namedParameters see {@link Options}
 * @default maxLength 64
 * @default replacement - (dash)
 * @default disambiguate 10
 * @default separator … (ellipsis)
 * @returns the file name
 */
export function toFilename(input: string, { maxLength = 64, replacement = '-', disambiguate = 10, separator = '…' }: Options = {}): string {
    let suffix = empty;
    const compress = new RegExp(`\\s*${escapeRegExp(replacement)}[\\s${escapeRegExp(replacement)}]*`, 'ug');

    input = clean(collapseWhitespace(input.normalize('NFC').replace('"', "'").replace(badChars, replacement)).replace(compress, replacement), replacement);

    if(suffix.length === 0 && input.length > maxLength) {
        suffix = input.slice(-disambiguate);
        input = input.slice(0, Math.max(0, input.length - suffix.length));
    }

    if(suffix.length > maxLength)
        suffix = suffix.slice(0, Math.max(0, maxLength));

    const length = maxLength - suffix.length;

    if(input.length > length)
        input = input.slice(0, Math.max(0, length));

    if(input.length === 0)
        input = replacement;

    if(suffix.length > 0)
        return input + separator + suffix;
    return input;
}

export default toFilename;
