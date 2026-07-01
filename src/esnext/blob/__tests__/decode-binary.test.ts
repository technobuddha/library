import { decodeBinary } from '../decode-binary.ts';

describe('decodeBinary', () => {
  test('base64', () => {
    expect(Array.from(decodeBinary('AAECAw==', 'base64'))).toStrictEqual([0, 1, 2, 3]);
  });

  test('base64url', () => {
    expect(Array.from(decodeBinary('AAECAw', 'base64url'))).toStrictEqual([0, 1, 2, 3]);
  });

  test('hex', () => {
    expect(Array.from(decodeBinary('00010203', 'hex'))).toStrictEqual([0, 1, 2, 3]);
  });

  test('binary', () => {
    expect(Array.from(decodeBinary('\u{0}\u{1}\u{2}\u{3}', 'binary'))).toStrictEqual([
      0, 1, 2, 3,
    ]);
  });
});
