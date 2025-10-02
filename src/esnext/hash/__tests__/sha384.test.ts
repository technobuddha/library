/* eslint-disable no-secrets/no-secrets */
import { Sha384 } from '../sha384.ts';

describe('Sha384', () => {
  test('empty', () => {
    expect(new Sha384().digest('hex')).toBe(
      '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b',
    );
  });

  test('update with empty string', () => {
    expect(new Sha384().update('').digest('hex')).toBe(
      '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b',
    );
  });

  test('hex encoding', () => {
    expect(new Sha384().update('x').digest('hex')).toBe(
      'd752c2c51fba0e29aa190570a9d4253e44077a058d3297fa3a5630d5bd012622f97c28acaed313b5c83bb990caa7da85',
    );
  });

  test('base64 encoding', () => {
    expect(new Sha384().update('x').digest('base64')).toBe(
      '11LCxR+6DimqGQVwqdQlPkQHegWNMpf6OlYw1b0BJiL5fCisrtMTtcg7uZDKp9qF',
    );
  });

  test('base64url encoding', () => {
    expect(new Sha384().update('x').digest('base64url')).toBe(
      '11LCxR-6DimqGQVwqdQlPkQHegWNMpf6OlYw1b0BJiL5fCisrtMTtcg7uZDKp9qF',
    );
  });

  test('binary encoding', () => {
    expect(new Sha384().update('x').digest('binary')).toBe(
      '\u00d7\u0052\u00c2\u00c5\u001f\u00ba\u000e\u0029\u00aa\u0019\u0005\u0070\u00a9\u00d4\u0025\u003e\u0044\u0007\u007a\u0005\u008d\u0032\u0097\u00fa\u003a\u0056\u0030\u00d5\u00bd\u0001\u0026\u0022\u00f9\u007c\u0028\u00ac\u00ae\u00d3\u0013\u00b5\u00c8\u003b\u00b9\u0090\u00ca\u00a7\u00da\u0085',
    );
  });

  test('hash encoding', () => {
    expect(Array.from(new Sha384().update('x').digest())).toStrictEqual([
      0xd7, 0x52, 0xc2, 0xc5, 0x1f, 0xba, 0x0e, 0x29, 0xaa, 0x19, 0x05, 0x70, 0xa9, 0xd4, 0x25,
      0x3e, 0x44, 0x07, 0x7a, 0x05, 0x8d, 0x32, 0x97, 0xfa, 0x3a, 0x56, 0x30, 0xd5, 0xbd, 0x01,
      0x26, 0x22, 0xf9, 0x7c, 0x28, 0xac, 0xae, 0xd3, 0x13, 0xb5, 0xc8, 0x3b, 0xb9, 0x90, 0xca,
      0xa7, 0xda, 0x85,
    ]);
  });

  test('update with long string', () => {
    expect(
      new Sha384()
        .update(
          'now is the time for all good men to come to the aid of their country and pay their due taxes',
        )
        .digest('hex'),
    ).toBe(
      '2fd1ba748f4e464d07c9993335b1b2ff29288813577f4f87b256f15f276df44b69ef08f24211b333fc4a949a7a693065',
    );
  });

  test('update with full string', () => {
    expect(
      new Sha384()
        .update(
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        )
        .digest('hex'),
    ).toBe(
      'ef54e6d1cf5ad6043eb20f682df1e28aab50b6745f061b8a16460ab8d928f26b041ded5e0ea673c5b03dbb5548e82c07',
    );
  });

  test('update with short strings', () => {
    expect(
      new Sha384()
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .update('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .digest('hex'),
    ).toBe(
      'ef54e6d1cf5ad6043eb20f682df1e28aab50b6745f061b8a16460ab8d928f26b041ded5e0ea673c5b03dbb5548e82c07',
    );
  });
  test('update with small strings', () => {
    expect(
      new Sha384()
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
      'ef54e6d1cf5ad6043eb20f682df1e28aab50b6745f061b8a16460ab8d928f26b041ded5e0ea673c5b03dbb5548e82c07',
    );
  });

  test('update with tiny strings', () => {
    expect(
      new Sha384()
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
        .update('AA')
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
      'ef54e6d1cf5ad6043eb20f682df1e28aab50b6745f061b8a16460ab8d928f26b041ded5e0ea673c5b03dbb5548e82c07',
    );
  });
});
