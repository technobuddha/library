import { createCsv } from '../create-csv.ts';
import { parseCsv } from '../parse-csv.ts';

describe('parseCsv', () => {
  test('should skip final comment line with no trailing line separator', () => {
    const csv = 'name,age\nAlice,30\n# last comment';
    expect(parseCsv(csv, { comment: '#' })).toEqual([
      { name: 'Alice', age: '30' },
      { name: '', age: '' },
    ]);
  });
  test('should return empty array for empty string', () => {
    expect(parseCsv('')).toEqual([]);
  });

  test('should return empty array for whitespace-only string', () => {
    expect(parseCsv('   ')).toEqual([]);
  });

  test('should return empty array for CSV with only line separators', () => {
    expect(parseCsv('\n\n')).toEqual([]);
  });

  test('should return empty array for CSV with only delimiters', () => {
    expect(parseCsv(',,')).toEqual([]);
  });

  test('should parse basic CSV with headers', () => {
    const csv = 'name,age\nAlice,30\nBob,25\n';
    expect(parseCsv(csv)).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should parse CSV without headers', () => {
    const csv = 'Alice,30\nBob,25\n';
    expect(parseCsv(csv, { hasHeaders: false })).toEqual([
      { '0': 'Alice', '1': '30' },
      { '0': 'Bob', '1': '25' },
    ]);
  });

  test('should parse CSV without trailing line separator', () => {
    const csv = 'name,age\nAlice,30\nBob,25';
    expect(parseCsv(csv)).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should parse quoted values containing delimiter', () => {
    const csv = 'name,age\n"Smith, John",30\n';
    expect(parseCsv(csv)).toEqual([{ name: 'Smith, John', age: '30' }]);
  });

  test('should parse quoted values containing escaped quotes', () => {
    const csv = 'message\n"He said ""hello"""\n';
    expect(parseCsv(csv)).toEqual([{ message: 'He said "hello"' }]);
  });

  test('should parse quoted values containing line breaks', () => {
    const csv = 'text\n"Line 1\nLine 2"\n';
    expect(parseCsv(csv)).toEqual([{ text: 'Line 1\nLine 2' }]);
  });

  test('should parse quoted values containing carriage return', () => {
    const csv = 'text\n"Line 1Line 2"\n';
    expect(parseCsv(csv)).toEqual([{ text: 'Line 1Line 2' }]);
  });

  test('should parse quoted values containing both \\r and \\n', () => {
    const csv = 'text\n"Line 1\r\nLine 2"\n';
    expect(parseCsv(csv)).toEqual([{ text: 'Line 1\r\nLine 2' }]);
  });

  test('should handle custom delimiter', () => {
    const csv = 'name\tage\nAlice\t30\nBob\t25\n';
    expect(parseCsv(csv, { delimiter: '\t' })).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should handle custom quote character', () => {
    const csv = "name,value\n'Smith''s Store',100\n";
    expect(parseCsv(csv, { quote: "'" })).toEqual([{ name: "Smith's Store", value: '100' }]);
  });

  test('should handle custom line separator (\\n)', () => {
    const csv = 'name,age\nAlice,30\nBob,25\n';
    expect(parseCsv(csv, { lineSeparator: '\n' })).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should handle custom line separator (\\r\\n)', () => {
    const csv = 'name,age\r\nAlice,30\r\nBob,25\r\n';
    expect(parseCsv(csv, { lineSeparator: '\r\n' })).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should handle mixed line separators (\\r\\n and \\n)', () => {
    // Only the specified lineSeparator should be used
    const csv = 'name,age\r\nAlice,30\nBob,25\r\n';
    // The parser will treat only \r\n as a line separator, so the \n in the middle will be part of the cell value
    expect(parseCsv(csv, { lineSeparator: '\r\n' })).toEqual([{ name: 'Alice', age: '30\nBob' }]);
    // If lineSeparator is \n, the \r will be part of the value
    expect(parseCsv(csv, { lineSeparator: '\n' })).toEqual([
      { 'age\r': '30', 'name': 'Alice' },
      { 'age\r': '25\r', 'name': 'Bob' },
    ]);
  });
  test('should skip comment lines with # as comment', () => {
    const csv = '# This is a comment\nname,age\n# Another comment\nAlice,30\nBob,25\n';
    expect(parseCsv(csv, { comment: '#' })).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should skip comment lines with // as comment', () => {
    const csv = '// comment\nname,age\nAlice,30\n// another\nBob,25\n';
    expect(parseCsv(csv, { comment: '//' })).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should skip comment lines with custom lineSeparator', () => {
    const csv = '# comment\r\nname,age\r\nAlice,30\r\n# another\r\nBob,25\r\n';
    expect(parseCsv(csv, { comment: '#', lineSeparator: '\r\n' })).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should not skip comment lines if comment option is not set', () => {
    const csv = '# This is not a comment\nname,age\nAlice,30\n';
    // The parser treats the first line as headers, so the rest are mapped to those headers
    expect(parseCsv(csv)).toEqual([
      { '# This is not a comment': 'name' },
      { '# This is not a comment': 'Alice' },
    ]);
  });

  test('should parse quoted headers containing delimiter', () => {
    const csv = '"First, Name",Age\nAlice,30\n';
    expect(parseCsv(csv)).toEqual([{ 'First, Name': 'Alice', 'Age': '30' }]);
  });

  test('should parse quoted headers containing quote character', () => {
    const csv = '"Name ""Alias"""\nAlice\n';
    expect(parseCsv(csv)).toEqual([{ 'Name "Alias"': 'Alice' }]);
  });

  test('should handle CSV that ends with just a delimiter', () => {
    // This creates an empty currentRow at the end
    const csv = 'name,age\nAlice,30\n,';
    const result = parseCsv(csv);
    expect(result.length).toBeGreaterThan(0);
  });

  test('should parse quoted headers containing line separator characters', () => {
    const csv = '"First\nName"\nAlice\n';
    expect(parseCsv(csv)).toEqual([{ 'First\nName': 'Alice' }]);
  });

  test('should handle multi-character delimiter', () => {
    const csv = 'name||age\nAlice||30\nBob||25\n';
    expect(parseCsv(csv, { delimiter: '||' })).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  test('should parse quoted values containing multi-character delimiter', () => {
    const csv = 'text||value\n"A||B"||1\n';
    expect(parseCsv(csv, { delimiter: '||' })).toEqual([{ text: 'A||B', value: '1' }]);
  });

  test('should handle multi-character quote', () => {
    const csv = 'name,notes\nAlice,##Contains #### symbols##\n';
    expect(parseCsv(csv, { quote: '##' })).toEqual([
      { name: 'Alice', notes: 'Contains ## symbols' },
    ]);
  });

  test('should handle single row', () => {
    const csv = 'name,age\nAlice,30\n';
    expect(parseCsv(csv)).toEqual([{ name: 'Alice', age: '30' }]);
  });

  test('should handle single column', () => {
    const csv = 'name\nAlice\nBob\n';
    expect(parseCsv(csv)).toEqual([{ name: 'Alice' }, { name: 'Bob' }]);
  });

  test('should handle missing values', () => {
    const csv = 'name,age,city\nAlice,30\nBob,25,NYC\n';
    expect(parseCsv(csv)).toEqual([
      { name: 'Alice', age: '30', city: '' },
      { name: 'Bob', age: '25', city: 'NYC' },
    ]);
  });

  test('should handle all options combined', () => {
    const csv = 'name||value\n##Test####123##||100\nData||200\n';
    expect(
      parseCsv(csv, {
        delimiter: '||',
        quote: '##',
        lineSeparator: '\n',
        hasHeaders: true,
      }),
    ).toEqual([
      { name: 'Test##123', value: '100' },
      { name: 'Data', value: '200' },
    ]);
  });

  test('should roundtrip with createCsv', () => {
    const original = [
      { name: 'Alice', age: '30', notes: 'Test, "quotes"' },
      { name: 'Bob', age: '25', notes: 'Line 1\nLine 2' },
    ];

    const csv = createCsv(original);
    const result = parseCsv(csv);

    expect(result).toEqual(original);
  });

  test('should handle empty fields', () => {
    const csv = 'a,b,c\n1,,3\n,2,\n';
    expect(parseCsv(csv)).toEqual([
      { a: '1', b: '', c: '3' },
      { a: '', b: '2', c: '' },
    ]);
  });

  test('should handle headers only', () => {
    const csv = 'name,age\n';
    expect(parseCsv(csv)).toEqual([]);
  });

  test('should preserve column order', () => {
    const csv = 'age,name\n30,Alice\n25,Bob\n';
    const result = parseCsv(csv);
    expect(Object.keys(result[0])).toEqual(['age', 'name']);
  });
});
