import { type JsonValue } from 'type-fest';

import { deserialize, serialize } from './json-serializer.ts';

describe('json-serializer', () => {
  describe('serialize', () => {
    test('serializes primitive values with delimiters', () => {
      expect(serialize(42)).toBe('⁅42⁆');
      expect(serialize('hello')).toBe('⁅"hello"⁆');
      expect(serialize(true)).toBe('⁅true⁆');
      expect(serialize(false)).toBe('⁅false⁆');
      expect(serialize(null)).toBe('⁅null⁆');
    });

    test('serializes arrays with delimiters', () => {
      expect(serialize([1, 2, 3])).toBe('⁅[1,2,3]⁆');
      expect(serialize(['a', 'b'])).toBe('⁅["a","b"]⁆');
      expect(serialize([])).toBe('⁅[]⁆');
    });

    test('serializes objects with sorted keys', () => {
      const input = { c: 3, a: 1, b: 2 };
      const result = serialize(input);
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
      const result = serialize(input);
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
      const result = serialize(input);
      expect(result).toBe(
        '⁅{"config":{"apiUrl":"https://api.example.com","debug":true},"users":[{"id":2,"name":"John"},{"id":1,"name":"Jane"}]}⁆',
      );
    });

    test('handles empty objects', () => {
      expect(serialize({})).toBe('⁅{}⁆');
    });

    test('handles objects with special characters in keys', () => {
      const input = { 'key-with-dash': 1, 'key_with_underscore': 2, 'KEY': 3 };
      const result = serialize(input);
      expect(result).toBe('⁅{"KEY":3,"key_with_underscore":2,"key-with-dash":1}⁆');
    });
  });

  describe('deserialize', () => {
    test('deserializes specially formatted JSON strings', () => {
      expect(deserialize('⁅42⁆')).toBe(42);
      expect(deserialize('⁅"hello"⁆')).toBe('hello');
      expect(deserialize('⁅true⁆')).toBeTrue();
      expect(deserialize('⁅false⁆')).toBeFalse();
      expect(deserialize('⁅null⁆')).toBeNull();
    });

    test('deserializes arrays from specially formatted strings', () => {
      expect(deserialize('⁅[1,2,3]⁆')).toEqual([1, 2, 3]);
      expect(deserialize('⁅["a","b"]⁆')).toEqual(['a', 'b']);
      expect(deserialize('⁅[]⁆')).toEqual([]);
    });

    test('deserializes objects from specially formatted strings', () => {
      const result = deserialize('⁅{"a":1,"b":2,"c":3}⁆');
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    test('deserializes nested objects from specially formatted strings', () => {
      const result = deserialize('⁅{"a":{"b":2,"c":3},"z":1}⁆');
      expect(result).toEqual({
        a: { b: 2, c: 3 },
        z: 1,
      });
    });

    test('returns non-specially-formatted strings as-is', () => {
      expect(deserialize('regular string')).toBe('regular string');
      expect(deserialize('⁅incomplete')).toBe('⁅incomplete');
      expect(deserialize('incomplete⁆')).toBe('incomplete⁆');
    });

    test('returns non-string values as-is', () => {
      expect(deserialize(42)).toBe(42);
      expect(deserialize(true)).toBeTrue();
      expect(deserialize(null)).toBeNull();
      expect(deserialize(undefined)).toBeUndefined();
      expect(deserialize({ key: 'value' })).toEqual({ key: 'value' });
      expect(deserialize([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('throws error for invalid JSON in specially formatted string', () => {
      expect(() => deserialize('⁅{invalid json}⁆')).toThrow();
      expect(() => deserialize('⁅⁆')).toThrow();
    });
  });

  describe('serialize and deserialize round trip', () => {
    const testCases: { name: string; value: JsonValue }[] = [
      { name: 'number', value: 42 },
      { name: 'string', value: 'hello world' },
      { name: 'boolean true', value: true },
      { name: 'boolean false', value: false },
      { name: 'null', value: null },
      { name: 'array', value: [1, 'two', true, null] },
      { name: 'empty array', value: [] },
      { name: 'simple object', value: { a: 1, b: 2 } },
      { name: 'empty object', value: {} },
      {
        name: 'complex nested structure',
        value: {
          users: [
            { name: 'John', age: 30 },
            { name: 'Jane', age: 25 },
          ],
          config: {
            debug: true,
            features: ['auth', 'logging'],
          },
          metadata: null,
        },
      },
    ];

    test.each(testCases)('round trip: $name', ({ value }) => {
      const serialized = serialize(value);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(value);
    });

    test('round trip preserves object key order after serialization', () => {
      const input = { z: 1, a: { d: 4, b: 2 }, m: 3 };
      const serialized = serialize(input);
      const deserialized = deserialize(serialized);

      // The deserialized object should have the same values
      expect(deserialized).toEqual({ z: 1, a: { d: 4, b: 2 }, m: 3 });

      // But the serialized form should have sorted keys
      expect(serialized).toBe('⁅{"a":{"b":2,"d":4},"m":3,"z":1}⁆');
    });
  });

  describe('edge cases', () => {
    test('handles strings that contain delimiter characters', () => {
      const input = 'This string contains ⁅ and ⁆ characters';
      const serialized = serialize(input);
      const deserialized = deserialize(serialized);
      expect(deserialized).toBe(input);
    });

    test('handles objects with delimiter characters in values', () => {
      const input = { message: 'Contains ⁅delimiters⁆ in value' };
      const serialized = serialize(input);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(input);
    });

    test('serialize handles deeply nested objects', () => {
      const input = {
        level1: {
          level2: {
            level3: {
              level4: {
                value: 'deep',
              },
            },
          },
        },
      };
      const serialized = serialize(input);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(input);
    });
  });
});
