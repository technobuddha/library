/**
 * Unescape a string encoded in C style
 *
 * @param input The string to unescape
 * @returns the string with escapes resolved
 */
export function unescapeC(input: string): string {
    return input.replace(
        // cspell:disable-next-line
        /\\(([abefnrtv"'\\])|([0-7]{1,3})|(x[0-9a-fA-F]+)|(U[0-9a-fA-F]{8})|(u[0-9a-fA-F]{4})|.)/gu,
        escape => {
            const c = escape.charAt(1);

            if(c === 'a')
                return '\x07';
            if(c === 'b')
                return '\b';
            if(c === 'e')
                return '\x1b';
            if(c === 'f')
                return '\f';
            if(c === 'n')
                return '\n';
            if(c === 'r')
                return '\r';
            if(c === 't')
                return '\t';
            if(c === 'v')
                return '\v';
            if(c >= '0' && c <= '7')
                return String.fromCodePoint(Number.parseInt(escape.slice(1), 8));
            if(c === 'x')
                return String.fromCodePoint(Number.parseInt(escape.slice(2), 16));
            if(c === 'U' || c === 'u')
                return String.fromCodePoint(Number.parseInt(escape.slice(2), 16));

            return escape.slice(1);
        }
    );
}

export default unescapeC;
