/* eslint-disable @typescript-eslint/prefer-destructuring */
import { escapeRegExp } from '../escape/escape-regexp.ts';
import { build } from '../string/build.ts';
import { type StringLike } from '../string/string-like.ts';

import { isRegExp } from './is-regexp.ts';

/**
 * Options for converting a string or RegExp to a RegExp
 *
 * @group RegExp
 * @category Conversion
 */
export type ToRegExpOptions = {
  /** Regular expression flags to apply (e.g., 'i', 'g', 'gi') */
  flags?: string;
  /** String to prepend to the pattern */
  prefix?: string;
  /** String to append to the pattern */
  suffix?: string;
};

/**
 * Convert a string or RegExp to a RegExp.
 *
 * If the input is already a RegExp,
 * it is returned as-is. If the input is a string, it is escaped and converted to
 * a RegExp with the specified flags.
 *
 * @param input - The string or RegExp to convert
 * @param flags - The RegExp flags to use when converting a string (default: 'v')
 * @returns A RegExp object
 *
 * @example
 * ```typescript
 * toRegExp('hello'); // /hello/v
 * toRegExp('hello.world'); // /hello\.world/v
 * toRegExp('test', 'gi'); // /test/gi
 * toRegExp(/pattern/i); // /pattern/i (returned as-is)
 * ```
 *
 * @group RegExp
 * @category Conversion
 */
export function toRegExp(
  input: StringLike | RegExp,
  { flags = 'v', prefix = '', suffix = '' }: ToRegExpOptions = {},
): RegExp {
  const flagSet = new Set(flags);

  let source: string;

  if (isRegExp(input)) {
    for (const f of input.flags) {
      flagSet.add(f);
    }

    source = input.source;
  } else {
    source = escapeRegExp(input);
  }

  if (flagSet.has('v') && flagSet.has('u')) {
    flagSet.delete('u');
  }

  return new RegExp(`${prefix}${source}${suffix}`, build(flagSet));
}
