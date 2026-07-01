import { empty } from '../unicode/unicode.ts';

import { type TextualizationOptions } from './textualization.ts';

/**
 * Represents the result of converting a number into its "illion" representation.
 * @internal
 */
type IllionReturn = {
  // The numeric value represented.
  quantity: number;
  // The corresponding "illion" word (e.g., "million", "billion"), or `null` if not applicable.
  word: string | null;
  // The mantissa part of the number as a string.
  mantissa: string;
  // The exponent part of the number.
  exponent: number;
};

/**
 * Generates the "illion" name and associated information for a given number's mantissa and exponent.
 *
 * This function decomposes a number (represented by its mantissa and exponent) into a quantity, remaining mantissa,
 * adjusted exponent, and the corresponding "illion" word (e.g., "thousand", "million", "billion", etc.).
 * It supports extended illion names for very large numbers, following the Latin-based naming conventions.
 * @param argMantissa - The string representation of the number's mantissa (the significant digits).
 * @param argExponent - The exponent part of the number (power of 10).
 * @param shift - A boolean flag from the Numbering type indicating whether to shift and combine remaining mantissa digits into the quantity as a decimal.
 * @returns An object containing:
 *   - `quantity`: The numeric value extracted from the mantissa for the current illion group.
 *   - `mantissa`: The remaining mantissa string after extracting the quantity.
 *   - `exponent`: The adjusted exponent after processing.
 *   - `word`: The illion word corresponding to the exponent (or `null` if not applicable).
 * @remarks
 * - If the exponent is less than 3, the function returns with `word` as `null`.
 * - If the exponent is exactly 3, the function returns with `word` as `'thousand'`.
 * - For larger exponents, the function constructs the appropriate illion name using Latin prefixes and suffixes.
 * - The function supports fractional quantities if `shift` is true and there are remaining mantissa digits.
 * @internal
 */
