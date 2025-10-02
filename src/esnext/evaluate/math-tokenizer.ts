import { isWhitespace } from '../unicode/is-whitespace.ts';
import { empty } from '../unicode/unicode.ts';

// prettier-ignore
const singleCharOperators = new Set(['+', '-', '*', '/', '%', '^', '(', ')', '×', '÷', '√', '!', '|', '²', '³']);
const scientificSignChars = new Set(['+', '-']);
const scientificEChars = new Set(['e', 'E']);

/**
 * Tokenizes a mathematical expression into an array of tokens.
 * Handles numbers (including decimals and scientific notation), identifiers (variables),
 * operators (arithmetic, comparison, etc.), and special characters.
 * @param expression - The expression string to tokenize.
 * @returns An array of tokens (numbers, identifiers, and operators).
 * @throws If an invalid character is encountered.
 * @example
 * ```ts
 * mathTokenize('2 + 3 * x - 4.5 / (y - 1)'); // ['2', '+', '3', '*', 'x', '-', '4.5', '/', '(', 'y', '-', '1', ')']
 * mathTokenize('sin(π / 2) + cos(0)'); // ['sin', '(', 'π', '/', '2', ')', '+', 'cos', '(', '0', ')']
 * mathTokenize('5! + 3² - √16'); // ['5', '!', '+', '3', '²', '-', '√', '16']
 * mathTokenize('1.5e10 + 2.5E-3'); // ['1.5e10', '+', '2.5E-3']
 * ```
 * @group Math
 * @category Evaluation
 */
export function mathTokenize(expression: string): string[] {
  const tokens: string[] = [];
  let current = empty;
  let currentType: 'number' | 'identifier' | null = null;
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];
    const nextChar = expression[i + 1];

    if (isWhitespace(char)) {
      if (current) {
        tokens.push(current);
        current = '';
        currentType = null;
      }
      i++;
      continue;
    }

    // Check for multi-character operators
    if (char === '/' && nextChar === '/') {
      if (current) {
        tokens.push(current);
        current = '';
        currentType = null;
      }
      tokens.push('//');
      i += 2;
      continue;
    }

    if (char === '*' && nextChar === '*') {
      if (current) {
        tokens.push(current);
        current = '';
        currentType = null;
      }
      tokens.push('**');
      i += 2;
      continue;
    }

    const isDigit = char >= '0' && char <= '9';
    const isUnderscore = char === '_';
    const isLetter = /\p{L}/v.test(char);
    const isDot = char === '.';
    const isScientificE = scientificEChars.has(char) && currentType === 'number';
    const isScientificSign =
      scientificSignChars.has(char) &&
      currentType === 'number' &&
      current.length > 0 &&
      (current.endsWith('e') || current.endsWith('E'));

    if (isScientificE || isScientificSign) {
      current += char;
      currentType = 'number';
    } else if (isLetter || isUnderscore || (isDigit && currentType === 'identifier')) {
      if (currentType === 'number') {
        tokens.push(current);
        current = '';
      }
      current += char;
      currentType = 'identifier';
    } else if (isDigit || (isDot && (currentType === 'number' || currentType === null))) {
      current += char;
      currentType = 'number';
    } else {
      if (current) {
        tokens.push(current);
        current = '';
        currentType = null;
      }

      if (singleCharOperators.has(char)) {
        tokens.push(char);
      } else {
        throw new Error(`Invalid character: ${char}`);
      }
    }

    i++;
  }

  if (current) {
    tokens.push(current);
  }

  return tokens;
}
