import { createCsv } from '../create-csv.ts';

describe('createCsv', () => {
  test('should return empty string for empty array', () => {
    expect(createCsv([])).toBe('');
  });

  test('should assemble basic CSV with headers', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    expect(createCsv(data)).toBe('name,age\nAlice,30\nBob,25\n');
  });

  test('should assemble CSV without headers', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    expect(createCsv(data, { hasHeaders: false })).toBe('Alice,30\nBob,25\n');
  });

  test('should quote values containing delimiter', () => {
    const data = [{ name: 'Smith, John', age: 30 }];
    expect(createCsv(data)).toBe('name,age\n"Smith, John",30\n');
  });

  test('should quote values containing quote character and escape quotes', () => {
    const data = [{ message: 'He said "hello"' }];
    expect(createCsv(data)).toBe('message\n"He said ""hello"""\n');
  });

  test('should quote values containing line separator characters', () => {
    const data = [{ text: 'Line 1\nLine 2' }];
    expect(createCsv(data)).toBe('text\n"Line 1\nLine 2"\n');
  });

  test('should quote values containing carriage return', () => {
    const data = [{ text: 'Line 1\rLine 2' }];
    expect(createCsv(data)).toBe('text\n"Line 1\rLine 2"\n');
  });

  test('should quote values containing both \\r and \\n', () => {
    const data = [{ text: 'Line 1\r\nLine 2' }];
    expect(createCsv(data)).toBe('text\n"Line 1\r\nLine 2"\n');
  });

  test('should handle custom delimiter', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    expect(createCsv(data, { delimiter: '\t' })).toBe('name\tage\nAlice\t30\nBob\t25\n');
  });

  test('should handle custom quote character', () => {
    const data = [{ name: "Smith's Store", value: 100 }];
    expect(createCsv(data, { quote: "'" })).toBe("name,value\n'Smith''s Store',100\n");
  });

  test('should handle custom line separator', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    expect(createCsv(data, { lineSeparator: '\n' })).toBe('name,age\nAlice,30\nBob,25\n');
  });

  test('should quote headers containing delimiter', () => {
    const data = [{ 'First, Name': 'Alice', 'Age': 30 }];
    expect(createCsv(data)).toBe('"First, Name",Age\nAlice,30\n');
  });

  test('should quote headers containing quote character', () => {
    const data = [{ 'Name "Alias"': 'Alice' }];
    expect(createCsv(data)).toBe('"Name ""Alias"""\nAlice\n');
  });

  test('should quote headers containing line separator characters', () => {
    const data = [{ 'First\nName': 'Alice' }];
    expect(createCsv(data)).toBe('"First\nName"\nAlice\n');
  });

  test('should handle multi-character delimiter', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    expect(createCsv(data, { delimiter: '||' })).toBe('name||age\nAlice||30\nBob||25\n');
  });

  test('should quote values containing multi-character delimiter', () => {
    const data = [{ text: 'A||B', value: 1 }];
    expect(createCsv(data, { delimiter: '||' })).toBe('text||value\n"A||B"||1\n');
  });

  test('should handle multi-character quote', () => {
    const data = [{ name: 'Alice', notes: 'Contains ## symbols' }];
    expect(createCsv(data, { quote: '##' })).toBe('name,notes\nAlice,##Contains #### symbols##\n');
  });

  test('should handle numeric values', () => {
    const data = [
      { name: 'Alice', age: 30, score: 95.5 },
      { name: 'Bob', age: 25, score: 87.3 },
    ];
    expect(createCsv(data)).toBe('name,age,score\nAlice,30,95.5\nBob,25,87.3\n');
  });

  test('should handle mixed string and number values', () => {
    const data = [{ id: 1, name: 'Product, Item', price: 19.99 }];
    expect(createCsv(data)).toBe('id,name,price\n1,"Product, Item",19.99\n');
  });

  test('should handle all options combined', () => {
    const data = [
      { name: 'Test##123', value: 100 },
      { name: 'Data', value: 200 },
    ];
    expect(
      createCsv(data, {
        delimiter: '||',
        quote: '##',
        lineSeparator: '\n',
        hasHeaders: true,
      }),
    ).toBe('name||value\n##Test####123##||100\nData||200\n');
  });

  test('should include trailing line separator', () => {
    const data = [{ name: 'Alice' }];
    const result = createCsv(data);
    expect(result.endsWith('\n')).toBeTrue();
  });

  test('should handle single row', () => {
    const data = [{ name: 'Alice', age: 30 }];
    expect(createCsv(data)).toBe('name,age\nAlice,30\n');
  });

  test('should handle single column', () => {
    const data = [{ name: 'Alice' }, { name: 'Bob' }];
    expect(createCsv(data)).toBe('name\nAlice\nBob\n');
  });

  test('should preserve column order from first object', () => {
    const data = [
      { age: 30, name: 'Alice' },
      { age: 25, name: 'Bob' },
    ];
    expect(createCsv(data)).toBe('age,name\n30,Alice\n25,Bob\n');
  });
});
