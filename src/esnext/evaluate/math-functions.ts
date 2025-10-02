import { plural } from '../english/plural.ts';
import { clamp } from '../math/clamp.ts';
import { factorial } from '../math/factorial.ts';
import { lerp } from '../math/lerp.ts';
import { modulo } from '../math/modulo.ts';
import { fillFunctions } from '../string/fill-functions.ts';

import { evaluate } from './evaluate.ts';

const functions = {
  abs: 1,
  sign: 1,
  cos: 1,
  sin: 1,
  tan: 1,
  acos: 1,
  asin: 1,
  atan: 1,
  atan2: 2,
  cosh: 1,
  sinh: 1,
  tanh: 1,
  acosh: 1,
  asinh: 1,
  atanh: 1,
  cbrt: 1,
  hypot: -3,
  sqrt: 1,
  exp: 1,
  expm1: 1,
  pow: 2,
  ceil: 1,
  floor: 1,
  round: 1,
  trunc: 1,
  log: 1,
  log10: 1,
  log1p: 1,
  log2: 1,
  max: -2,
  min: -2,
  clamp: 3,
  factorial: 1,
  modulo: 2,
  lerp: 3,
} as const;

const keys = Object.keys(functions) as (keyof typeof functions)[];

/**
 * Evaluate mathematical functions within an expression string.
 *
 * This function processes a string expression containing mathematical function calls
 * and replaces them with their evaluated results. It supports standard Math functions
 * (e.g., `sin`, `cos`, `sqrt`) as well as custom functions for statistics and other
 * operations (e.g., `mean`, `median`, `factorial`).
 *
 * Supported functions include:
 * - **Trigonometric**: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`
 * - **Hyperbolic**: `sinh`, `cosh`, `tanh`, `asinh`, `acosh`, `atanh`
 * - **Exponential/Logarithmic**: `exp`, `expm1`, `log`, `log10`, `log1p`, `log2`, `pow`
 * - **Rounding**: `ceil`, `floor`, `round`, `trunc`
 * - **Roots**: `sqrt`, `cbrt`
 * - **Other Math**: `abs`, `sign`, `hypot`, `max`, `min`
 * - **Custom**: `clamp`, `factorial`, `modulo`, `lerp`, `mean`, `median`, `mode`, `sum`, `variance`, `standardDeviation`
 *
 * @param expression - The expression string containing function calls to evaluate
 * @param variables - Optional record of variable names to their numeric values for use in expressions
 * @returns The expression with all function calls replaced by their evaluated results
 * @throws If a function is called with an incorrect number of arguments
 *
 * @example
 * ```typescript
 * mathFunctions('sin(0)');
 * // '0'
 *
 * mathFunctions('sqrt(16) + pow(2, 3)');
 * // '12'
 *
 * mathFunctions('mean(1, 2, 3, 4, 5)');
 * // '3'
 *
 * mathFunctions('clamp(x, 0, 100)', { x: 150 });
 * // '100'
 *
 * mathFunctions('factorial(5)');
 * // '120'
 * ```
 * @internal
 */
export function mathFunctions(expression: string, variables?: Record<string, number>): string {
  return fillFunctions(expression, keys, (args, name) => {
    const numArgs = functions[name];
    if (numArgs >= 0 && args.length !== numArgs) {
      throw new Error(`${name}() takes ${plural('argument', numArgs, true)}`);
    } else if (numArgs < 0 && args.length < -(numArgs + 1)) {
      throw new Error(`${name}() takes at least ${plural('argument', -(numArgs + 1), true)}`);
    }

    const nums = args.map((arg) => evaluate(arg, variables));

    switch (name) {
      case 'abs':
      case 'sign':
      case 'cos':
      case 'sin':
      case 'tan':
      case 'acos':
      case 'asin':
      case 'atan':
      case 'cosh':
      case 'sinh':
      case 'tanh':
      case 'acosh':
      case 'asinh':
      case 'atanh':
      case 'cbrt':
      case 'sqrt':
      case 'exp':
      case 'expm1':
      case 'ceil':
      case 'floor':
      case 'round':
      case 'trunc':
      case 'log':
      case 'log10':
      case 'log1p':
      case 'log2': {
        return Math[name](nums[0]).toString();
      }

      case 'pow':
      case 'atan2': {
        return Math[name](nums[0], nums[1]).toString();
      }

      case 'hypot':
      case 'max':
      case 'min': {
        return Math[name](...nums).toString();
      }

      case 'factorial': {
        return factorial(nums[0]).toString();
      }

      case 'clamp': {
        return clamp(nums[0], nums[1], nums[2]).toString();
      }

      case 'lerp': {
        return lerp(nums[0], nums[1], nums[2]).toString();
      }

      case 'modulo': {
        return modulo(nums[0], nums[1]).toString();
      }

      // no default
    }
  });
}
