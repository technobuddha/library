import { empty } from './constants';

/**
 * Remove all non-digit characters from a string
 *
 * @param input The string
 * @returns digits from the string
 */
export function extractDigits(input: string): string {
    return input.replace(/\D/ug, empty);
}

export default extractDigits;
