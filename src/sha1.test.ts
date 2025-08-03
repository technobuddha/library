/* eslint-disable no-secrets/no-secrets */
import { Sha1 } from './sha1.ts';

describe('sha1', () => {
  test('empty', () => {
    expect(new Sha1().digest('hex')).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
  });

  test('update with empty string', () => {
    expect(new Sha1().update('').digest('hex')).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
  });

  test('hex encoding', () => {
    expect(new Sha1().update('x').digest('hex')).toBe('11f6ad8ec52a2984abaafd7c3b516503785c2072');
  });

  test('base64 encoding', () => {
    //cspell:ignore EfatjsUqKYSrqv18O1FlA3hcIHI
    expect(new Sha1().update('x').digest('base64')).toBe('EfatjsUqKYSrqv18O1FlA3hcIHI=');
  });

  test('base64url encoding', () => {
    expect(new Sha1().update('x').digest('base64url')).toBe('EfatjsUqKYSrqv18O1FlA3hcIHI');
  });

  test('binary encoding', () => {
    expect(new Sha1().update('x').digest('binary')).toBe(
      '\u0011\u00f6\u00ad\u008e\u00c5\u002a\u0029\u0084\u00ab\u00aa\u00fd\u007c\u003b\u0051\u0065\u0003\u0078\u005c\u0020\u0072',
    );
  });

  test('hash encoding', () => {
    expect(Array.from(new Sha1().update('x').digest())).toStrictEqual([
      0x11, 0xf6, 0xad, 0x8e, 0xc5, 0x2a, 0x29, 0x84, 0xab, 0xaa, 0xfd, 0x7c, 0x3b, 0x51, 0x65,
      0x03, 0x78, 0x5c, 0x20, 0x72,
    ]);
  });

  test('update with long string', () => {
    expect(
      new Sha1()
        .update(
          'now is the time for all good men to come to the aid of their country and pay their due taxes',
        )
        .digest('hex'),
    ).toBe('a040e606dc0e9b8e6486db6d95a947fb56831db9');
  });

  test('update with full string', () => {
    expect(
      new Sha1()
        .update(
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        )
        .digest('hex'),
    ).toBe('2927490ade868795ecdd8febe05214cbd243ef35');
  });

  test('update with short strings', () => {
    expect(
      new Sha1()
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe('2927490ade868795ecdd8febe05214cbd243ef35');
  });
  test('update with small strings', () => {
    expect(
      new Sha1()
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe('2927490ade868795ecdd8febe05214cbd243ef35');
  });

  test('update with tiny strings', () => {
    expect(
      new Sha1()
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
    ).toBe('2927490ade868795ecdd8febe05214cbd243ef35');
  });
});
