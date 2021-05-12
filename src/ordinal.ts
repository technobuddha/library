import isNaN        from 'lodash/isNaN';
import isInteger    from 'lodash/isInteger';

//const ones      = [ 'zero', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth',
//                  'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth' ];
//const tens      = [ 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];
// twentieth thirtieth fortieth fiftieth sixtieth seventieth eightieth ninetieth
// hundredth
// thousandth
// millionth

// TODO this needs an overhaul and some documentation

/**
 * Convert a number into an ordinal number string (1st, 2nd, 3rd, etc).
 * @param input    The number to convert
 */
export function ordinal(input: number): string {
    if(isNaN(input)) { return input.toString(); } else if(isInteger(input)) {
        switch(Math.abs(input) % 100) {
            case  1: case 21: case 31: case 41: case 51: case 61: case 71: case 81: case 91:
                return `${input.toString()}st`;
            case  2: case 22: case 32: case 42: case 52: case 62: case 72: case 82: case 92:
                return `${input.toString()}nd`;
            case  3: case 23: case 33: case 43: case 53: case 63: case 73: case 83: case 93:
                return `${input.toString()}rd`;
            default:
                return `${input.toString()}th`;
        }
    } else { return `${input.toString()}th`; }
}

export default ordinal;
