import { escapeRegExp } from '../escape/escape-regexp.ts';

import { enclosed } from './enclosed.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Process and replace function calls in a string with custom content.
 *
 * This function searches for specified function names followed by parentheses,
 * extracts their arguments, and replaces the entire function call with the
 * result of a callback function. It properly handles nested parentheses within
 * the function arguments.
 *
 * @param input - The string containing function calls to process
 * @param functions - Array of function names to search for and replace
 * @param callback - Function called for each match, receives the function body and name, returns replacement text
 * @returns The string with all matching function calls replaced
 *
 * @example
 * ```typescript
 * // Basic function replacement
 * fillFunctions('Hello upper(world)', ['upper'], (body) => body.toUpperCase());
 * // 'Hello WORLD'
 *
 * // Multiple functions
 * const text = 'Value: add(1, 2) and multiply(3, 4)';
 * fillFunctions(text, ['add', 'multiply'], (body) => {
 *   const nums = body.split(',').map(n => parseInt(n.trim()));
 *   if (name === 'add') return String(nums[0] + nums[1]);
 *   if (name === 'multiply') return String(nums[0] * nums[1]);
 *   return body;
 * });
 * // 'Value: 3 and 12'
 *
 * // Nested parentheses
 * fillFunctions('fn(outer(inner))', ['fn'], (body) => `[${body}]`);
 * // '[outer(inner)]'
 * ```
 *
 * @group String
 * @category Template
 */
export function fillFunctions<T extends StringLike>(
  input: StringLike,
  functions: readonly T[],
  callback: (args: string[], name: T) => string,
): string {
  const reFunctions = new RegExp(
    `(${functions.map((f) => escapeRegExp(toString(f))).join('|')})\\s*\\(`,
    'vd',
  );

  let text = toString(input);
  while (true) {
    const matches = reFunctions.exec(text);

    if (matches) {
      const i = matches.index;
      const match = enclosed(text.slice(i));

      if (match) {
        const { body, args, prev, start, close } = match;

        for (let i = 0; i < args.length; ++i) {
          let arg = args[i];
          while (true) {
            const next = fillFunctions(arg, functions, callback);
            if (next === arg) {
              break;
            }
            arg = next;
          }
          args[i] = arg;
        }

        const replace = callback(args, prev.trim() as T);
        text =
          text.slice(0, i) +
          replace +
          text.slice(i + prev.length + start.length + body.length + close.length);
        continue;
      }
    }
    break;
  }

  return text;
}