export function illion(
  argMantissa: string,
  argExponent: number,
  shift: TextualizationOptions['shift'],
): IllionReturn {
  let mantissa = argMantissa;
  let exponent = argExponent;

  let factor = Math.floor((exponent - 3) / 3);
  let quantity = 0;

  switch (exponent - (factor * 3 + 3)) {
    case 0: {
      quantity = Number.parseInt(mantissa.padEnd(1, '0').slice(0, 1));
      mantissa = mantissa.slice(1);
      exponent -= 1;
      break;
    }
    case 1: {
      quantity = Number.parseInt(mantissa.padEnd(2, '0').slice(0, 2));
      mantissa = mantissa.slice(2);
      exponent -= 2;
      break;
    }
    case 2: {
      quantity = Number.parseInt(mantissa.padEnd(3, '0').slice(0, 3));
      mantissa = mantissa.slice(3);
      exponent -= 3;
      break;
    }

    // no default
  }

  if (shift && mantissa.length > 0 && mantissa.length < 3 && Number.parseInt(mantissa) > 0) {
    quantity = Number(`${quantity}.${mantissa}`);
    exponent -= mantissa.length;
    mantissa = empty;
  }

  if (factor < 0) {
    return { quantity, mantissa, exponent, word: null };
  }
  if (factor === 0) {
    return { quantity, mantissa, exponent, word: 'thousand' };
  }

  let word = 'on';
  while (factor > 0) {
    let a = false; // use the prefixed form; tens change end from 'i' to 'a'
    let s = false; // tre => tres;    se => ses
    let x = false; // tre => tres;    se => sex
    let m = false; // septe = septem; nove => novem
    let n = false; // septe = septen; nove => noven
    let d = false; // se => sex;      nove => novem

    const factor0 = Math.floor(factor / 1) % 10;
    const factor1 = Math.floor(factor / 10) % 10;
    const factor2 = Math.floor(factor / 100) % 10;

    word = `lli${word}`;

    // hundreds
    switch (factor2) {
      case 1: {
        word = `centi${word}`;
        a = true;
        s = false;
        x = true;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 2: {
        word = `ducenti${word}`;
        a = true;
        s = false;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 3: {
        word = `trecenti${word}`;
        a = true;
        s = true;
        x = false;
        m = false;
        n = true;
        break;
      }
      case 4: {
        word = `quadringenti${word}`;
        a = true;
        s = true;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 5: {
        word = `quingenti${word}`;
        a = true;
        s = true;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 6: {
        word = `sescenti${word}`;
        a = true;
        s = false;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 7: {
        word = `septingenti${word}`;
        a = true;
        s = false;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 8: {
        word = `octingenti${word}`;
        a = true;
        s = false;
        x = true;
        m = true;
        n = false;
        d = false;
        break;
      }
      case 9: {
        word = `nongenti${word}`;
        a = true;
        s = false;
        x = false;
        m = false;
        n = false;
        d = false;
        break;
      }

      // no default
    }

    // tens
    switch (factor1) {
      case 1: {
        word = `deci${word}`;
        a = true;
        s = false;
        x = false;
        m = false;
        n = true;
        d = true;
        break;
      }
      case 2: {
        word = `viginti${word}`;
        a = true;
        s = true;
        x = false;
        m = true;
        n = false;
        d = false;
        break;
      }
      case 3: {
        word = (a ? 'triginta' : 'triginti') + word;
        a = true;
        s = true;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 4: {
        word = (a ? 'quadraginta' : 'quadraginti') + word;
        a = true;
        s = true;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 5: {
        word = (a ? 'quinginta' : 'quinginti') + word;
        a = true;
        s = true;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 6: {
        word = (a ? 'sexaginta' : 'sexaginti') + word;
        a = true;
        s = false;
        x = false;
        m = false;
        n = false;
        d = false;
        break;
      }
      case 7: {
        word = (a ? 'septuaginta' : 'septuaginti') + word;
        a = true;
        s = false;
        x = false;
        m = false;
        n = true;
        d = false;
        break;
      }
      case 8: {
        word = (a ? 'octoginta' : 'octoginti') + word;
        a = true;
        s = false;
        x = true;
        m = true;
        n = false;
        d = false;
        break;
      }
      case 9: {
        word = (a ? 'nonaginta' : 'nonginti') + word;
        a = true;
        s = false;
        x = false;
        m = false;
        n = false;
        d = false;
        break;
      }

      // no default
    }

    // ones
    if (a) {
      switch (factor0) {
        case 1: {
          word = `un${word}`;
          break;
        }
        case 2: {
          word = `duo${word}`;
          break;
        }
        case 3: {
          word = (s || x ? 'tres' : 'tre') + word;
          break;
        }
        case 4: {
          word = `quattuor${word}`;
          break;
        }
        case 5: {
          word = `quin${word}`;
          break;
        }
        case 6: {
          word =
            (x || d ? 'sex'
            : s ? 'ses'
            : /* v8 ignore next */ 'se') + word;
          break;
        }
        case 7: {
          word =
            (n ? 'septen'
            : m ? 'septem'
            : /* v8 ignore next */ 'septe') + word;
          break;
        }
        case 8: {
          word = `octo${word}`;
          break;
        }
        case 9: {
          word =
            (m || d ? 'novem'
            : n ? 'noven'
            : /* v8 ignore next */ 'nove') + word;
          break;
        }

        // no default
      }
    } else {
      switch (factor0) {
        case 0: {
          word = `ni${word}`;
          break;
        }
        case 1: {
          word = `mi${word}`;
          break;
        }
        case 2: {
          word = `bi${word}`;
          break;
        }
        case 3: {
          word = `tri${word}`;
          break;
        }
        case 4: {
          word = `quadri${word}`;
          break;
        }
        case 5: {
          word = `quniti${word}`;
          break;
        }
        case 6: {
          word = `sexti${word}`;
          break;
        }
        case 7: {
          word = `septi${word}`;
          break;
        }
        case 8: {
          word = `octi${word}`;
          break;
        }
        case 9: {
          word = `noni${word}`;
          break;
        }

        // no default
      }
    }

    factor = Math.floor(factor / 1000);
  }

  return { quantity, mantissa: mantissa, exponent, word };
}
