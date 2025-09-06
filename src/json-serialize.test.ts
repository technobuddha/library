import { jsonSerialize } from './json-serialize.ts';

describe('jsonSerialize', () => {
  test('serializes primitive values with delimiters', () => {
    expect(jsonSerialize(42)).toBe('⁅42⁆');
    expect(jsonSerialize('hello')).toBe('⁅"hello"⁆');
    expect(jsonSerialize(true)).toBe('⁅true⁆');
    expect(jsonSerialize(false)).toBe('⁅false⁆');
    expect(jsonSerialize(null)).toBe('⁅null⁆');
  });

  test('serializes arrays with delimiters', () => {
    expect(jsonSerialize([1, 2, 3])).toBe('⁅[1,2,3]⁆');
    expect(jsonSerialize(['a', 'b'])).toBe('⁅["a","b"]⁆');
    expect(jsonSerialize([])).toBe('⁅[]⁆');
  });

  test('serializes objects with sorted keys', () => {
    const input = { c: 3, a: 1, b: 2 };
    const result = jsonSerialize(input);
    expect(result).toBe('⁅{"a":1,"b":2,"c":3}⁆');
  });

  test('serializes nested objects with sorted keys', () => {
    const input = {
      z: 1,
      a: {
        d: 4,
        b: 2,
        c: 3,
      },
    };
    const result = jsonSerialize(input);
    expect(result).toBe('⁅{"a":{"b":2,"c":3,"d":4},"z":1}⁆');
  });

  test('serializes complex nested structures', () => {
    const input = {
      users: [
        { name: 'John', id: 2 },
        { name: 'Jane', id: 1 },
      ],
      config: {
        debug: true,
        apiUrl: 'https://api.example.com',
      },
    };
    const result = jsonSerialize(input);
    expect(result).toBe(
      '⁅{"config":{"apiUrl":"https://api.example.com","debug":true},"users":[{"id":2,"name":"John"},{"id":1,"name":"Jane"}]}⁆',
    );
  });

  test('handles empty objects', () => {
    expect(jsonSerialize({})).toBe('⁅{}⁆');
  });

  test('handles objects with special characters in keys', () => {
    const input = { 'key-with-dash': 1, 'key_with_underscore': 2, 'KEY': 3 };
    const result = jsonSerialize(input);
    expect(result).toBe('⁅{"KEY":3,"key_with_underscore":2,"key-with-dash":1}⁆');
  });
});
