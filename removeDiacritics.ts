import { empty } from './constants';

const re = /\p{Mn}/gu;

/**
 * Remove all diacritics from a string
 * 
 * @param input The string
 * @returns string with diacritics removed
 */
export function removeDiacritics(input: string): string {
    return input.normalize('NFD').replace(re, empty).normalize('NFC');
}

export default removeDiacritics;
