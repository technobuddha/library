import { decodeVLQ } from '../decode-vlq.ts';

describe('decodeVLQ', () => {
  test('decodes zero', () => {
    expect(decodeVLQ('A')).toEqual([0]);
  });

  test('decodes positive integers', () => {
    expect(decodeVLQ('C')).toEqual([1]);
    expect(decodeVLQ('E')).toEqual([2]);
    expect(decodeVLQ('2H')).toEqual([123]);
  });

  test('decodes negative integers', () => {
    expect(decodeVLQ('D')).toEqual([-1]);
    expect(decodeVLQ('F')).toEqual([-2]);
  });

  test('decodes multiple values', () => {
    expect(decodeVLQ('AAAA')).toEqual([0, 0, 0, 0]);
    expect(decodeVLQ('ACAGD')).toEqual([0, 1, 0, 3, -1]);
  });

  test('decodes multi-byte VLQ groups', () => {
    expect(decodeVLQ('yBAAA')).toEqual([25, 0, 0, 0]);
    expect(decodeVLQ('6HAAA')).toEqual([125, 0, 0, 0]);
  });

  test('decodes the minimum signed integer', () => {
    expect(decodeVLQ('hgggggE')).toEqual([-2147483648]);
  });

  test('returns an empty array for an empty string', () => {
    expect(decodeVLQ('')).toEqual([]);
  });

  test('throws on invalid character', () => {
    expect(() => decodeVLQ('!')).toThrow('Invalid character (!)');
  });
});
