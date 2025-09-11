import { type JsonValue } from 'type-fest';

import { jsonDeserialize } from './json-deserialize.ts';
import { jsonSerialize } from './json-serialize.ts';

describe('jsonDeserialize', () => {
  test('jsonDeserializes specially formatted JSON strings', () => {
    expect(jsonDeserialize('⁅42⁆')).toBe(42);
    expect(jsonDeserialize('⁅"hello"⁆')).toBe('hello');
    expect(jsonDeserialize('⁅true⁆')).toBeTrue();
    expect(jsonDeserialize('⁅false⁆')).toBeFalse();
    expect(jsonDeserialize('⁅null⁆')).toBeNull();
  });

  test('jsonDeserializes arrays from specially formatted strings', () => {
    expect(jsonDeserialize('⁅[1,2,3]⁆')).toEqual([1, 2, 3]);
    expect(jsonDeserialize('⁅["a","b"]⁆')).toEqual(['a', 'b']);
    expect(jsonDeserialize('⁅[]⁆')).toEqual([]);
  });

  test('jsonDeserializes objects from specially formatted strings', () => {
    const result = jsonDeserialize('⁅{"a":1,"b":2,"c":3}⁆');
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('jsonDeserializes nested objects from specially formatted strings', () => {
    const result = jsonDeserialize('⁅{"a":{"b":2,"c":3},"z":1}⁆');
    expect(result).toEqual({
      a: { b: 2, c: 3 },
      z: 1,
    });
  });

  test('returns non-specially-formatted strings as-is', () => {
    expect(jsonDeserialize('regular string')).toBe('regular string');
    expect(jsonDeserialize('⁅incomplete')).toBe('⁅incomplete');
    expect(jsonDeserialize('incomplete⁆')).toBe('incomplete⁆');
  });

  test('returns non-string values as-is', () => {
    expect(jsonDeserialize(42)).toBe(42);
    expect(jsonDeserialize(true)).toBeTrue();
    expect(jsonDeserialize(null)).toBeNull();
    expect(jsonDeserialize(undefined)).toBeUndefined();
    expect(jsonDeserialize({ key: 'value' })).toEqual({ key: 'value' });
    expect(jsonDeserialize([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('throws error for invalid JSON in specially formatted string', () => {
    expect(() => jsonDeserialize('⁅{invalid json}⁆')).toThrow();
    expect(() => jsonDeserialize('⁅⁆')).toThrow();
  });

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
    const serialized = jsonSerialize(value);
    const jsonDeserialized = jsonDeserialize(serialized);
    expect(jsonDeserialized).toEqual(value);
  });

  test('round trip preserves object key order after serialization', () => {
    const input = { z: 1, a: { d: 4, b: 2 }, m: 3 };
    const serialized = jsonSerialize(input);
    const jsonDeserialized = jsonDeserialize(serialized);

    // The jsonDeserialized object should have the same values
    expect(jsonDeserialized).toEqual({ z: 1, a: { d: 4, b: 2 }, m: 3 });

    // But the serialized form should have sorted keys
    expect(serialized).toBe('⁅{"a":{"b":2,"d":4},"m":3,"z":1}⁆');
  });

  test('handles strings that contain delimiter characters', () => {
    const input = 'This string contains ⁅ and ⁆ characters';
    const serialized = jsonSerialize(input);
    const jsonDeserialized = jsonDeserialize(serialized);
    expect(jsonDeserialized).toBe(input);
  });

  test('handles objects with delimiter characters in values', () => {
    const input = { message: 'Contains ⁅delimiters⁆ in value' };
    const serialized = jsonSerialize(input);
    const jsonDeserialized = jsonDeserialize(serialized);
    expect(jsonDeserialized).toEqual(input);
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
    const serialized = jsonSerialize(input);
    const jsonDeserialized = jsonDeserialize(serialized);
    expect(jsonDeserialized).toEqual(input);
  });
});
