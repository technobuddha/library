const TESTS: [string, RegExp][] = [
  // cspell:disable
  ['an', /^[aefhilmnirsx]([-.]|$|th$)/iu],
  ['a', /^[bcdgjkpqtuvwyz]([-.]|$|th$)/iu],
  ['an', /^(euler|hour(?!i)|heir|honest|hono)/iu],
  [
    'an',
    /^(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/u,
  ],
  ['a', /^[^aeiouy]/iu],
  ['a', /^e[uw]/iu],
  ['a', /^onc?e\b/u],
  ['a', /^uni([^nmd]|mo)/iu],
  ['an', /^ut[th]/iu],
  ['a', /^u[bcfhjkqrst][aeiou]/iu],
  ['a', /^U[NK][AIEO]?/u],
  ['an', /^[aeiou]/iu],
  ['an', /^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/iu],
  // cspell:enable
];

/**
 * Options for {@link indefiniteArticle} to determine the indefinite article to use with a word.
 * @group English
 * @category Parts of Speech
 */
export type IndefiniteArticleOptions = {
  /**
   * Only return the indefinite article, do not combine with the input
   * @defaultValue false
   */
  only?: boolean;
};

/**
 * Determine the appropriate indefinite article to use with a word.
 * @remarks The answer is derived from a simple rules engine, it attempts to cover most exceptions
 * to the rules, but the English language has lots of quirks, and this rules engine can not cover them
 * all
 * @param word - The word
 * @param options - see {@link IndefiniteArticleOptions}
 * @returns The appropriate indefinite article ("a" or "an") combined with the input word.  If the only
 * option is used, only the indefinite article is returned.
 * @group English
 * @category Parts of Speech
 */
export function indefiniteArticle(
  word: string,
  { only = false }: IndefiniteArticleOptions = {},
): string {
  let result = 'a';
  for (const [article, rule] of TESTS) {
    if (rule.test(word)) {
      result = article;
      break;
    }
  }

  return only ? result : `${result} ${word}`;
}
