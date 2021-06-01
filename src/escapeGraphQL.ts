import { empty }  from './constants';
import { u4 }     from './_escape';

/**
 * Escape a string for use in GraphQL
 *
 * @param input The string to escape
 * @returns the escaped string
 */
export function escapeGraphQL(input: string): string {
    const output: string[] = [];
    for(let i = 0; i < input.length; ++i) {
        const u = input.codePointAt(i)!;

        if(u < 0x00000020) {
            if(u === 0x00000008)
                output.push('\\b');
            else if(u === 0x00000009)
                output.push('\\t');
            else if(u === 0x0000000a)
                output.push('\\n');
            else if(u === 0x0000000c)
                output.push('\\f');
            else if(u === 0x0000000d)
                output.push('\\r');
            else
                output.push(u4(u));
        } else if(u < 0x0000007f) {
            if(u === 0x00000022)
                output.push('\\"');
            else if(u === 0x0000002F)
                output.push('\\/');
            else if(u === 0x0000005c)
                output.push('\\\\');
            else
                output.push(String.fromCharCode(u));
        } else if(u < 0x000000a1) {
            output.push(u4(u));
        } else if(u < 0x00010000) {
            output.push(String.fromCodePoint(u));
        } else {
            i++;
            output.push(String.fromCodePoint(u));
        }
    }

    return output.join(empty);
}

export default escapeGraphQL;
