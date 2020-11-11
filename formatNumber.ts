import map          from 'lodash/map';
import defaultTo    from 'lodash/defaultTo';
import repeat       from 'lodash/repeat';
import padEnd       from 'lodash/padEnd';
import { empty }    from './constants';
import padNumber    from './padNumber';

//#region parse
type ParseReturn =     {
    aMask: string[],
    aDigits: number,
    bMask: string[],
    bDigits: number,
    scale: number,
    group: boolean,
    exponent: number,
    signExpoent: boolean,
    precision: number,
};

function parse(mask: string): ParseReturn {
    let   scale            = 1;
    let   beforeDP         = true;
    const before: string[] = [];
    let   after: string[]  = [];
    let   group            = false;
    let   commas           = 0;
    let   zeroSeen         = false;
    let   exponent         = 0;
    let   signExponent     = false;
    let   precision        = 0;

    for(let i = 0; i < mask.length; ++i) {
        const c = mask.charAt(i);

        switch(c) {
            case '"':    //literal string
            case "'": {
                let s = '"';

                for(++i; i < mask.length; ++i)
                {
                    const k = mask.charAt(i);

                    if(c === k) break;
                    s += k;
                }

                (beforeDP ? before : after).push(s);
                break;
            }

            case '#':  {
                if(beforeDP)
                    before.push(zeroSeen ? '0' : '#');
                else {
                    precision++;
                    after.push('#');
                }
                break;
            }

            case '0': {
                if(beforeDP) {
                    //If we see a 0 before the decimal point, all following #s are transformed into 0s
                    before.push('0');
                    zeroSeen = true;
                } else {
                    //if we see a 0 after the decimal point, the proceeding #s are transformed into 0s
                    precision++;
                    after = map(after, a => a === '#' ? '0' : a);
                    after.push('0');
                }
                break;
            }

            case ',': {
                if(beforeDP)
                    commas++;
                break;
            }

            case '.': {
                beforeDP = false;
                break;
            }

            case '%': {
                scale *= 100;
                (beforeDP ? before : after).push('"' + c);
                break;
            }

            case '‰': {
                scale *= 1000;
                (beforeDP ? before : after).push('"' + c);
                break;
            }

            case '‱': {
                scale *= 10000;
                (beforeDP ? before : after).push('"' + c);
                break;
            }

            case 'e':
            case 'E': {
                let signSeen = false;
                let j = i + 1;
                let e = 0;

                if(mask.length > j && mask.charAt(j) === '+') {
                    j++; 
                    signSeen = true;
                } else if(mask.length > j && mask.charAt(j) === '-') {
                    j++;
                }

                while(mask.length > j && mask.charAt(j) === '0') {    
                    j++;
                    e++;
                }

                if(e > 0) {
                    i = j - 1;
                    exponent = e;
                    signExponent = signSeen;

                    (beforeDP ? before : after).push(c);
                } else
                    (beforeDP ? before : after).push('"' + c);
                break;
            }

            case '\\': {
                if(i < mask.length - 1)
                    (beforeDP ? before : after).push('"' + mask.charAt(++i));
                else
                    (beforeDP ? before : after).push('"\\');
                break;
            }

            default: {
                (beforeDP ? before : after).push('"' + c);
                break;
            }
        }

        if(beforeDP && c !== ',') {
            if(commas > 0) group = true;
            commas = 0;
        }
    }

    scale = scale / Math.pow(1000, commas);

    return  {
        aMask:       after,
        aDigits:     after.reduce((acc, val) => ((val === '0' || val === '#') ? acc + 1 : acc), 0),
        bMask:       before,
        bDigits:     before.reduce((acc, val) => ((val === '0' || val === '#') ? acc + 1 : acc), 0),
        scale:       scale,
        group:       group,
        exponent:    exponent,
        signExpoent: signExponent,
        precision:   precision,
    }
}
//#endregion
//#region formatNumber
export function formatNumber(input: number, mask: string): string {
    if(/^[CDEFGNPRX][0-9]*$/i.test(mask)) {
        const f    = mask.charAt(0);
        const prec = Number.parseInt(mask.substr(1));

        if(f === 'C' || f === 'c') {
            mask = '$#,0.' + repeat('0', defaultTo(prec, 2)) + ';($0.' + '0'.repeat(defaultTo(prec, 2)) + ')';
        } else if(f === 'D' || f === 'd') {
            mask = repeat('0', defaultTo(prec, 1));
        } else if(f === 'E' || f === 'e') {
            mask = '0.' + padNumber(0, defaultTo(prec, 6)) + f + '+000';
        } else if(f === 'F' || f === 'f') {
            mask = '0.' + repeat('0', defaultTo(prec, 2));
        } else if(f === 'G' || f === 'g') {
            const sci = formatNumber(input, '0.' + repeat('#', defaultTo(prec, 15)) + (f === 'G' ? 'E' : 'e') + '00');
            const fix = formatNumber(input, '0.' + repeat('#', defaultTo(prec, 15)));
            return sci.length < fix.length ? sci : fix;
        } else if(f === 'N' || f === 'n') {
            mask = '#,0.' + repeat('0', defaultTo(prec, 2));
        } else if(f === 'P' || f === 'p') {
            mask = '#,0.' + repeat('0', defaultTo(prec, 2)) + ' %';
        } else if(f === 'R' || f === 'r') {
            let num: string;
            for(let i = 1; i < 21; ++i) {
                num = input.toPrecision(i);
                if(Number.parseFloat(num) === input)
                    return num;
                return num;
            }
        } else if(f === 'X' || f === 'x') {
            const hex = (input < 0) ? ('ffffffff' + (0xFFFFFFFF + input + 1).toString(16)) : padEnd(input.toString(16), defaultTo(prec, 0), '0');
            if(f === 'X')
                return hex.toUpperCase();
            else
                return hex;
        }
    }

    const formats = mask.toString().split(';');

    let fmt = parse(formats[0]);
    console.log(formats, fmt);
    if(Number.parseFloat((input * fmt.scale).toFixed(fmt.precision)) === 0)
        fmt = formats.length < 3 ? fmt : parse(formats[2]);
    else if(input < 0)
        fmt = formats.length < 2 ? parse('-' + formats[0]) : parse(formats[1]);

    let w: string[];
    let f: string[];
    let exp = 0;

    if(fmt.exponent > 0) {
        const s1 = input.toExponential(fmt.aDigits + fmt.bDigits - 1).split('e');
        const s2 = s1[0].split('.');

        w = s2[0].split(empty);
        f = s2[1].split(empty);
        exp = Number(s1[1]);

        while(w.length < fmt.bDigits) {
            w.push(f.shift()!);
            exp--;
        }
    } else if(fmt.bDigits === 0) {
        w = (Math.abs(input * fmt.scale)).toFixed(0).split(empty);
        f = [];
    } else {
        let scaled = Math.abs(input * fmt.scale);
        let rescale = 0;
        let str: string;
        let split: string[];

        //toFixed for numbers greater than 1e21 return scientific notation...
        while(scaled > 1e21) {
            scaled /= 1e21;
            rescale += 21;
        }

        if(rescale > 0) {
            str = (scaled).toFixed(17);
            split = str.split('.');
            w = split[0].split(empty);
            f = split[1].split(empty);

            while(rescale-- > 0) {
                w.push(f.shift()!);
                f.push('0');
            }
        } else {
            console.log({scaled, aDigits: fmt.aDigits});
            str = (scaled).toFixed(fmt.aDigits);
            split = str.split('.');
            w = split[0].split(empty);    //whole part
            f = split.length > 1 ? split[1].split(empty) : [];    //fractional
        }
    }

    let o = empty;
    let d = 0;

    for(let i = fmt.bMask.length - 1; i >= 0; --i) {
        const x = fmt.bMask[i];

        if(fmt.group && d === 3 && (x === '0' || x === '#')) {
            o = ',' + o;
            d = 0;
        }

        if(x === '0') {
            if(w.length) o = w.pop() + o;
            else o = '0' + o;
            d++;
        } else if(x === '#') {
            if(w.length) {
                o = w.pop() + o;
                d++;
            }
        } else if(x === 'e' || x === 'E') {
            o = x + ((fmt.signExpoent || exp < 0) ? (exp < 0 ? '-' : '+') : empty) + padNumber(Math.abs(exp), fmt.exponent) + o;
        } else {
            o = x.substr(1) + o;
        }
    }

    for(let i = w.length - 1; i >= 0; --i) {
        const x = w[i];

        if(fmt.group && d === 3 && (x === '0' || x === '#')) {
            o = ',' + o;
            d = 0;
        }

        o = w[i] + o;
        d++;
    }

    if(fmt.aMask.length) {
        let a = empty;
        let digits = false;

        for(let i = 0; i < fmt.aMask.length; ++i) {
            const x = fmt.aMask[i];

            if(x === '0') {
                if(f.length) a = a + f.shift();
                else a = a + '0';

                digits = true;
            } else if(x === '#') {
                if(f.reduce(function(acc, val) { return val === '0' ? acc : true; }, false)) {
                    a = a + f.shift();
                    digits = true;
                }
            } else if(x === 'e' || x === 'E') {
                a = a + x + ((fmt.signExpoent || exp < 0) ? (exp < 0 ? '-' : '+') : empty) + padNumber(Math.abs(exp), fmt.exponent);
            } else
                a = a + x.substr(1);
        }

        if(digits)
            o += '.' + a;
        else
            o += a;
    }

    return o;
}
//#endregion

export default formatNumber;


