/* eslint-disable no-secrets/no-secrets */
import { Sha256 } from './sha256.js';

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
      '\u002d\u0071\u0016\u0042\u00b7\u0026\u00b0\u0044\u0001\u0062\u007c\u00a9\u00fb\u00ac\u0032\u00f5\u00c8\u0053\u000f\u00b1\u0090\u003c\u00c4\u00db\u0002\u0025\u0087\u0017\u0092\u001a\u0048\u0081',
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
