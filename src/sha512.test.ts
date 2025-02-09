/* eslint-disable no-secrets/no-secrets */
import { Sha512 } from './sha512.js';

describe('Sha512', () => {
  test('empty', () => {
    expect(new Sha512().digest('hex')).toBe(
      'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
    );
  });

  test('update with empty string', () => {
    expect(new Sha512().update('').digest('hex')).toBe(
      'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
    );
  });

  test('hex encoding', () => {
    expect(new Sha512().update('x').digest('hex')).toBe(
      'a4abd4448c49562d828115d13a1fccea927f52b4d5459297f8b43e42da89238bc13626e43dcb38ddb082488927ec904fb42057443983e88585179d50551afe62',
    );
  });

  test('base64 encoding', () => {
    expect(new Sha512().update('x').digest('base64')).toBe(
      'pKvURIxJVi2CgRXROh/M6pJ/UrTVRZKX+LQ+QtqJI4vBNibkPcs43bCCSIkn7JBPtCBXRDmD6IWFF51QVRr+Yg==',
    );
  });

  test('base64url encoding', () => {
    expect(new Sha512().update('x').digest('base64url')).toBe(
      'pKvURIxJVi2CgRXROh_M6pJ_UrTVRZKX-LQ-QtqJI4vBNibkPcs43bCCSIkn7JBPtCBXRDmD6IWFF51QVRr-Yg',
    );
  });

  test('binary encoding', () => {
    expect(new Sha512().update('x').digest('binary')).toBe(
      '\u00a4\u00ab\u00d4\u0044\u008c\u0049\u0056\u002d\u0082\u0081\u0015\u00d1\u003a\u001f\u00cc\u00ea\u0092\u007f\u0052\u00b4\u00d5\u0045\u0092\u0097\u00f8\u00b4\u003e\u0042\u00da\u0089\u0023\u008b\u00c1\u0036\u0026\u00e4\u003d\u00cb\u0038\u00dd\u00b0\u0082\u0048\u0089\u0027\u00ec\u0090\u004f\u00b4\u0020\u0057\u0044\u0039\u0083\u00e8\u0085\u0085\u0017\u009d\u0050\u0055\u001a\u00fe\u0062',
    );
  });

  test('hash encoding', () => {
    expect(Array.from(new Sha512().update('x').digest())).toStrictEqual([
      0xa4, 0xab, 0xd4, 0x44, 0x8c, 0x49, 0x56, 0x2d, 0x82, 0x81, 0x15, 0xd1, 0x3a, 0x1f, 0xcc,
      0xea, 0x92, 0x7f, 0x52, 0xb4, 0xd5, 0x45, 0x92, 0x97, 0xf8, 0xb4, 0x3e, 0x42, 0xda, 0x89,
      0x23, 0x8b, 0xc1, 0x36, 0x26, 0xe4, 0x3d, 0xcb, 0x38, 0xdd, 0xb0, 0x82, 0x48, 0x89, 0x27,
      0xec, 0x90, 0x4f, 0xb4, 0x20, 0x57, 0x44, 0x39, 0x83, 0xe8, 0x85, 0x85, 0x17, 0x9d, 0x50,
      0x55, 0x1a, 0xfe, 0x62,
    ]);
  });

  test('update with long string', () => {
    expect(
      new Sha512()
        .update(
          'now is the time for all good men to come to the aid of their country and pay their due taxes',
        )
        .digest('hex'),
    ).toBe(
      'ba34f625776df6a223ddfa70f602c2d96e7f509e47e55ecf324dab6e8e862d12a622528819e737eba6f9a8b4239f7d7df0783e20c73a2f2c2cba15929bf7747e',
    );
  });

  test('update with full string', () => {
    expect(
      new Sha512()
        .update(
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        )
        .digest('hex'),
    ).toBe(
      '6486a74d95f54812a76071f6c6344ab6d34df3da685ec70dc78d9c5804b4ee3c449d9e68a6b52491f8275b838c2cd9102c3c223a620bbee2671edbff2611594e',
    );
  });

  test('update with short strings', () => {
    expect(
      new Sha512()
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe(
      '6486a74d95f54812a76071f6c6344ab6d34df3da685ec70dc78d9c5804b4ee3c449d9e68a6b52491f8275b838c2cd9102c3c223a620bbee2671edbff2611594e',
    );
  });
  test('update with small strings', () => {
    expect(
      new Sha512()
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe(
      '6486a74d95f54812a76071f6c6344ab6d34df3da685ec70dc78d9c5804b4ee3c449d9e68a6b52491f8275b838c2cd9102c3c223a620bbee2671edbff2611594e',
    );
  });

  test('update with tiny strings', () => {
    expect(
      new Sha512()
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
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
    ).toBe(
      '6486a74d95f54812a76071f6c6344ab6d34df3da685ec70dc78d9c5804b4ee3c449d9e68a6b52491f8275b838c2cd9102c3c223a620bbee2671edbff2611594e',
    );
  });
});
