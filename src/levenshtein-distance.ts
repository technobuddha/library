import create2DArray from './create-2d-array';

type Options = {
  /** The compairson will ignore case */
  caseInsensitive?: boolean;
};

/**
 * Compute the levenshtein distance between two strings (similarity)
 *
 * @param text The string
 * @param comparedTo The string to compare to
 * @param __namedParameters see {@link Options}
 * @default caseInsensitive true
 * @returns the levenshteinDistance between the two strings (0 for no similarity through 1 for equal)
 */
export function levenshteinDistance(
  input: string,
  comparedTo: string,
  { caseInsensitive = true }: Options = {},
): number {
  let text = input;
  let textCompare = comparedTo;

  if (text.length === 0 || textCompare.length === 0)
    return Math.max(text.length, textCompare.length);

  if (caseInsensitive) {
    text = text.toLowerCase();
    textCompare = textCompare.toLowerCase();
  }

  const inputLen = text.length;
  const comparedToLen = textCompare.length;
  const matrix = create2DArray(inputLen, comparedToLen, 0);

  //initialize
  for (let i = 0; i < inputLen; ++i) matrix[i][0] = i;
  for (let i = 0; i < comparedToLen; ++i) matrix[0][i] = i;

  //analyze
  for (let i = 1; i < inputLen; ++i) {
    const si = text.charAt(i - 1);
    for (let j = 1; j < comparedToLen; ++j) {
      const tj = textCompare.charAt(j - 1);
      const cost = si === tj ? 0 : 1;
      const above = matrix[i - 1][j];
      const left = matrix[i][j - 1];
      const diag = matrix[i - 1][j - 1];
      let cell = Math.min(Math.min(above + 1, left + 1), diag + cost);

      //transposition
      if (i > 1 && j > 1) {
        let trans = matrix[i - 2][j - 2] + 1;
        if (text.charAt(i - 2) !== textCompare.charAt(j - 1)) trans++;
        if (text.charAt(i - 1) !== textCompare.charAt(j - 2)) trans++;
        if (cell > trans) cell = trans;
      }
      matrix[i][j] = cell;
    }
  }

  return matrix[inputLen - 1][comparedToLen - 1];
}

export default levenshteinDistance;
