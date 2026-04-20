import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Escape a value for CSV output
 *
 * Values containing a comma or quote are wrapped in quotes, and quotes are escaped by doubling them.
 *
 * @param value - The value to escape for CSV
 * @returns The CSV-escaped string
 * @example
 * ```typescript
 * escapeCsv('Hello, world'); // '"Hello, world"'
 * escapeCsv('He said "hello"'); // '"He said ""hello"""'
 * escapeCsv('Simple'); // 'Simple'
 * ```
 * @group Escape
 * @category CSV
 */
export function escapeCsv(value: StringLike): string {
  const text = toString(value);

  if (text.includes(',') || text.includes('"')) {
    return `"${text.replaceAll('"', '""')}"`;
  }

  return text;
}
