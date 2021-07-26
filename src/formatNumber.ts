import defaultTo    from 'lodash/defaultTo';
import map          from 'lodash/map';
import { empty }    from './constants';
import padNumber    from './padNumber';
import splitChars   from './splitChars';
import build        from './build';

//#region parse
type ParseReturn =     {
    aMask: string[];
    aDigits: number;
    bMask: string[];
    bDigits: number;
    scale: number;
    group: boolean;
    exponent: number;
    signExponent: boolean;
    precision: number;
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

    const m = splitChars(mask);
    for(let i = 0; i < m.length; ++i) {
        const c = m[i];

        switch(c) {
            case '"':    //literal string
            case "'": {
                let s = '"';

                for(++i; i < mask.length; ++i) {
                    const k = mask.charAt(i);

                    if(c === k) break;
                    s += k;
                }

                (beforeDP ? before : after).push(s);
                break;
            }

            case '#':  {
                if(beforeDP) {
                    before.push(zeroSeen ? '0' : '#');
                } else {
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
                    after = map(after, a => (a === '#' ? '0' : a));
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
                (beforeDP ? before : after).push(`"${c}`);
                break;
            }

            case '‰': {
                scale *= 1000;
                (beforeDP ? before : after).push(`"${c}`);
                break;
            }

            case '‱': {
                scale *= 10000;
                (beforeDP ? before : after).push(`"${c}`);
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
                } else {
                    (beforeDP ? before : after).push(`"${c}`);
                }
                break;
            }

            case '\\': {
                if(i < mask.length - 1)
                    (beforeDP ? before : after).push(`"${mask.charAt(++i)}`);
                else
                    (beforeDP ? before : after).push('"\\');
                break;
            }

            default: {
                (beforeDP ? before : after).push(`"${c}`);
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
        signExponent: signExponent,
        precision:   precision,
    };
}
//#endregion
//#region format
type FormatOptions = {
    round?: number;
    precision?: number;
    scale?: number;
    lead?: number;
    trim?: 'none' | 'front' | 'back' | 'all';
};

function format(input: number, { round, precision, scale, lead = 1, trim = 'none' }: FormatOptions) {
    const sign      = Math.sign(input);
    const [ m, e ]    = Math.abs(input).toExponential(15).split('e');
    let   exponent  = Number(e) + 1; // +1 because we store the number without the decimal point
    const mantissa  = m.replace('.', empty).split(empty);

    while(mantissa.length > exponent && mantissa[mantissa.length - 1] === '0')
        --mantissa.length;

    const rounder = (n: number) => {
        if(mantissa.length < n) {
            while(mantissa.length < n) mantissa.push('0');
        } else {
            const c = mantissa[n];
            mantissa.length = n;

            if(c > '4') {
                for(;;) {
                    if(n < 0) {
                        mantissa.unshift('0');
                        ++exponent;
                        n = 1;
                    }
                    const d = mantissa[--n];
                    if(d === '0') { mantissa[n] = '1'; break; }
                    if(d === '1') { mantissa[n] = '2'; break; }
                    if(d === '2') { mantissa[n] = '3'; break; }
                    if(d === '3') { mantissa[n] = '4'; break; }
                    if(d === '4') { mantissa[n] = '5'; break; }
                    if(d === '5') { mantissa[n] = '6'; break; }
                    if(d === '6') { mantissa[n] = '7'; break; }
                    if(d === '7') { mantissa[n] = '8'; break; }
                    if(d === '8') { mantissa[n] = '9'; break; }
                    if(d === '9') { mantissa[n] = '0'; mantissa.unshift('1'); ++exponent; break; }
                }
            }
        }
    };

    if(scale !== undefined)     exponent += scale;
    if(round !== undefined)     rounder(exponent + round);
    if(precision !== undefined) rounder(precision);

    let length = Math.min(exponent, mantissa.length);

    while(length < lead) {
        mantissa.unshift('0');
        ++exponent;
        ++length;
    }

    if(trim === 'front' || trim === 'all') {
        while(mantissa.length > 1 && mantissa[0] === '0') {
            mantissa.shift();
            --exponent;
        }
    }

    if(trim === 'back' || trim === 'all') {
        while(mantissa.length > exponent && mantissa[mantissa.length - 1] === '0')
            --mantissa.length;
    }

    return new NumberFormatter(sign, mantissa, exponent);
}

class NumberFormatter {
    constructor(public sign: number, public mantissa: string[], public exponent: number) {
        this.output = [];
    }

    public output:   (string | string[])[];

    public minus(negative: string, positive = empty) {
        this.output.push(this.sign < 0 ? negative : positive);
        return this;
    }

    public grouped() {
        const whole = this.mantissa.slice(0, this.exponent);
        this.output.push(whole.map((c, i) => (i > 0 && (whole.length - i) % 3 === 0 ? `,${c}` : c)));
        return this;
    }

    public whole() {
        const whole    = this.mantissa.slice(0, this.exponent);
        while(whole.length < this.exponent) whole.push('0');
        this.output.push(whole);
        return this;
    }

    public decimal() {
        if(this.exponent < this.mantissa.length)
            this.output.push('.');
        return this;
    }

    public fraction() {
        this.output.push(this.mantissa.slice(this.exponent));
        return this;
    }

    public text(str: string) {
        this.output.push(str);
        return this;
    }

    public scientific(e: string) {
        this.output.push(this.mantissa[0], '.', this.mantissa.slice(1), e, this.exponent > 0 ? '+' : empty, padNumber(this.exponent - 1, 3));
        return this;
    }

    public build() {
        return build(...this.output);
    }
}
//#endregion
//#region formatNumber
export function formatNumber(input: number, mask: string): string {
    // cspell:disable-next-line
    if(/^([CDEFGNPX][0-9]*)|R$/ui.test(mask)) {
        const f    = mask.charAt(0);
        let   prec = Number.parseInt(mask.slice(1), 10);

        switch(f) {
            case 'C':
            case 'c': {
                prec = defaultTo(prec, 2);

                return format(input, { round: prec, lead: 1 }).minus('($', '$').grouped().decimal().fraction().minus(')').build();
            }
            case 'D':
            case 'd': {
                prec = defaultTo(prec, 2);

                return format(input, { round: 0, lead: prec }).minus('-').whole().build();
            }
            case 'E':
            case 'e': {
                prec = defaultTo(prec, 6);

                return format(input, { precision: prec + 1 }).minus('-').scientific(f).build();
            }
            case 'F':
            case 'f': {
                prec = defaultTo(prec, 2);
                return format(input, { round: prec }).minus('-').whole().decimal().fraction().build();
            }
            case 'G':
            case 'g': {
                prec = defaultTo(prec, 15);

                const sci = format(input, { precision: prec, trim: 'all' }).minus('-').scientific(f === 'G' ? 'E' : 'e').build();
                const fix = format(input, { precision: prec, trim: 'back' }).minus('-').whole().decimal().fraction().build();

                return sci.length < fix.length ? sci : fix;
            }
            case 'N':
            case 'n': {
                prec = defaultTo(prec, 2);

                return format(input, { round: prec }).minus('-').grouped().decimal().fraction().build();
            }
            case 'P':
            case 'p': {
                prec = defaultTo(prec, 2);

                return format(input, { scale: 2, round: prec }).minus('-').whole().decimal().fraction().text(' %').build();
            }
            case 'R':
            case 'r': {
                for(let i = 1; i < 21; ++i) {
                    const num = input.toPrecision(i);
                    if(Number.parseFloat(num) === input)
                        return num;
                }

                break;
            }
        // No default
        }
        prec = defaultTo(prec, 0);

        let hex = (input >>> 0).toString(16);
        hex = hex.padStart(prec, '0');
        if(f === 'X') hex = hex.toUpperCase();

        return hex;
    }

    const formats = mask.toString().split(';');

    let fmt = parse(formats[0]);
    if(Number.parseFloat((input * fmt.scale).toFixed(fmt.precision)) === 0)
        fmt = formats.length < 3 ? fmt : parse(formats[2]);
    else if(input < 0)
        fmt = formats.length < 2 ? parse(`-${formats[0]}`) : parse(formats[1]);

    let w: string[];
    let f: string[];
    let exp = 0;

    if(fmt.exponent > 0) {
        const [ m, e ] = Math.abs(input).toExponential(fmt.aDigits + fmt.bDigits - 1).split('e');
        ([ w, f ]      = m.split('.').map(x => x.split(empty)));

        exp = Number(e);

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
            str = (scaled).toFixed(fmt.aDigits);
            split = str.split('.');
            w = split[0].split(empty);    //whole part
            f = split.length > 1 ? split[1].split(empty) : [];    //fractional
        }
    }

    while(w.length > 0 && w[0] === '0') w.shift();

    let o = empty;
    let d = 0;
    let b = fmt.bDigits;

    for(let i = fmt.bMask.length - 1; i >= 0; --i) {
        const x = fmt.bMask[i];

        if(x === '0' || x === '#') {
            if(fmt.group && d === 3 && w.length > 0) {
                o = `,${o}`;
                d = 0;
            }

            if(x === '0') {
                o = w.length > 0 ? w.pop()! + o : `0${o}`;
                d++;
                b--;
            } else if(w.length > 0) {
                o = w.pop()! + o;
                d++;
                b--;
            }

            while(b <= 0 && w.length > 0) {
                if(fmt.group && d === 3) {
                    o = `,${o}`;
                    d = 0;
                }

                o = w.pop()! + o;
                d++;
                b--;
            }
        } else if(x === 'e' || x === 'E') {
            o = `${x}-${padNumber(Math.abs(exp), fmt.exponent)}${o}`;
        } else {
            o = x.slice(1) + o;
        }
    }

    if(fmt.aMask.length > 0) {
        let a = empty;
        let digits = false;

        for(const x of fmt.aMask) {
            switch(x) {
                case '0': {
                    a = a + f.shift()!;

                    digits = true;

                    break;
                }
                case '#': {
                    if(f.reduce((acc, val) => { return val === '0' ? acc : true; }, false)) {
                        a = a + f.shift()!;
                        digits = true;
                    }

                    break;
                }
                case 'e':
                case 'E': {
                    a = a + x + ((fmt.signExponent || exp < 0) ? (exp < 0 ? '-' : '+') : empty) + padNumber(Math.abs(exp), fmt.exponent);

                    break;
                }
                default: { a = a + x.slice(1); }
            }
        }

        o += digits ? `.${a}` : a;
    }

    return o;
}
//#endregion

export default formatNumber;
