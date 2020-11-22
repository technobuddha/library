import create2DArray  from './create2DArray';
import isWhitespace   from "./isWhitespace";

type Options = {
    /** The compairson will ignore case */
    caseInsensitive?: boolean;
}

/**
 * Compute the levenshtein distance between two strings (similarity)
 * 
 * @param input The string
 * @param comparedTo The string to compare to
 * @param __namedParameters see {@link Options}
 * @default caseInsensitive true
 * @returns the levenshteinDistance between the two strings (0 for no similarity through 1 for equal)
 */
export function levenshteinDistance(input: string, comparedTo: string, {caseInsensitive = true}: Options = {}):    number {
    if(isWhitespace(input) || isWhitespace(comparedTo))
        return 0.0;
    else {
        if(caseInsensitive) {
            input       = input.toLowerCase();
            comparedTo  = comparedTo.toLowerCase();
        }

        const inputLen      = input.length;
        const comparedToLen = comparedTo.length;
        const matrix        = create2DArray(inputLen, comparedToLen, 0);

        //initialize
        for(let i = 0; i < inputLen; ++i)       matrix[i][0] = i;
        for(let i = 0; i < comparedToLen; ++i)  matrix[0][i] = i;

        //analyze
        for(let i = 1; i < inputLen; ++i) {
            const si = input.charAt(i - 1);
            for(let j = 1; j < comparedToLen; ++j) {
                const tj     = comparedTo.charAt(j - 1);
                const cost   = (si === tj) ? 0 : 1;
                const above  = matrix[i - 1][j];
                const left   = matrix[i][j - 1];
                const diag   = matrix[i - 1][j - 1];
                let   cell   = Math.min(Math.min(above + 1, left + 1), diag + cost);

                //transposition
                if(i > 1 && j > 1) {
                    let trans = matrix[i - 2][j - 2] + 1;
                    if(input.charAt(i - 2) !== comparedTo.charAt(j - 1)) trans++;
                    if(input.charAt(i - 1) !== comparedTo.charAt(j - 2)) trans++;
                    if(cell > trans) cell = trans;
                }
                matrix[i][j] = cell;
            }
        }

        return 1.0 - matrix[inputLen - 1][comparedToLen - 1] / Math.max(inputLen, comparedToLen);
    }
}

export default levenshteinDistance;
