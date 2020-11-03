/**
* Test an object to see if it is astring consisting of only whitespace
*/
export function isWhitespace(input: string): boolean {
    return /^\s+$/.test(input);
}

export default isWhitespace;