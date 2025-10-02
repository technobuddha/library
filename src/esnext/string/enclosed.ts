import { escapeRegExp } from '../escape/escape-regexp.ts';
import { toRegExp } from '../regexp/to-reg-exp.ts';
import { isSurrogateHigh } from '../unicode/is-surrogate-high.ts';
import { empty } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for the {@link enclosed} function
 * @group String
 * @category Parsing
 */
export type EnclosedOptions = {
  /** The starting delimiter (default: '(') */
  start?: string | RegExp;
  /** The closing delimiter (default: ')') */
  close?: string | RegExp;
  /** The escape character (default: '\\') */
  escape?: string | RegExp;
  /** Quote characters to skip (default: /['"]/v) */
  quote?: string | RegExp;
  /** Single-line comment marker (default: '//') */
  commentLine?: string | RegExp;
  /** Multi-line comment start marker (default: '/\*') */
  commentStart?: string | RegExp;
  /** Multi-line comment end marker (default: '\*\/') */
  commentEnd?: string | RegExp;
  /** Arguments separator (default: ',')  */
  argumentsSeparator?: string | RegExp;
};

/**
 * Return value for the {@link enclosed} function
 * @group String
 * @category Parsing
 */
export type EnclosedReturn = {
  /** The string before the enclosure */
  prev: string;
  /** The starting delimiter */
  start: string;
  /** The content between the delimiters */
  body: string;
  /** Arguments */
  args: string[];
  /** The closing delimiter */
  close: string;
  /** The string after the enclosure */
  next: string;
};

/**
 * Find and extract content enclosed by delimiters, handling nested enclosures,
 * escape sequences, quotes, and comments.
 *
 * This function searches for matching start/close delimiters in a string while
 * properly handling:
 * - Nested enclosures (e.g., parentheses within parentheses)
 * - Escaped delimiters that should be ignored
 * - Quoted strings where delimiters should be ignored
 * - Single-line and multi-line comments where delimiters should be ignored
 *
 * @param text - The string to search within
 * @param options - Configuration options for delimiters and special characters
 * @returns An object containing the parts before, within, and after the enclosure, or null if no matching enclosure is found
 *
 * @example
 * ```typescript
 * // Basic usage with parentheses
 * enclosed('before (content) after');
 * // { prev: 'before ', start: '(', body: 'content', close: ')', next: ' after' }
 *
 * // Nested parentheses
 * enclosed('outer (inner (nested) content) end');
 * // { prev: 'outer ', start: '(', body: 'inner (nested) content', close: ')', next: ' end' }
 *
 * // Custom delimiters
 * enclosed('text [array items] more', { start: '[', close: ']' });
 * // { prev: 'text ', start: '[', body: 'array items', close: ']', next: ' more' }
 *
 * // Handles escaped delimiters
 * enclosed('text (content \\) still inside) after');
 * // { prev: 'text ', start: '(', body: 'content \\) still inside', close: ')', next: ' after' }
 *
 * // No matching enclosure
 * enclosed('no delimiters here');
 * // null
 * ```
 *
 * @group String
 * @category Parsing
 */
export function enclosed(
  text: StringLike,
  {
    start = '(',
    close = ')',
    escape = '\\',
    quote = /['"]/v,
    commentLine = '//',
    commentStart = '/*',
    commentEnd = '*/',
    argumentsSeparator = ',',
  }: EnclosedOptions = {},
): EnclosedReturn | null {
  const str = toString(text);

  const reStart = toRegExp(start, { prefix: '^' });
  const reClose = toRegExp(close, { prefix: '^' });
  const reEscape = toRegExp(escape, { suffix: '$' });
  const reQuote = toRegExp(quote, { prefix: '^' });
  const reCommentLine = toRegExp(commentLine, { prefix: '^' });
  const reCommentStart = toRegExp(commentStart, { prefix: '^' });
  const reCommentEnd = toRegExp(commentEnd, { prefix: '^' });
  const reArguments = toRegExp(argumentsSeparator, { prefix: '^' });
  const args: string[] = [];

  let nested = 0;
  let p1 = 0;
  let argStart = 0;
  let encloserStart = empty;
  for (let i = 0; i < str.length; ) {
    const prev = str.slice(0, i);
    const next = str.slice(i);

    let m = reStart.exec(next);
    if (m) {
      i += m[0].length;

      if (!isEscaped(prev, reEscape)) {
        if (nested++ === 0) {
          p1 = i;
          argStart = i;
          [encloserStart] = m;
        }
      }
      continue;
    }

    m = reClose.exec(next);
    if (m) {
      const end = i;
      const [encloserClose] = m;
      i += encloserClose.length;

      if (!isEscaped(prev, reEscape)) {
        nested--;
        if (nested === 0) {
          // Push the last argument if there's any content
          const lastArg = str.slice(argStart, end).trim();
          if (lastArg.length > 0 || args.length > 0) {
            args.push(lastArg);
          }
          return {
            prev: str.slice(0, p1 - encloserStart.length),
            start: encloserStart,
            body: str.slice(p1, end),
            args,
            close: encloserClose,
            next: str.slice(end + m[0].length),
          };
        }
      }
      continue;
    }

    m = reQuote.exec(next);
    if (m) {
      const [quote] = m;
      i += quote.length;

      const qq = toRegExp(escapeRegExp(quote), { prefix: '^' });

      while (i < str.length) {
        const q0 = str.slice(0, i);
        const q1 = str.slice(i);

        m = qq.exec(q1);
        if (m && !isEscaped(q0, reEscape)) {
          i += m[0].length;
          break;
        }
        i += advance(q1);
      }

      continue;
    }

    m = reCommentLine.exec(next); // Single-line comment
    if (m) {
      i += m[0].length;

      while (i < str.length) {
        const q1 = str.slice(i);

        m = /^\r?\n/v.exec(q1);
        if (m) {
          i += m[0].length;
          break;
        }
        i += advance(q1);
      }
      continue;
    }

    m = reCommentStart.exec(next); // Multi-line comment
    if (m) {
      i += m[0].length;

      while (i < str.length) {
        const q1 = str.slice(i);

        m = reCommentEnd.exec(q1);
        if (m) {
          i += m[0].length;
          break;
        }
        i += advance(q1);
      }
      continue;
    }

    m = reArguments.exec(next);
    if (m && nested === 1) {
      args.push(str.slice(argStart, i).trim());
      i += m[0].length;
      argStart = i;
      continue;
    }

    i += advance(next);
  }
  return null;
}

/**
 * Check if the last character in a string is escaped.
 *
 * @param str - The string to check
 * @param escape - The escape character pattern
 * @returns True if the last character is escaped (preceded by an odd number of escape characters)
 * @internal
 */
function isEscaped(str: string, escape: RegExp): boolean {
  for (let i = 0; i < str.length; i++) {
    if (!escape.test(str.slice(0, str.length - i))) {
      return i % 2 === 1;
    }
  }

  return str.length % 2 === 1;
}

/**
 * Advance the position in a string by the appropriate number of characters,
 * accounting for Unicode surrogate pairs.
 *
 * @param text - The string to advance in
 * @returns 2 if the string starts with a high surrogate (part of a surrogate pair), 1 otherwise
 * @internal
 */
function advance(text: string): number {
  return isSurrogateHigh(text) ? 2 : 1;
}
