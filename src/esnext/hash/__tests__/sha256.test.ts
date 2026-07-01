/* eslint-disable no-secrets/no-secrets */
import { Sha256 } from '../sha256.ts';

describe('Sha256', () => {
  test('empty', () => {
    expect(new Sha256().digest('hex')).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });

  test('update with empty string', () => {
    expect(new Sha256().update('').digest('hex')).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });

  test('hex encoding', () => {
    expect(new Sha256().update('x').digest('hex')).toBe(
      '2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881',
    );
  });

  test('base64 encoding', () => {
    expect(new Sha256().update('x').digest('base64')).toBe(
      'LXEWQrcmsEQBYnyp+6wy9chTD7GQPMTbAiWHF5IaSIE=',
    );
  });

  test('base64url encoding', () => {
    expect(new Sha256().update('x').digest('base64url')).toBe(
      'LXEWQrcmsEQBYnyp-6wy9chTD7GQPMTbAiWHF5IaSIE',
    );
  });

  test('binary encoding', () => {
    expect(new Sha256().update('x').digest('binary')).toBe(
      '\u{2D}\u{71}\u{16}\u{42}\u{B7}\u{26}\u{B0}\u{44}\u{1}\u{62}\u{7C}\u{A9}\u{FB}\u{AC}\u{32}\u{F5}\u{C8}\u{53}\u{F}\u{B1}\u{90}\u{3C}\u{C4}\u{DB}\u{2}\u{25}\u{87}\u{17}\u{92}\u{1A}\u{48}\u{81}',
    );
  });

  test('hash encoding', () => {
    expect(Array.from(new Sha256().update('x').digest())).toStrictEqual([
      0x2d, 0x71, 0x16, 0x42, 0xb7, 0x26, 0xb0, 0x44, 0x01, 0x62, 0x7c, 0xa9, 0xfb, 0xac, 0x32,
      0xf5, 0xc8, 0x53, 0x0f, 0xb1, 0x90, 0x3c, 0xc4, 0xdb, 0x02, 0x25, 0x87, 0x17, 0x92, 0x1a,
      0x48, 0x81,
    ]);
  });

  test('update with long string', () => {
    expect(
      new Sha256()
        .update(
          'now is the time for all good men to come to the aid of their country and pay their due taxes',
        )
        .digest('hex'),
    ).toBe('ae3a06b106d13835c78013cf26582dbb80e3a54a22858b26c145ebee2f5d04f0');
  });

  test('update with full string', () => {
    expect(
      new Sha256()
        .update(
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        )
        .digest('hex'),
    ).toBe('b6ac3cc10386331c765f04f041c147d0f278f2aed8eaa021e2d0057fc6f6ff9e');
  });

  test('update with short strings', () => {
    expect(
      new Sha256()
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe('b6ac3cc10386331c765f04f041c147d0f278f2aed8eaa021e2d0057fc6f6ff9e');
  });
  test('update with small strings', () => {
    expect(
      new Sha256()
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe('b6ac3cc10386331c765f04f041c147d0f278f2aed8eaa021e2d0057fc6f6ff9e');
  });

  test('update with tiny strings', () => {
    expect(
      new Sha256()
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
    ).toBe('b6ac3cc10386331c765f04f041c147d0f278f2aed8eaa021e2d0057fc6f6ff9e');
  });
});
