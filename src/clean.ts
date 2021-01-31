import isString     from 'lodash/isString';
import isRegExp     from 'lodash/isRegExp';
import escapeRegExp from 'lodash/escapeRegExp';
import { empty }    from './constants';
import splitChars   from './splitChars';

const trimEquivalent = /[\s\uFEFF\xA0]/u;

/**
 * Remove all occurrences of characters from the beginning and end of the string
 *
 * @param input  The string
 * @param characters The characters(s) to remove
 */
export function clean(input: string, characters: (string | RegExp | (string | RegExp)[]) = trimEquivalent): string {
    const re = (
        isString(characters)
            ?    splitChars(characters).map(escapeRegExp).join('|')
            :    isRegExp(characters)
                ?    characters.source
                :    characters.map(c => (isRegExp(c) ? c.source : splitChars(c).map(escapeRegExp).join('|'))).join('|')
    );

    return input.replace(new RegExp(`^(${re})+|(${re})+$`, 'gu'), empty);
}

/**
 * Remove all occurrences of characters from the end of the string
 *
 * @param input  The string
 * @param characters  he characters(s) to remove
 */
export function cleanEnd(input: string, characters: (string | RegExp | (string | RegExp)[]) = trimEquivalent): string {
    const re = (
        isString(characters)
            ? splitChars(characters).map(escapeRegExp).join('|')
            : isRegExp(characters)
                ? characters.source
                : characters.map(c => (isRegExp(c) ? c.source : splitChars(c).map(escapeRegExp).join('|'))).join('|')
    );

    return input.replace(new RegExp(`(${re})+$`, 'u'), empty);
}

/**
 * Remove all occurrences of characters from the start of the string
 *
 * @param input The string
 * @param characters The characters(s) to remove
 */
export function cleanStart(input: string, characters: (string | RegExp | (string | RegExp)[]) = trimEquivalent): string {
    const re = (
        isString(characters)
            ? splitChars(characters).map(escapeRegExp).join('|')
            : isRegExp(characters)
                ? characters.source
                : characters.map(c => (isRegExp(c) ? c.source : splitChars(c).map(escapeRegExp).join('|'))).join('|')
    );

    return input.replace(new RegExp(`^(${re})+`, 'u'), empty);
}

export default clean;
