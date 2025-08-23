/* eslint-disable no-secrets/no-secrets */
import { Sha224 } from './sha-224.ts';

describe('Sha224', () => {
  test('empty', () => {
    expect(new Sha224().digest('hex')).toBe(
      'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f',
    );
  });

  test('update with empty string', () => {
    expect(new Sha224().update('').digest('hex')).toBe(
      'd14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f',
    );
  });

  test('hex encoding', () => {
    expect(new Sha224().update('x').digest('hex')).toBe(
      '54a2f7f92a5f975d8096af77a126edda7da60c5aa872ef1b871701ae',
    );
  });

  test('base64 encoding', () => {
    expect(new Sha224().update('x').digest('base64')).toBe(
      //cspell:ignore VKL3+Spfl12Alq93oSbt2n2mDFqocu8bhxcBrg
      'VKL3+Spfl12Alq93oSbt2n2mDFqocu8bhxcBrg==',
    );
  });

  test('base64url encoding', () => {
    expect(new Sha224().update('x').digest('base64url')).toBe(
      'VKL3-Spfl12Alq93oSbt2n2mDFqocu8bhxcBrg',
    );
  });

  test('binary encoding', () => {
    expect(new Sha224().update('x').digest('binary')).toBe(
      '\u0054\u00a2\u00f7\u00f9\u002a\u005f\u0097\u005d\u0080\u0096\u00af\u0077\u00a1\u0026\u00ed\u00da\u007d\u00a6\u000c\u005a\u00a8\u0072\u00ef\u001b\u0087\u0017\u0001\u00ae',
    );
  });

  test('hash encoding', () => {
    expect(Array.from(new Sha224().update('x').digest())).toStrictEqual([
      0x54, 0xa2, 0xf7, 0xf9, 0x2a, 0x5f, 0x97, 0x5d, 0x80, 0x96, 0xaf, 0x77, 0xa1, 0x26, 0xed,
      0xda, 0x7d, 0xa6, 0x0c, 0x5a, 0xa8, 0x72, 0xef, 0x1b, 0x87, 0x17, 0x01, 0xae,
    ]);
  });

  test('update with long string', () => {
    expect(
      new Sha224()
        .update(
          'now is the time for all good men to come to the aid of their country and pay their due taxes',
        )
        .digest('hex'),
    ).toBe('e1fbffe4da92ee8bdfce757fd73c555747a9c474cc6095f3872449dc');
  });

  test('update with full string', () => {
    expect(
      new Sha224()
        .update(
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        )
        .digest('hex'),
    ).toBe('5860c4ca2aab22f16d20ec03f65fb91d30c52949ce9a103a4a493eb1');
  });

  test('update with short strings', () => {
    expect(
      new Sha224()
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe('5860c4ca2aab22f16d20ec03f65fb91d30c52949ce9a103a4a493eb1');
  });
  test('update with small strings', () => {
    expect(
      new Sha224()
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe('5860c4ca2aab22f16d20ec03f65fb91d30c52949ce9a103a4a493eb1');
  });

  test('update with tiny strings', () => {
    expect(
      new Sha224()
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
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
    ).toBe('5860c4ca2aab22f16d20ec03f65fb91d30c52949ce9a103a4a493eb1');
  });
});
