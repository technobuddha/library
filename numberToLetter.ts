const ALPHABET  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE      = ALPHABET.length;

export function numberToLetter(n: number): string {
    return Array.from((function *() {
        do {
            --n;
            yield ALPHABET[n % BASE];
            n = Math.floor(n / BASE) 
        } while(n > 0)
    })()).reverse().join('');
};

export default { numberToLetter };