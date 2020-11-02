import compareString            from './compareString';


function biGrams(input: string): string[] {
    const    bigram    = [] as string[];

    for(let i = 0; i < input.length - 1; ++i)
        bigram.push(input.substr(i, 2));
    return bigram;
}

type Options = {
    caseInsensitive?: boolean;
}

export function diceCoefficient(input: string, compareTo: string, {caseInsensitive = false}: Options = {}): number {
    if(input.length <= 1 || compareTo.length <= 1)
        return compareString(input, compareTo, { caseInsensitive }) === 0 ? 1.0 : 0.0;

    const bg0: (string | null)[]    = biGrams(caseInsensitive ? input.toLowerCase() : input);
    const bg1: (string | null)[]    = biGrams(caseInsensitive ? compareTo.toLowerCase() : compareTo);
    let   count: number             = 0;

    for(var i = 0; i < bg0.length; ++i) {
        var pos = bg1.indexOf(bg0[i]);
        if(pos >= 0) {
            count += 1;
            bg1[pos] = null;
        }
    }

    return count * 2 / (bg0.length + bg1.length);
}

export default diceCoefficient;
