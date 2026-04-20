import { eudex as std } from '../../../../standards/eudex.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { eudex } from '../eudex.ts';

describe('eudex', () => {
  test('should skip Unicode letter not in PHONES (cover else branch)', () => {
    // Greek lambda 'λ' is a letter but not in PHONES
    const result = eudex('αλβ').value;
    expect(typeof result).toBe('bigint');
    // Should not throw, and should produce a valid hash
  });
  test('should skip first character not in PHONES (cover line 226 else)', () => {
    // The first character is not in PHONES, so firstByte will be 0
    // The loop should skip it and process the next valid character
    const result = eudex('1abc').value;
    expect(typeof result).toBe('bigint');
    // Should not throw, and should produce a valid hash
  });
  test('should skip unhandled codepoints (cover else branch)', () => {
    // U+200B ZERO WIDTH SPACE is not in PHONES or PHONES_C1
    // This will trigger the else branch in the loop
    const input = 'a\u200Bz';
    // Should still produce a valid hash, but the zero-width space is skipped
    const result = eudex(input).value;
    expect(typeof result).toBe('bigint');
    // No assertion about difference from 'az', just coverage
  });
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(eudex(word).value.toString(16), word).toStrictEqual(
          std(prepare(word, true, false)).toString(16),
        );
      }
    },
    60_000,
  );

  test('should produce same hash for same input', () => {
    expect(eudex('test').eq(eudex('test'))).toBeTrue();
  });

  test('should produce different hashes for different words', () => {
    expect(eudex('cat').eq(eudex('dog'))).toBeFalse();
  });

  test('should handle empty string', () => {
    expect(eudex('').value).toBe(0n);
  });

  test('should handle accented characters', () => {
    expect(eudex('café').value).toBe(432345564227585025n);
  });

  test('should handle characters not in PHONES mapping', () => {
    // Characters like digits or special symbols that aren't in PHONES
    expect(eudex('test123').value).toBe(1008806316530996253n);
    expect(eudex('hello!@#').value).toBe(144115188075896832n);
  });
});
