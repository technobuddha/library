import isFinite from 'lodash/isFinite';
import isNaN from 'lodash/isNaN';
import { space }                from './constants';

type Options = {
	and?: string;
	hyphen?: string;
}

const ones      = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
                  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];
const tens      = [ 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

const ZERO              = 0;
const TEN				= 10;
const TWENTY			= 20;
const ONE_HUNDRED       = 100;
const ONE_THOUSAND      = 1000;
const ONE_MILLION       = 1000000;
const ONE_BILLION       = 1000000000;
const ONE_TRILLION      = 1000000000000;
const ONE_QUADRILLION   = 1000000000000000;
                        //9007199254740991;

export function spellNumber(input: number, options: Options = {}): string {
    let words    = [] as (string | string[])[];

    if(isNaN(input))
        words.push('not a number');
    else {
        if(isFinite(input)) {
            if(input === 0) {
                words.push(ones[0]);
            } else {
                if(input < ZERO) {
                    words.push('negative');
                    input = -input;
                }
            
                if(input > Number.MAX_SAFE_INTEGER) {
                    words.push('overflow');
                } else {
                    if(input > ONE_QUADRILLION) {
                        words.push(spell1000(Math.floor(input / ONE_QUADRILLION), options), 'quadrillion');
                        input = input % ONE_QUADRILLION;
                    }
        
                    if(input > ONE_TRILLION) {
                        words.push(spell1000(Math.floor(input / ONE_TRILLION), options), 'trillion');
                        input = input % ONE_TRILLION;
                    }
        
                    if(input > ONE_BILLION) {
                        words.push(spell1000(Math.floor(input / ONE_BILLION), options), 'billion');
                        input = input % ONE_BILLION;
                    }
        
                    if(input > ONE_MILLION) {
                        words.push(spell1000(Math.floor(input / ONE_MILLION), options), 'million');
                        input = input % ONE_MILLION;
                    }
        
                    if(input > ONE_THOUSAND) {
                        words.push(spell1000(Math.floor(input / ONE_THOUSAND), options), 'thousand');
                        input = input % ONE_THOUSAND;
                    }
        
                    words.push(spell1000(input, options));
                }
            }
        } else
            words.push('infinity');
    }

    return words.flat().join(space);
}

function spell1000(input: number, {and, hyphen = space}: Options = {}): string[] {
    let words    = [] as string[];

    if(input >= ONE_HUNDRED) {
		words.push(ones[Math.floor(input / ONE_HUNDRED)], 'hundred');
        input = input % ONE_HUNDRED;
        if(and && input > ZERO) words.push(and);
    }

    if(input > ZERO) {
        if(input < TWENTY)
            words.push(ones[Math.floor(input)]);
        else {
            if(input % TEN === ZERO)
                words.push(tens[Math.floor(input / TEN) - 2]);
            else
                words.push(tens[Math.floor(input / TEN) - 2] + hyphen + ones[input % TEN]);
        }
    }

    return words;
}

export default spellNumber;
