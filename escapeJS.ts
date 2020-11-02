import build from './build';

const oct = (c: number | undefined) => c !== undefined && (c >= 0x30 && c <= 0x37);
const hex = (c: number | undefined) => c !== undefined && ((c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66));

const x = (c: number) => '\\x' + c.toString(16).padStart(2, '0');
const u = (c: number) => '\\u' + c.toString(16).padStart(4, '0');
const U = (c: number) => '\\u{' + c.toString(16) + '}';

/**
  * Escape a string for use in Javascript
  * @param input        The string to escape
  */
export function escapeJS(input: string): string {
    let output = [] as string[];
    for(let i = 0; i < input.length; ++i) {
        let u0 = input.codePointAt(i);
        let u1 = input.codePointAt(i + 1);

        if(u0 != undefined) {
            if(u0 < 0x00000020) {
                if(u0 === 0x00000000)
                    output.push(oct(u1) ? '\\000' : '\\0');
                else if(u0 === 0x00000008)
                    output.push('\\b');
                else if(u0 === 0x00000009)
                    output.push('\\t');
                else if(u0 === 0x0000000a)
                    output.push('\\n');
                else if(u0 === 0x0000000b)
                    output.push('\\v');
                else if(u0 === 0x0000000c)
                    output.push('\\f');
                else if(u0 === 0x0000000d)
                    output.push('\\r');
                else 
                    output.push(hex(u1) ? u(u0) : x(u0));
            }
            else if(u0 < 0x0000007f) {
                if(u0 === 0x00000022)
                    output.push('\\"');
                else if(u0 === 0x00000027)
                    output.push('\\\'');
                else if(u0 === 0x0000005c)
                    output.push('\\\\');
                else
                    output.push(String.fromCharCode(u0));
            }
            else if(u0 < 0x000000a1)
                output.push(hex(u1) ? u(u0) : x(u0));
            else if(u0 < 0x00000100)
                output.push(String.fromCharCode(u0));
            else if(u0 < 0x00010000)
                output.push(u(u0));
            else {
                ++i;
                output.push(U(u0));
            }
        }
    }

    return build(output);
}

export default escapeJS;
