const reAlpha = /^\p{L}+$/u;

export function isAlpha(input: string): boolean {
    return reAlpha.test(input);
}

export default isAlpha;
