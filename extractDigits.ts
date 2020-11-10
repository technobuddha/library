import { empty } from './constants';

/**
  * Remove all non-digit characters from a string
  * @param input The string
  */
export function extractDigits(input: string): string {
    return input.replace(/\D/g, empty);
}

export default extractDigits;
