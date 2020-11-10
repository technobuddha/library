
/**
  * Unescape a string encodeed in Javascript style
  * @param input        The string to unescape
  */
export function unescapeJS(input: string): string {
    return input.replace(
        /\\(([bfnrtv"'\\])|([0-7]{1,3})|(x[0-9a-fA-F]{2})|(u[0-9a-fA-F]{4})|(u\{[0-9a-fA-F]{1,}\})|.)/g,
        escape => {
            const c = escape.charAt(1);

            if(c === 'b')
                return '\b';
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
                return String.fromCharCode(Number.parseInt(escape.substr(1), 8));
            if(c === 'x')
                return String.fromCharCode(Number.parseInt(escape.substr(2), 16));
            if(c === 'u') {
                if(escape.charAt(2) === '{')
                    return String.fromCodePoint(Number.parseInt(escape.substr(3, escape.length - 4), 16))
                else
                    return String.fromCharCode(Number.parseInt(escape.substr(2), 16));
            }

            return escape.substr(1);
        }
    );
}

export default unescapeJS;
