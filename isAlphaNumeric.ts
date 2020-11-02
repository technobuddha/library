const reAlphaNumeric = /^(\p{L}|\p{N})+$/u;

export function isAlphaNumeric(input: string): boolean {
    return reAlphaNumeric.test(input);
}

export default isAlphaNumeric;
