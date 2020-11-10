import isString     from 'lodash/isString';
import escapeRegExp from 'lodash/escapeRegExp';
import isRegExp     from 'lodash/isRegExp';
import { empty }    from './constants';
import splitChars   from './splitChars';

/**
  * Remove all occurances of characters from the start of the string
  * @param input        The string
  * @param characters    The characters(s) to remove
  */
export function cleanStart(input: string, characters: (string | RegExp | (string | RegExp)[]) = /\s/): string
{
    const re = (
        isString(characters)
        ? splitChars(characters).map(escapeRegExp).join('|')
        : isRegExp(characters)
        ? characters.source
        : characters.map(c => isRegExp(c) ? c.source : splitChars(c).map(escapeRegExp).join('|')).join('|')
    );

    return input.replace(new RegExp(`^(${re})+`), empty);
}


export default cleanStart;
