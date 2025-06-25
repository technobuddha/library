import { encodeBinary } from './encode-binary.ts';

describe('encodeBinary', () => {
  test('base64', () => {
    expect(encodeBinary(new Uint8Array([0, 1, 2, 3]), 'base64')).toBe('AAECAw==');
  });

  test('base64Url', () => {
    expect(encodeBinary(new Uint8Array([0, 1, 2, 3]), 'base64url')).toBe('AAECAw');
  });

  test('hex', () => {
    expect(encodeBinary(new Uint8Array([0, 1, 2, 3]), 'hex')).toBe('00010203');
  });

  test('binary', () => {
    expect(encodeBinary(new Uint8Array([0, 1, 2, 3]), 'binary')).toBe('\u0000\u0001\u0002\u0003');
  });
});
