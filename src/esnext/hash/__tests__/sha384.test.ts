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
      '\u{D7}\u{52}\u{C2}\u{C5}\u{1F}\u{BA}\u{E}\u{29}\u{AA}\u{19}\u{5}\u{70}\u{A9}\u{D4}\u{25}\u{3E}\u{44}\u{7}\u{7A}\u{5}\u{8D}\u{32}\u{97}\u{FA}\u{3A}\u{56}\u{30}\u{D5}\u{BD}\u{1}\u{26}\u{22}\u{F9}\u{7C}\u{28}\u{AC}\u{AE}\u{D3}\u{13}\u{B5}\u{C8}\u{3B}\u{B9}\u{90}\u{CA}\u{A7}\u{DA}\u{85}',
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
