import { empty }             from './constants';
import { oct, hex, x2, u4, U8 } from './_escape';

/**
 * Escape a string for use in C/C++
 *
 * @param input The string to escape
 * @returns the escaped string
 */
export function escapeC(input: string): string {
    const output: string[] = [];
    for(let i = 0; i < input.length; ++i) {
        const u0 = input.codePointAt(i)!;
        const u1 = input.codePointAt(i + 1);

        if(u0 < 0x00000020) {
            if(u0 === 0x00000000)
                output.push(oct(u1) ? '\\000' : '\\0');
            else if(u0 === 0x00000007)
                output.push('\\a');
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
                output.push(hex(u1) ? u4(u0) : x2(u0));
        } else if(u0 < 0x0000007f) {
            if(u0 === 0x00000022)
                output.push('\\"');
            else if(u0 === 0x00000027)
                output.push("\\'");
            else if(u0 === 0x0000003f)
                output.push('\\?');
            else if(u0 === 0x0000005c)
                output.push('\\\\');
            else
                output.push(String.fromCharCode(u0));
        } else if(u0 < 0x000000a1) {
            output.push(hex(u1) ? u4(u0) : x2(u0));
        } else if(u0 < 0x00000100) {
            output.push(String.fromCharCode(u0));
        } else if(u0 < 0x00010000) {
            output.push(u4(u0));
        } else {
            ++i;
            output.push(U8(u0));
        }
    }

    return output.join(empty);
}

export default escapeC;
