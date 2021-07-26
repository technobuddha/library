// cspell:disable
const TESTS: [string, RegExp][] = [
    [ 'an', /^[aefhilmnirsx]([-.]|$|th$)/ui ],
    [ 'a',  /^[bcdgjkpqtuvwyz]([-.]|$|th$)/ui ],
    [ 'an', /^(euler|hour(?!i)|heir|honest|hono)/ui ],
    [ 'an', /^(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/u ],
    [ 'a',  /^[^aeiouy]/ui ],
    [ 'a',  /^e[uw]/ui ],
    [ 'a',  /^onc?e\b/u ],
    [ 'a',  /^uni([^nmd]|mo)/ui ],
    [ 'an', /^ut[th]/ui ],
    [ 'a',  /^u[bcfhjkqrst][aeiou]/ui ],
    [ 'a',  /^U[NK][AIEO]?/u ],
    [ 'an', /^[aeiou]/ui ],
    [ 'an', /^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/ui ],
];
//cspell:enable

type Options = {
    /** only return the indefinite article, do not combine with the input */
    only?: boolean;
};

/**
 * Determine the appropriate indefinite article to use with a word.
 *
 * @remarks The answer is derived from a simple rules engine, it attempts to cover most exceptions
 * to the rules, but the English language has lots of quirks, and this rules engine can not cover them
 * all
 *
 * @param word The word
 * @param __namedParameters see {@link Options}
 * @default only false
 * @returns The appropriate indefinite article ("a" or "an") combined with the input word.  If the only
 * option is used, only the indefinite article is returned.
 */
export function indefiniteArticle(word: string, { only = false }: Options = {}): string {
    let result = 'a';
    for(const [ article, rule ] of TESTS) {
        if(rule.test(word)) {
            result = article;
            break;
        }
    }

    return only ? result : `${result} ${word}`;
}

export default indefiniteArticle;
