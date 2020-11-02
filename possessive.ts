import removeDiacritics from './removeDiacritics';
import matchCase        from './matchCase';

export function possessive(input: string): string {
    const last = removeDiacritics(input[input.length - 1]);

    if(last === 's' || last === 'S')
        return matchCase(input + "'", input);
    else
        return matchCase(input + "'s", input);
}

export default possessive
