import { build } from './build.ts';
import { padNumber } from './pad-number.ts';
import { splitChars } from './split-chars.ts';
import { empty } from './unicode.ts';

//#region parse
/**
 * Internal type representing the parsed components of a number format mask.
 *
 * @remarks
 * This type is used internally by the {@link parse} function to decompose a format mask
 * into its constituent parts for number formatting operations.
 *
 * @example
 * ```typescript
 * // For mask "#,##0.00"
 * const parsed: ParseReturn = {
 *   aMask: ['0', '0'],           // After decimal point
 *   aDigits: 2,                  // 2 digits after decimal
 *   bMask: ['#', '#', '#', '0'], // Before decimal point
 *   bDigits: 4,                  // 4 digit positions before decimal
 *   scale: 1,                    // No scaling
 *   group: true,                 // Grouping enabled (commas)
 *   exponent: 0,                 // No scientific notation
 *   signExponent: false,         // No explicit sign in exponent
 *   precision: 2                 // 2 decimal places
 * };
 * ```
 *
 * @internal
 */
type ParseReturn = {
  /**
   * Format mask components after the decimal point.
   * Each element represents a formatting directive ('0', '#', or literal text).
   */
  aMask: string[];

  /**
   * Number of digit placeholders after the decimal point.
   * Counts only '0' and '#' characters in {@link aMask}.
   */
  aDigits: number;

  /**
   * Format mask components before the decimal point.
   * Each element represents a formatting directive ('0', '#', or literal text).
   */
  bMask: string[];

  /**
   * Number of digit placeholders before the decimal point.
   * Counts only '0' and '#' characters in {@link bMask}.
   */
  bDigits: number;

  /**
   * Scaling factor to apply to the number before formatting.
   * - `1` = no scaling
   * - `100` = percentage (%)
   * - `1000` = per mille (‰)
   * - `10000` = per ten thousand (‱)
   * - Also affected by comma positioning for thousands scaling
   */
  scale: number;

  /**
   * Whether to include thousands grouping separators (commas).
   * Set to `true` when commas are present in the format mask.
   */
  group: boolean;

  /**
   * Number of digits in the exponent for scientific notation.
   * `0` indicates no scientific notation formatting.
   */
  exponent: number;

  /**
   * Whether to always show the sign (+/-) in scientific notation exponent.
   * Only relevant when {@link exponent} \> 0.
   */
  signExponent: boolean;

  /**
   * Maximum number of digits after the decimal point.
   * Used to determine rounding and padding behavior.
   */
  precision: number;
};

/**
 * Parses a numeric format mask string and extracts formatting information.
 *
 * The function analyzes the provided mask to determine digit placeholders,
 * grouping, scaling (e.g., percent, per mille), decimal precision, exponent formatting,
 * and literal characters. It returns an object describing the parsed mask.
 *
 * @param mask - The numeric format mask string to parse (e.g., "#,##0.00%").
 * @returns An object containing:
 * - `aMask`: Array of mask tokens after the decimal point.
 * - `aDigits`: Number of digit placeholders after the decimal point.
 * - `bMask`: Array of mask tokens before the decimal point.
 * - `bDigits`: Number of digit placeholders before the decimal point.
 * - `scale`: Numeric scale factor (e.g., 100 for %, 1000 for ‰).
 * - `group`: Whether digit grouping (e.g., thousands separator) is used.
 * - `exponent`: Number of digits in the exponent (if scientific notation is used).
 * - `signExponent`: Whether the exponent includes a sign.
 * - `precision`: Number of digits after the decimal point.
 *
 * @example
 * ```typescript
 * const result = parse("#,##0.00%");
 * // result = {
 * //   aMask: ['0', '0'],
 * //   aDigits: 2,
 * //   bMask: ['#', ',', '#', '#', '0', '"%'],
 * //   bDigits: 4,
 * //   scale: 100,
 * //   group: true,
 * //   exponent: 0,
 * //   signExponent: false,
 * //   precision: 2
 * // }
 * ```
 * @internal
 */
