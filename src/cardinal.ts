import isFinite         from 'lodash/isFinite';
import isNaN            from 'lodash/isNaN';
import { empty, space } from './constants';

export type Options = OptionsCardinal & OptionsIllion;

export type OptionsCardinal = {
    /** The number of groups to output, each group consists of three digits. */
    groups?: number;
    /** Use numbers instead of words for the group value, the group name is still output as text */
    digits?: boolean;
};

export type OptionsIllion = {
    /** Word to place after the hundreds.  "one hundred and one" vs. "one hundred one" */
    and?: string;
    /** Places a character between the tens units and the ones units.  "twenty-one" vs. "twenty one" */
    hyphen?: string;
};

const ones  = [ 'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen' ];
const tens  = [ 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

const ZERO              = 0;
const TEN               = 10;
const TWENTY            = 20;
const ONE_HUNDRED       = 100;

/**
 * Convert a number into text (the cardinal number)
 *
 * @remark There is no limit to the numbers that can be expressed, however Javascript/Typescript can only represent numbers
 * up to uncentillions (1e308).
 *
 * @param input The number
 * @param __namedParameters see {@link Options}
 * @returns The number spelled out
 *
 * @default groups Infinity
 * @default digits false
 * @default and (empty)
 * @default hyphen (space)
 */
export function cardinal(input: number, { groups = Infinity, digits = false, ...options }: Options = {}): string {
    const words     = [] as (string | string[])[];

    if(isNaN(input)) { words.push('not a number'); } else {
        if(input < ZERO) {
            words.push('negative');
            input = -input;
        }

        if(isFinite(input)) {
            if(input === 0) {
                words.push(ones[0]);
            } else {
                let { mantissa, exponent } = breakdown(input, groups);

                while(parseInt(mantissa, 10) > 0 && exponent >= 0 && groups-- > 0) {
                    let word: string | null;
                    let quantity: number;
                    ({ quantity, mantissa, exponent, word } = illion(mantissa, exponent));

                    if(quantity) {
                        if(digits)
                            words.push(quantity.toString());
                        else
                            words.push(ordinal1000(quantity, options));
                        if(word) words.push(word);
                    }
                }
            }
        } else { words.push('infinity'); }
    }

    return words.flat().join(space);
}

function breakdown(value: number, groups: number): { mantissa: string; exponent: number } {
    let   [ m, e ]     = value.toExponential(15).split('e');    // - 1 because toExponential returns 1 digit before the decimal point
    let   mantissa   = m.replace('.', empty);
    let   exponent   = parseInt(e, 10);                          // number of digits = (exponent + 1)
    const groupCount = Math.floor(exponent / 3) + 1;

    if(groupCount > groups) {
        const digits = (groupCount * 3) - (2 - exponent % 3);
        if(digits < 16) {
            ([ m, e ]  = value.toExponential(digits - 2).split('e'));
            mantissa = m.replace('.', empty);
            exponent = parseInt(e, 10);
        }
    }
    return { mantissa, exponent };
}

function ordinal1000(input: number, { and, hyphen = space }: OptionsIllion): string[] {
    const words    = [] as string[];

    if(input >= ONE_HUNDRED) {
        words.push(ones[Math.floor(input / ONE_HUNDRED)], 'hundred');
        input = input % ONE_HUNDRED;
        if(and && input > ZERO) words.push(and);
    }

    if(input > ZERO) {
        if(input < TWENTY)  words.push(ones[input]);  else if(input % TEN === ZERO)
            words.push(tens[Math.floor(input / TEN) - 2]);
        else
            words.push(tens[Math.floor(input / TEN) - 2] + hyphen + ones[input % TEN]);
    }

    return words;
}

type IllionReturn = {
    quantity: number;
    mantissa: string;
    exponent: number;
    word: string | null;
};

function illion(mantissa: string, exponent: number): IllionReturn {
    let factor   = Math.floor((exponent - 3) / 3);
    let quantity = 0;

    switch(exponent - ((factor * 3) + 3)) {
        case 0:  quantity = parseInt(mantissa.slice(0, 1), 10); mantissa = mantissa.slice(1); exponent -= 1; break;
        case 1:  quantity = parseInt(mantissa.slice(0, 2), 10); mantissa = mantissa.slice(2); exponent -= 2; break;
        case 2:  quantity = parseInt(mantissa.slice(0, 3), 10); mantissa = mantissa.slice(3); exponent -= 3; break;
    }

    if(factor <    0)       return { quantity, mantissa, exponent, word: null };
    if(factor ===  0)       return { quantity, mantissa, exponent, word: 'thousand' };

    let word = 'on';
    while(factor > 0) {
        let a    = false;   // ones; use the prefixed form; tens change end from 'i' to 'a'
        let s    = false;   // ones: tre => tres;    se => ses
        let x    = false;   // ones: tre => tres;    se => sex
        let m    = false;   // ones: septe = septem; nove => novem
        let n    = false;   // ones: septe = septen; nove => noven

        const factor0 = Math.floor(factor /   1) % 10;
        const factor1 = Math.floor(factor /  10) % 10;
        const factor2 = Math.floor(factor / 100) % 10;

        word = `lli${word}`;

        // hundreds
        switch(factor2) {
            case 1: word = `centi${word}`;        a = true; s = false; x = true;  m = false; n = true;  break;
            case 2: word = `ducenti${word}`;      a = true; s = false; x = false; m = false; n = true;  break;
            case 3: word = `trecenti${word}`;     a = true; s = true;  x = false; m = false; n = true;  break;
            case 4: word = `quadringenti${word}`; a = true; s = true;  x = false; m = false; n = true;  break;
            case 5: word = `quingenti${word}`;    a = true; s = true;  x = false; m = false; n = true;  break;
            case 6: word = `sescenti${word}`;     a = true; s = false; x = false; m = false; n = true;  break;
            case 7: word = `septingenti${word}`;  a = true; s = false; x = false; m = false; n = true;  break;
            case 8: word = `octingenti${word}`;   a = true; s = false; x = true;  m = true;  n = false; break;
            case 9: word = `nongenti${word}`;     a = true; s = false; x = false; m = false; n = false; break;
        }

        // tens
        switch(factor1) {
            case 1: word = `deci${word}`;                                a = true; s = false; x = false; m = false; n = true;  break;
            case 2: word = `viginti${word}`;                             a = true; s = true;  x = false; m = true;  n = false; break;
            case 3: word = (a ? 'triginta'     : 'triginti')     + word; a = true; s = true;  x = false; m = false; n = true;  break;
            case 4: word = (a ? 'quadraginta'  : 'quadraginti')  + word; a = true; s = true;  x = false; m = false; n = true;  break;
            case 5: word = (a ? 'quinquaginta' : 'quinquaginti') + word; a = true; s = true;  x = false; m = false; n = true;  break;
            case 6: word = (a ? 'sexaginta'    : 'sexaginti')    + word; a = true; s = false; x = false; m = false; n = false; break;
            case 7: word = (a ? 'septuaginta'  : 'septuaginti')  + word; a = true; s = false; x = false; m = false; n = true;  break;
            case 8: word = (a ? 'octoginta'    : 'octoginti')    + word; a = true; s = false; x = true;  m = true;  n = false; break;
            case 9: word = (a ? 'nonaginta'    : 'nonginti')     + word; a = true; s = false; x = false; m = false; n = false; break;
        }

        // ones
        if(a) {
            switch(factor0) {
                case 1: word = `un${word}`; break;
                case 2: word = `duo${word}`; break;
                case 3: word = (s ? 'tres'   : x ? 'tres'   : 'tre')   + word; break;
                case 4: word = `quattuor${word}`; break;
                case 5: word = `quinqua${word}`; break;
                case 6: word = (s ? 'ses'    : x ? 'sex'    : 'se')    + word; break;
                case 7: word = (n ? 'septen' : m ? 'septem' : 'septe') + word; break;
                case 8: word = `octo${word}`; break;
                case 9: word = (n ? 'noven'  : m ? 'novem'  : 'nove')  + word; break;
            }
        } else {
            switch(factor0) {
                case 0: word = `ni${word}`; break;
                case 1: word = `mi${word}`; break;
                case 2: word = `bi${word}`; break;
                case 3: word = `tri${word}`; break;
                case 4: word = `quadri${word}`; break;
                case 5: word = `quniti${word}`; break;
                case 6: word = `sexti${word}`; break;
                case 7: word = `septi${word}`; break;
                case 8: word = `octi${word}`; break;
                case 9: word = `noni${word}`; break;
            }
        }

        factor = Math.floor(factor / 1000);
    }

    return { quantity, mantissa, exponent, word };
}

/**
 * Get the spelled out word for an exponent
 *
 * @remarks This is only using the exponent, There is no limit to the numbers this function can represents, however Javascript/Typescript can only represent
 * numbers up to 1e308, which limits the numbers that this method can represent to 10^10^308 which is really really big.
 *
 * @example 6 is "million"
 * @example 303 is "centillion"
 * @param exponent The exponent to convert
 * @returns Order of Magnitude as text
 */
export function orderOfMagnitude(exponent: number): string | null {
    return illion('000', exponent).word;
}

/**
 * Get a short description of a number
 *
 * @remarks this is a shortcut to calling cardinal with options {groups: 1, digits: true}
 *
 * @example 1000000 "1 million"
 * @example 101323847382459 "101 trillion"
 *
 * @param input number to convert
 * @param options see {@link OptionsIllion}
 * @return number as text
 */
export function summarize(input: number, options: OptionsIllion = {}): string {
    return cardinal(input, { groups: 1, digits: true, ...options });
}

export default cardinal;
