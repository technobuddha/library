import { identity } from '../identity.ts';

describe('identity', () => {
  test('returns the same value', () => {
    const value = { answer: 42 };

    expect(identity(value)).toBe(value);
    expect(identity('hello')).toBe('hello');
    expect(identity(0)).toBe(0);
    expect(identity(undefined)).toBeUndefined();
  });
});
