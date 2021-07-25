import { empty }  from './constants';
import { oct, u4 } from './_escape';

/**
 * Escape a string for use in Java
 *
 * @param input The string to escape
 * @returns The string escaped for Java
 */
export function escapeJava(input: string): string {
    const output: string[] = [];
    for(let i = 0; i < input.length; ++i) {
        let u0 = input.codePointAt(i)!;
        let u1 = input.codePointAt(i + 1);

        if(u0 < 0x00000020) {
            switch(u0) {
                case 0x00000000: {
                    output.push(oct(u1) ? '\\000' : '\\0');
                    break;
                }
                case 0x00000008: {
                    output.push('\\b');
                    break;
                }
                case 0x00000009: {
                    output.push('\\t');
                    break;
                }
                case 0x0000000a: {
                    output.push('\\n');
                    break;
                }
                case 0x0000000c: {
                    output.push('\\f');
                    break;
                }
                case 0x0000000d: {
                    output.push('\\r');
                    break;
                }
                default: output.push(u4(u0));
            }
        } else if(u0 < 0x0000007f) {
            switch(u0) {
                case 0x00000022: {
                    output.push('\\"');
                    break;
                }
                case 0x00000027: {
                    output.push("\\'");
                    break;
                }
                case 0x0000005c: {
                    output.push('\\\\');
                    break;
                }
                default: output.push(String.fromCharCode(u0));
            }
        } else if(u0 < 0x000000a1) { output.push(u4(u0)); } else if(u0 < 0x00000100) { output.push(String.fromCharCode(u0)); } else if(u0 < 0x00010000) { output.push(u4(u0)); } else {
            u0 = input.charCodeAt(i);
            u1 = input.charCodeAt(++i);
            output.push(u4(u0), u4(u1));
        }
    }

    return output.join(empty);
}

export default escapeJava;
