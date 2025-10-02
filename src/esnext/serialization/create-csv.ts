import { type CSVOptions } from './csv-options.ts';

/**
 * Assemble an array of objects into CSV format
 *
 * Values are automatically quoted if they contain the delimiter, quote character,
 * or any character from the line separator. Quote characters within values are
 * escaped by doubling them.
 *
 * @param rows - Array of objects to convert to CSV. Keys of the first object become headers.
 * @param options - Configuration options for CSV assembly
 *
 * @returns CSV string with a trailing line separator, or empty string if rows array is empty
 *
 * @example
 * ```ts
 * const data = [
 *   { name: 'Alice', age: 30 },
 *   { name: 'Bob', age: 25 }
 * ];
 * createCsv(data);
 * // Returns: 'name,age\r\nAlice,30\r\nBob,25\r\n'
 * ```
 *
 * @example
 * ```ts
 * // With special characters requiring quoting
 * const data = [{ name: 'Smith, John', notes: 'Said "hello"' }];
 * createCsv(data);
 * // Returns: 'name,notes\r\n"Smith, John","Said ""hello"""\r\n'
 * ```
 *
 * @example
 * ```ts
 * // Custom delimiter and without headers
 * const data = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
 * createCsv(data, { delimiter: '\t', hasHeaders: false });
 * // Returns: '1\t2\r\n3\t4\r\n'
 * ```
 *
 * @group Serialization
 * @category CSV
 */
export function createCsv(
  rows: Record<string, string | number>[],
  { delimiter = ',', quote = '"', lineSeparator = '\n', hasHeaders = true }: CSVOptions = {},
): string {
  if (rows.length === 0) {
    return '';
  }

  const headers = Object.keys(rows[0]);

  const quoteIfNeeded = (value: string): string => {
    // Check if value needs quoting (contains delimiter, quote, or line break characters)
    const needsQuote =
      value.includes(delimiter) ||
      value.includes(quote) ||
      value.includes('\r') ||
      value.includes('\n');
    // Quote and escape if needed
    return needsQuote ? `${quote}${value.replaceAll(quote, quote + quote)}${quote}` : value;
  };

  const csvLines: string[] = [];

  // Quote headers if needed
  if (hasHeaders) {
    const quotedHeaders = headers.map((header) => quoteIfNeeded(header));
    csvLines.push(quotedHeaders.join(delimiter));
  }

  for (const row of rows) {
    const values = headers.map((header) => {
      const value = row[header];
      if (typeof value === 'string') {
        return quoteIfNeeded(value);
      }
      return value;
    });
    csvLines.push(values.join(delimiter));
  }

  return csvLines.join(lineSeparator) + lineSeparator;
}
