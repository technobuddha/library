const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type Options = {
    alphabet?: string;
}

export function numberToLetter(n: number, {alphabet = ALPHABET}: Options = {}): string {
    const base = alphabet.length;

    return Array.from((function *() {
        do {
            --n;
            yield alphabet[n % base];
            n = Math.floor(n / base) 
        } while(n > 0)
    })()).reverse().join('');
}

export default numberToLetter;