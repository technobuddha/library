/* eslint-disable no-secrets/no-secrets */
import { Crc32 } from './crc32.js';

describe('Crc32', () => {
  test('empty', () => {
    expect(new Crc32().digest('hex')).toBe('00000000');
  });

  test('update with empty string', () => {
    expect(new Crc32().update('').digest('hex')).toBe('00000000');
  });

  test('hex encoding', () => {1
    expect(new Crc32().update('x').digest('hex')).toBe('8cdc1683');
  });

  test('base64 encoding', () => {
    expect(new Crc32().update('x').digest('base64')).toBe('jNwWgw==');
  });

  test('base64url encoding', () => {
    expect(new Crc32().update('x').digest('base64url')).toBe('jNwWgw');
  });

  test('binary encoding', () => {
    expect(new Crc32().update('x').digest('binary')).toBe(
      '\u008c\u00dc\u0016\u0083',
    );
  });

  test('hash encoding', () => {
    expect(Array.from(new Crc32().update('x').digest())).toStrictEqual([
      0x8c, 0xdc, 0x16, 0x83
    ]);
  });

  test('update with long string', () => {
    expect(
      new Crc32()
        .update(
          'now is the time for all good men to come to the aid of their country and pay their due taxes',
        )
        .digest('hex'),
    ).toBe('c9d6b211');
  });

  test('update with full string', () => {
    expect(
      new Crc32()
        .update(
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        )
        .digest('hex'),
    ).toBe('04188ade');
  });

  test('update with short strings', () => {
    expect(
      new Crc32()
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe('04188ade');
  });
  test('update with small strings', () => {
    expect(
      new Crc32()
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe('04188ade');
  });

  test('update with tiny strings', () => {
    expect(
      new Crc32()
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .digest('hex'),
    ).toBe('04188ade');
  });
});
