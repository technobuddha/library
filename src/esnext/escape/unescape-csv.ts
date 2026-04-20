import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Unescapes a CSV-encoded string value.
 *
 * Removes surrounding double quotes and unescapes double-quote pairs as per CSV rules.
 *
 * @param value - The CSV-encoded string or string-like value to unescape
 * @returns The unescaped string
 * @example
 * ```typescript
 * unescapeCsv('"foo"') // 'foo'
 * unescapeCsv('"a""b""c"') // 'a"b"c'
 * unescapeCsv('bar') // 'bar'
 * ```
 * @group Escape
 * @category CSV
 */
export function unescapeCsv(value: StringLike): string {
  const text = toString(value);

  if (text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replaceAll('""', '"');
  }

  return text;
}
