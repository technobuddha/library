import { create1dArray } from '../array/create1d-array.ts';
import { empty } from '../unicode/unicode.ts';

import { type CSVOptions } from './csv-options.ts';

/**
 * Parse a CSV string into an array of objects
 *
 * Parses CSV format and handles quoted values. Quote characters within quoted values
 * should be escaped by doubling them.
 *
 * @param csv - CSV string to parse
 * @param options - Configuration options for CSV parsing
 *
 * @returns Array of objects representing the CSV data, or empty array if input is empty
 *
 * @example
 * ```ts
 * const csv = 'name,age\\r\\nAlice,30\\r\\nBob,25\\r\\n';
 * parseCsv(csv);
 * // Returns: [{ name: 'Alice', age: '30' }, { name: 'Bob', age: '25' }]
 * ```
 *
 * @example
 * ```ts
 * // With special characters in quoted values
 * const csv = 'name,notes\\r\\n"Smith, John","Said ""hello"""\\r\\n';
 * parseCsv(csv);
 * // Returns: [{ name: 'Smith, John', notes: 'Said "hello"' }]
 * ```
 *
 * @example
 * ```ts
 * // Custom delimiter and without headers
 * const csv = '1\\t2\\r\\n3\\t4\\r\\n';
 * parseCsv(csv, { delimiter: '\\t', hasHeaders: false });
 * // Returns: [{ '0': '1', '1': '2' }, { '0': '3', '1': '4' }]
 * ```
 *
 * @group Serialization
 * @category CSV
 */
export function parseCsv(
  csv: string,
  {
    delimiter = ',',
    quote = '"',
    lineSeparator = '\n',
    hasHeaders = true,
    comment,
  }: CSVOptions = {},
): Record<string, string>[] {
  if (csv.trim() === empty) {
    return [];
  }

  // Remove trailing line separator if present
  let content = csv;
  if (content.endsWith(lineSeparator)) {
    content = content.slice(0, -lineSeparator.length);
  }

  // Parse the entire CSV content into rows and values
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = empty;
  let isInsideQuotes = false;
  let isBeginningOfLine = true;
  let i = 0;

  while (i < content.length) {
    if (comment && isBeginningOfLine && content.startsWith(comment, i)) {
      // Skip the entire comment line
      const nextLineIndex = content.indexOf(lineSeparator, i);
      if (nextLineIndex === -1) {
        break; // No more lines
      }
      i = nextLineIndex + lineSeparator.length;
      isBeginningOfLine = true;
      continue;
    }
    if (content.startsWith(quote, i)) {
      // Check for quote at current position
      if (isInsideQuotes) {
        // Check if this is an escaped quote (doubled)
        if (content.startsWith(quote, i + quote.length)) {
          currentCell += quote;
          isBeginningOfLine = false;
          i += quote.length * 2;
        } else {
          // End of quoted value
          isInsideQuotes = false;
          isBeginningOfLine = false;
          i += quote.length;
        }
      } else {
        // Start of quoted value
        isInsideQuotes = true;
        isBeginningOfLine = false;
        i += quote.length;
      }
    } else if (!isInsideQuotes && content.startsWith(delimiter, i)) {
      // Found delimiter (not inside quotes)
      currentRow.push(currentCell);
      currentCell = empty;
      isBeginningOfLine = false;
      i += delimiter.length;
    } else if (!isInsideQuotes && content.startsWith(lineSeparator, i)) {
      // Found line separator (not inside quotes)
      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = empty;
      isBeginningOfLine = true;
      i += lineSeparator.length;
    } else {
      // Regular character
      currentCell += content[i];
      isBeginningOfLine = false;
      i++;
    }
  }

  // Push the last value and row
  currentRow.push(currentCell);
  rows.push(currentRow);

  // Parse headers or generate default headers
  const headers = hasHeaders ? rows[0] : create1dArray(rows[0].length, (x) => x.toString());

  // Parse data rows
  const startIndex = hasHeaders ? 1 : 0;
  const result: Record<string, string>[] = [];

  for (let i = startIndex; i < rows.length; ++i) {
    const values = rows[i];
    const row: Record<string, string> = {};

    for (let j = 0; j < headers.length; ++j) {
      row[headers[j]] = values[j] ?? empty;
    }

    result.push(row);
  }

  return result;
}
