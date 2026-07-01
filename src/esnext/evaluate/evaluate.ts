import { factorial } from '../math/factorial.ts';
import { floor } from '../math/floor.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

import { mathFunctions } from './math-functions.ts';
import { mathTokenize } from './math-tokenizer.ts';

const defaultVariables: Record<string, number> = {
  π: Math.PI,
  pi: Math.PI,
  e: Math.E,
};

const operators0 = new Set(['+', '-']);
const operators1 = new Set(['*', '/', '%', '×', '÷', '//']);
const operators2 = new Set(['^', '**']);
const operators3 = new Set(['!', '²', '³']);
const operators4 = new Set(['+', '-', '√']);

/**
 * Evaluates a mathematical expression string and returns the numeric result.
 * Supports common arithmetic operators, parentheses, variables, mathematical constants, and built-in functions with proper order of operations.
 * @param expression - The mathematical expression to evaluate.
 * @param variables - Optional record of variable names to their numeric values. Variables override built-in constants.
 * @returns The numeric result of the evaluated expression.
 * @throws If the expression is invalid or contains syntax errors.
 * @example
 * ```typescript
 * evaluate('2 + 3'); // 5
 * evaluate('2 * 3 + 4'); // 10
 * evaluate('2 + 3 * 4'); // 14
 * evaluate('(2 + 3) * 4'); // 20
 * evaluate('10 / 2 - 3'); // 2
 * evaluate('2 ^ 3'); // 8
 * evaluate('10 % 3'); // 1
 * evaluate('2 * (3 + 4) / 2'); // 7
 * evaluate('π * 2'); // 6.283185307179586
 * evaluate('2 * π * 5'); // 31.41592653589793
 * evaluate('12 × 3'); // 36
 * evaluate('20 ÷ 4'); // 5
 * evaluate('√16'); // 4
 * evaluate('√(9 + 16)'); // 5
 * evaluate('5!'); // 120
 * evaluate('e ^ 2'); // 7.389056099...
 * evaluate('|−5|'); // 5
 * evaluate('3²'); // 9
 * evaluate('2³'); // 8
 * evaluate('17 // 5'); // 3
 * evaluate('2 ** 10'); // 1024
 * evaluate('1.5e10'); // 15000000000
 * evaluate('2.5E-3'); // 0.0025
 * evaluate('2 * x + 3', { x: 5 }); // 13
 * evaluate('a * b + c', { a: 2, b: 3, c: 4 }); // 10
 * evaluate('π * r ^ 2', { r: 5 }); // 78.53981633974483
 * evaluate('e', { e: 10 }); // 10 (variables override constants)
 * evaluate('sin(π / 2)'); // 1
 * evaluate('sqrt(16)'); // 4
 * evaluate('max(1, 2, 3)'); // 3
 * evaluate('pow(2, 8)'); // 256
 * evaluate('abs(-5)'); // 5
 * evaluate('mean(1, 2, 3, 4, 5)'); // 3
 * evaluate('clamp(15, 0, 10)'); // 10
 * ```
 * @group Math
 * @category Evaluation
 */
export function evaluate(expression: StringLike, variables?: Record<string, number>): number {
  const text = toString(expression);
  const expr = mathFunctions(text, variables);
  const allVariables = { ...defaultVariables, ...variables };
  const tokens = mathTokenize(expr);
  let position = 0;

  function peek(): string | undefined {
    return tokens[position];
  }

  function consume(): string {
    return tokens[position++] ?? empty;
  }

  function parseExpression(): number {
    return parseAddSubtract();
  }

  function parseAddSubtract(): number {
    let left = parseMultiplyDivideModulo();

    while (operators0.has(peek() ?? empty)) {
      const operator = consume();
      const right = parseMultiplyDivideModulo();
      left = operator === '+' ? left + right : left - right;
    }

    return left;
  }

  function parseMultiplyDivideModulo(): number {
    let left = parseExponentiation();

    while (operators1.has(peek() ?? empty)) {
      const operator = consume();
      const right = parseExponentiation();

      switch (operator) {
        case '*':
        case '×': {
          left *= right;
          break;
        }
        case '/':
        case '÷': {
          if (right === 0) {
            throw new Error('Division by zero');
          }
          left /= right;
          break;
        }
        case '//': {
          if (right === 0) {
            throw new Error('Division by zero');
          }
          left = floor(left / right);
          break;
        }
        case '%': {
          left %= right;
          break;
        }
        // no default
      }
    }

    return left;
  }

  function parseExponentiation(): number {
    let left = parsePostfix();

    if (operators2.has(peek() ?? empty)) {
      consume();
      const right = parseExponentiation(); // Right-associative
      left **= right;
    }

    return left;
  }

  function parsePostfix(): number {
    let value = parseUnary();

    while (operators3.has(peek() ?? empty)) {
      const operator = consume();

      switch (operator) {
        case '!': {
          value = factorial(value);
          break;
        }
        case '²': {
          value **= 2;
          break;
        }
        case '³': {
          value **= 3;
          break;
        }
        // no default
      }
    }

    return value;
  }

  function parseUnary(): number {
    if (operators4.has(peek() ?? empty)) {
      const operator = consume();

      switch (operator) {
        case '+': {
          // eslint-disable-next-line unicorn/no-useless-recursion
          return parseUnary();
        }

        case '-': {
          return -parseUnary();
        }

        case '√': {
          return Math.sqrt(parseUnary());
        }

        // no default
      }
    }

    return parsePrimary();
  }

  function parsePrimary(): number {
    const token = peek();

    if (token === '(') {
      consume();
      // eslint-disable-next-line unicorn/no-declarations-before-early-exit
      const value = parseExpression();
      if (consume() !== ')') {
        throw new Error('Missing closing parenthesis');
      }
      return value;
    }

    if (token === '|') {
      consume();
      // eslint-disable-next-line unicorn/no-declarations-before-early-exit
      const value = parseExpression();
      if (consume() !== '|') {
        throw new Error('Missing closing |');
      }
      return Math.abs(value);
    }

    // eslint-disable-next-line unicorn/prefer-includes-over-repeated-comparisons
    if (token === undefined || token === ')' || token === '|') {
      throw new Error('Unexpected end of expression');
    }

    // Check for variables (includes built-in constants like π, pi, e)
    if (Object.hasOwn(allVariables, token)) {
      consume();
      return allVariables[token];
    }

    const num = Number(consume());
    if (Number.isNaN(num)) {
      throw new TypeError(`Unknown variable: ${token}`);
    }

    return num;
  }

  // eslint-disable-next-line unicorn/no-declarations-before-early-exit
  const result = parseExpression();

  if (position < tokens.length) {
    throw new Error(`Unexpected token: ${tokens[position]}`);
  }

  return result;
}
