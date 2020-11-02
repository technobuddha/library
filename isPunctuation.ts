const re = /^(\p{P})+$/u;

export function isPunctuation(input: string): boolean {
    return re.test(input);
}

export default isPunctuation;