function parse(mask: string): ParseReturn {
  let scale = 1;
  let beforeDP = true;
  const before: string[] = [];
  let after: string[] = [];
  let group = false;
  let commas = 0;
  let zeroSeen = false;
  let exponent = 0;
  let signExponent = false;
  let precision = 0;

  const m = splitChars(mask);
  for (let i = 0; i < m.length; ++i) {
    const c = m[i];

    switch (c) {
      case '"': //literal string
      case "'": {
        let s = '"';

        for (++i; i < mask.length; ++i) {
          const k = mask.charAt(i);

          if (c === k) {
            break;
          }
          s += k;
        }

        (beforeDP ? before : after).push(s);
        break;
      }

      case '#': {
        if (beforeDP) {
          before.push(zeroSeen ? '0' : '#');
        } else {
          precision++;
          after.push('#');
        }
        break;
      }

      case '0': {
        if (beforeDP) {
          //If we see a 0 before the decimal point, all following #s are transformed into 0s
          before.push('0');
          zeroSeen = true;
        } else {
          //if we see a 0 after the decimal point, the proceeding #s are transformed into 0s
          precision++;
          after = after.map((a) => (a === '#' ? '0' : a));
          after.push('0');
        }
        break;
      }

      case ',': {
        if (beforeDP) {
          commas++;
        }
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

        if (mask.length > j && mask.charAt(j) === '+') {
          j++;
          signSeen = true;
        } else if (mask.length > j && mask.charAt(j) === '-') {
          j++;
        }

        while (mask.length > j && mask.charAt(j) === '0') {
          j++;
          e++;
        }

        if (e > 0) {
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
        if (i < mask.length - 1) {
          (beforeDP ? before : after).push(`"${mask.charAt(++i)}`);
        } else {
          (beforeDP ? before : after).push('"\\');
        }
        break;
      }

      default: {
        (beforeDP ? before : after).push(`"${c}`);
        break;
      }
    }

    if (beforeDP && c !== ',') {
      if (commas > 0) {
        group = true;
      }
      commas = 0;
    }
  }

  scale /= 1000 ** commas;

  return {
    aMask: after,
    aDigits: after.reduce((acc, val) => (val === '0' || val === '#' ? acc + 1 : acc), 0),
    bMask: before,
    bDigits: before.reduce((acc, val) => (val === '0' || val === '#' ? acc + 1 : acc), 0),
    scale: scale,
    group: group,
    exponent: exponent,
    signExponent: signExponent,
    precision: precision,
  };
}
//#endregion
//#region format
/**
 * Options for formatting numbers.
 *
 * @internal
 */
type FormatOptions = {
  /** The number of decimal places to round the number to. If undefined, no rounding is applied. */
  round?: number;
  /** The total number of significant digits to display. If undefined, precision is not enforced. */
  precision?: number;
  /** A multiplier to scale the number before formatting. For example, a scale of 100 will convert 1.23 to 123. */
  scale?: number;
  /** The minimum number of integer digits to display, padding with leading zeros if necessary. */
  lead?: number;
  /**
   * Specifies which zeros to trim from the formatted number:
   * - 'none': Do not trim any zeros.
   * - 'front': Trim leading zeros.
   * - 'back': Trim trailing zeros.
   * - 'all': Trim both leading and trailing zeros.
   */
  trim?: 'none' | 'front' | 'back' | 'all';
};

/**
 * Internal utility for formatting a number into its sign, mantissa, and exponent components.
 *
 * This function prepares a number for custom formatting by extracting its sign, splitting it into digits,
 * handling rounding, scaling, significant digits, leading zeros, and trimming zeros as specified.
 * It returns a `NumberFormatter` instance, which provides a fluent API for building the final formatted string.
 * @param input - The number to format.
 * @param options - Formatting options:
 *   - `round`: Number of decimal places to round to (optional).
 *   - `precision`: Total number of significant digits to display (optional).
 *   - `scale`: Power-of-10 exponent to add to the number before formatting (optional).
 *   - `lead`: Minimum number of integer digits to display (default: 1).
 *   - `trim`: Which zeros to trim ('none', 'front', 'back', 'all'; default: 'none').
 * @returns A `NumberFormatter` instance for further formatting and string building.
 * @example
 * ```typescript
 * const fmt = format(1234.567, { round: 2 });
 * const str = fmt.minus('-').whole().decimal().fraction().build(); // "1234.57"
 * ```
 * @internal
 */
function format(
  input: number,
  { round, precision, scale, lead = 1, trim = 'none' }: FormatOptions,
): NumberFormatter {
  const sign = Math.sign(input);
  const [m, e] = Math.abs(input).toExponential(15).split('e');
  let exponent = Number(e) + 1; // +1 because we store the number without the decimal point
  const mantissa = m.replace('.', empty).split(empty);

  while (mantissa.length > exponent && mantissa.at(-1) === '0') {
    --mantissa.length;
  }

  const rounder = (num: number): void => {
    let n = num;

    if (mantissa.length < n) {
      while (mantissa.length < n) {
        mantissa.push('0');
      }
    } else {
      const c = mantissa[n];
      mantissa.length = n;

      if (c > '4') {
        for (;;) {
          if (n < 0) {
            mantissa.unshift('0');
            ++exponent;
            n = 1;
          }
          const d = mantissa[--n];
          if (d === '0') {
            mantissa[n] = '1';
            break;
          }
          if (d === '1') {
            mantissa[n] = '2';
            break;
          }
          if (d === '2') {
            mantissa[n] = '3';
            break;
          }
          if (d === '3') {
            mantissa[n] = '4';
            break;
          }
          if (d === '4') {
            mantissa[n] = '5';
            break;
          }
          if (d === '5') {
            mantissa[n] = '6';
            break;
          }
          if (d === '6') {
            mantissa[n] = '7';
            break;
          }
          if (d === '7') {
            mantissa[n] = '8';
            break;
          }
          if (d === '8') {
            mantissa[n] = '9';
            break;
          }
          if (d === '9') {
            mantissa[n] = '0';
            mantissa.unshift('1');
            ++exponent;
            break;
          }
        }
      }
    }
  };

  if (scale !== undefined) {
    exponent += scale;
  }
  if (round !== undefined) {
    rounder(exponent + round);
  }
  if (precision !== undefined) {
    rounder(precision);
  }

  let length = Math.min(exponent, mantissa.length);

  while (length < lead) {
    mantissa.unshift('0');
    ++exponent;
    ++length;
  }

  if (trim === 'front' || trim === 'all') {
    while (mantissa.length > 1 && mantissa[0] === '0') {
      mantissa.shift();
      --exponent;
    }
  }

  if (trim === 'back' || trim === 'all') {
    while (mantissa.length > exponent && mantissa.at(-1) === '0') {
      --mantissa.length;
    }
  }

  return new NumberFormatter(sign, mantissa, exponent);
}

/**
 * Formats numbers by manipulating their sign, mantissa, and exponent components.
 *
 * The `NumberFormatter` class provides a fluent API for constructing formatted number strings,
 * supporting features such as sign handling, digit grouping, decimal and fractional parts,
 * and scientific notation. The output is built incrementally and can be retrieved as a string.
 *
 * @example
 * ```typescript
 * const formatter = new NumberFormatter(1, ['1', '2', '3', '4'], 2);
 * const result = formatter.grouped().decimal().fraction().build(); // "1,2.34"
 * ```
 *
 * @internal
 */
class NumberFormatter {
  public constructor(
    public sign: number,
    public mantissa: string[],
    public exponent: number,
  ) {
    this.output = [];
  }

  public output: (string | string[])[];

  public minus(negative: string, positive = empty): this {
    this.output.push(this.sign < 0 ? negative : positive);
    return this;
  }

  public grouped(): this {
    const whole = this.mantissa.slice(0, this.exponent);
    this.output.push(whole.map((c, i) => (i > 0 && (whole.length - i) % 3 === 0 ? `,${c}` : c)));
    return this;
  }

  public whole(): this {
    const whole = this.mantissa.slice(0, this.exponent);
    while (whole.length < this.exponent) {
      whole.push('0');
    }
    this.output.push(whole);
    return this;
  }

  public decimal(): this {
    if (this.exponent < this.mantissa.length) {
      this.output.push('.');
    }
    return this;
  }

  public fraction(): this {
    this.output.push(this.mantissa.slice(this.exponent));
    return this;
  }

  public text(str: string): this {
    this.output.push(str);
    return this;
  }

  public scientific(e: string): this {
    this.output.push(
      this.mantissa[0],
      '.',
      this.mantissa.slice(1),
      e,
      this.exponent > 0 ? '+' : empty,
      padNumber(this.exponent - 1, 3),
    );
    return this;
  }

  public build(): string {
    return build(...this.output);
  }
}
//#endregion
//#region formatNumber
/**
 * Formats a number according to the specified mask.
 *
 * The mask can be a standard numeric format string (e.g., "C", "D", "E", "F", "G", "N", "P", "R", "X")
 * with an optional precision specifier, or a custom numeric format string with optional sections for
 * positive, negative, and zero values separated by semicolons.
 *
 * Standard format specifiers:
 * - "C" or "c": Currency format.
 * - "D" or "d": Decimal format.
 * - "E" or "e": Scientific (exponential) format.
 * - "F" or "f": Fixed-point format.
 * - "G" or "g": General format (compact representation).
 * - "N" or "n": Number format with group separators.
 * - "P" or "p": Percent format.
 * - "R" or "r": Round-trip format (ensures that a number converted to a string and back again yields the same number).
 * - "X" or "x": Hexadecimal format.
 *
 * Custom format strings can include digit placeholders, group separators, decimal points, and
 * optional sections for positive, negative, and zero values.
 *
 * @param input - The number to format.
 * @param mask - The format mask string.
 * @returns The formatted number as a string.
 *
 * @example
 * ```typescript
 * formatNumber(1234.56, "C2"); // "$1,234.56"
 * formatNumber(-42, "D5");     // "-00042"
 * formatNumber(0.123, "P1");   // "12.3 %"
 * formatNumber(12345.678, "#,##0.00"); // "12,345.68"
 * ```
 *
 * @group Math
 * @category Numbers
 */
export function formatNumber(input: number, mask: string): string {
  // cspell:ignore CDEFGNPX
  if (/^([CDEFGNPX][0-9]*)|R$/iu.test(mask)) {
    const f = mask.charAt(0);
    let prec = Number.parseInt(mask.slice(1));

    switch (f) {
      case 'C':
      case 'c': {
        prec = Number.isNaN(prec) ? 2 : prec;

        return format(input, { round: prec, lead: 1 })
          .minus('($', '$')
          .grouped()
          .decimal()
          .fraction()
          .minus(')')
          .build();
      }
      case 'D':
      case 'd': {
        prec = Number.isNaN(prec) ? 2 : prec;

        return format(input, { round: 0, lead: prec }).minus('-').whole().build();
      }
      case 'E':
      case 'e': {
        prec = Number.isNaN(prec) ? 6 : prec;

        return format(input, { precision: prec + 1 })
          .minus('-')
          .scientific(f)
          .build();
      }
      case 'F':
      case 'f': {
        prec = Number.isNaN(prec) ? 2 : prec;
        return format(input, { round: prec }).minus('-').whole().decimal().fraction().build();
      }
      case 'G':
      case 'g': {
        prec = Number.isNaN(prec) ? 15 : prec;

        const sci = format(input, { precision: prec, trim: 'all' })
          .minus('-')
          .scientific(f === 'G' ? 'E' : 'e')
          .build();
        const fix = format(input, { precision: prec, trim: 'back' })
          .minus('-')
          .whole()
          .decimal()
          .fraction()
          .build();

        return sci.length < fix.length ? sci : fix;
      }
      case 'N':
      case 'n': {
        prec = Number.isNaN(prec) ? 2 : prec;

        return format(input, { round: prec }).minus('-').grouped().decimal().fraction().build();
      }
      case 'P':
      case 'p': {
        prec = Number.isNaN(prec) ? 2 : prec;

        return format(input, { scale: 2, round: prec })
          .minus('-')
          .whole()
          .decimal()
          .fraction()
          .text(' %')
          .build();
      }
      case 'R':
      case 'r': {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
          .map((p) => input.toPrecision(p))
          .find((n) => Number.parseFloat(n) === input)!;
      }

      // no default
    }
    prec = Number.isNaN(prec) ? 0 : prec;

    // eslint-disable-next-line no-bitwise
    let hex = (input >>> 0).toString(16);
    hex = hex.padStart(prec, '0');
    if (f === 'X') {
      hex = hex.toLocaleUpperCase();
    }

    return hex;
  }

  const formats = mask.split(';');

  let fmt = parse(formats[0]);
  if (Number.parseFloat((input * fmt.scale).toFixed(fmt.precision)) === 0) {
    fmt = formats.length < 3 ? fmt : parse(formats[2]);
  } else if (input < 0) {
    fmt = formats.length < 2 ? parse(`-${formats[0]}`) : parse(formats[1]);
  }

  let w: string[];
  let f: string[];
  let exp = 0;

  if (fmt.exponent > 0) {
    const [m, e] = Math.abs(input)
      .toExponential(fmt.aDigits + fmt.bDigits - 1)
      .split('e');
    [w, f] = m.split('.').map((x) => x.split(empty));

    exp = Number(e);

    while (w.length < fmt.bDigits) {
      w.push(f.shift()!);
      exp--;
    }
  } else if (fmt.bDigits === 0) {
    w = Math.abs(input * fmt.scale)
      .toFixed(0)
      .split(empty);
    f = [];
  } else {
    let scaled = Math.abs(input * fmt.scale);
    let rescale = 0;
    let str: string;
    let split: string[];

    //toFixed for numbers greater than 1e21 return scientific notation...
    while (scaled > 1e21) {
      scaled /= 1e21;
      rescale += 21;
    }

    if (rescale > 0) {
      str = scaled.toFixed(17);
      split = str.split('.');
      w = split[0].split(empty);
      f = split[1].split(empty);

      while (rescale-- > 0) {
        w.push(f.shift()!);
        f.push('0');
      }
    } else {
      str = scaled.toFixed(fmt.aDigits);
      split = str.split('.');
      w = split[0].split(empty); //whole part
      f = split.length > 1 ? split[1].split(empty) : []; //fractional
    }
  }

  while (w.length > 0 && w[0] === '0') {
    w.shift();
  }

  let o = empty;
  let d = 0;
  let b = fmt.bDigits;

  for (let i = fmt.bMask.length - 1; i >= 0; --i) {
    const x = fmt.bMask[i];

    if (x === '0' || x === '#') {
      if (fmt.group && d === 3 && w.length > 0) {
        o = `,${o}`;
        d = 0;
      }

      if (x === '0') {
        o = w.length > 0 ? w.pop()! + o : `0${o}`;
        d++;
        b--;
      } else if (w.length > 0) {
        o = w.pop()! + o;
        d++;
        b--;
      }

      while (b <= 0 && w.length > 0) {
        if (fmt.group && d === 3) {
          o = `,${o}`;
          d = 0;
        }

        o = w.pop()! + o;
        d++;
        b--;
      }
    } else if (x === 'e' || x === 'E') {
      o = `${x}-${padNumber(Math.abs(exp), fmt.exponent)}${o}`;
    } else {
      o = x.slice(1) + o;
    }
  }

  if (fmt.aMask.length > 0) {
    let a = empty;
    let digits = false;

    for (const x of fmt.aMask) {
      switch (x) {
        case '0': {
          a += f.shift()!;

          digits = true;

          break;
        }
        case '#': {
          if (f.reduce((acc, val) => (val === '0' ? acc : true), false)) {
            a += f.shift()!;
            digits = true;
          }

          break;
        }
        case 'e':
        case 'E': {
          a =
            a +
            x +
            (fmt.signExponent || exp < 0 ?
              exp < 0 ?
                '-'
              : '+'
            : empty) +
            padNumber(Math.abs(exp), fmt.exponent);

          break;
        }
        default: {
          a += x.slice(1);
        }
      }
    }

    o += digits ? `.${a}` : a;
  }

  return o;
}
//#endregion
