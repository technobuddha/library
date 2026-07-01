/* eslint-disable no-secrets/no-secrets */
import { Sha1 } from '../sha1.ts';

describe('Sha1', () => {
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
    expect(new Sha1().update('x').digest('base64')).toBe('EfatjsUqKYSrqv18O1FlA3hcIHI=');
  });

  test('base64url encoding', () => {
    expect(new Sha1().update('x').digest('base64url')).toBe('EfatjsUqKYSrqv18O1FlA3hcIHI');
  });

  test('binary encoding', () => {
    expect(new Sha1().update('x').digest('binary')).toBe(
      '\u{11}\u{F6}\u{AD}\u{8E}\u{C5}\u{2A}\u{29}\u{84}\u{AB}\u{AA}\u{FD}\u{7C}\u{3B}\u{51}\u{65}\u{3}\u{78}\u{5C}\u{20}\u{72}',
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

  test('update for overflow', () => {
    expect(
      new Sha1().update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA').digest('hex'),
    ).toBe('6b45e3cf1eb3324b9fd4df3b83d89c4c2c4ca896');
  });

  test('update with number array', () => {
    expect(new Sha1().update([1, 2, 3, 4, 5, 6]).digest('hex')).toBe(
      '5d211bad8f4ee70e16c7d343a838fc344a1ed961',
    );
  });

  test('update with Uint8Array', () => {
    expect(new Sha1().update(new Uint8Array([1, 2, 3, 4, 5, 6])).digest('hex')).toBe(
      '5d211bad8f4ee70e16c7d343a838fc344a1ed961',
    );
  });
});
