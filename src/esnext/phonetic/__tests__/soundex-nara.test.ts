import { soundexNara as std } from '../../../../standards/soundex-nara.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { soundex } from '../soundex.ts';

describe('soundex', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(soundex(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );
  test('handles empty string', () => {
    const result = soundex('');

    expect(result).toBe('');
  });

  test('generates correct codes for basic names', () => {
    expect(soundex('Robert')).toBe('R163');
    expect(soundex('Rupert')).toBe('R163');
    expect(soundex('Rubin')).toBe('R150');
    expect(soundex('Washington')).toBe('W252');
    expect(soundex('Lee')).toBe('L000');
    expect(soundex('Gutierrez')).toBe('G362');
  });

  test('handles case insensitivity', () => {
    expect(soundex('ROBERT')).toBe('R163');
    expect(soundex('robert')).toBe('R163');
    expect(soundex('RoBerT')).toBe('R163');
  });

  test('preserves first letter', () => {
    expect(soundex('Smith')).toBe('S530');
    expect(soundex('Smyth')).toBe('S530');
    expect(soundex('Johnson')).toBe('J525');
    expect(soundex('Jackson')).toBe('J250');
  });

  test('handles vowels correctly', () => {
    // Vowels are ignored except for first position
    expect(soundex('Aeiou')).toBe('A000');
    expect(soundex('Apple')).toBe('A140');
    expect(soundex('Orange')).toBe('O652');
  });

  test('handles H and W as separators', () => {
    // H and W don\'t get codes but act as separators
    expect(soundex('Ashcraft')).toBe('A226');
    expect(soundex('Burroughs')).toBe('B622');
    expect(soundex('Honeyman')).toBe('H555');
  });

  test('prevents consecutive duplicate codes', () => {
    // Adjacent letters with same code should produce single digit
    expect(soundex('Pfister')).toBe('P236');
    expect(soundex('Jackson')).toBe('J250');
    expect(soundex('Tymczak')).toBe('T522');
  });

  test('handles consonant groups correctly', () => {
    // Group 1: B, F, P, V - consecutive same codes collapse
    expect(soundex('Bfpv')).toBe('B000');

    // Group 2: C, G, J, K, Q, S, X, Z - consecutive same codes collapse
    expect(soundex('Cgjkqsxz')).toBe('C000');

    // Group 3: D, T - consecutive same codes collapse
    expect(soundex('Dt')).toBe('D000');

    // Group 4: L
    expect(soundex('Ll')).toBe('L000');

    // Group 5: M, N - consecutive same codes collapse
    expect(soundex('Mn')).toBe('M000');

    // Group 6: R
    expect(soundex('Rr')).toBe('R000');
  });

  test('pads short codes with zeros', () => {
    expect(soundex('A')).toBe('A000');
    expect(soundex('Ab')).toBe('A100');
    expect(soundex('Abc')).toBe('A120');
  });

  test('truncates long codes to 4 characters', () => {
    expect(soundex('Soundex')).toBe('S532');
    expect(soundex('Constitution')).toBe('C523');
  });

  test('handles single characters', () => {
    expect(soundex('A')).toBe('A000');
    expect(soundex('B')).toBe('B000');
    expect(soundex('Z')).toBe('Z000');
  });

  test('handles names starting with vowels', () => {
    expect(soundex('Adams')).toBe('A352');
    expect(soundex('Evans')).toBe('E152');
    expect(soundex('Iverson')).toBe('I162');
    expect(soundex('Olson')).toBe('O425');
    expect(soundex('Underwood')).toBe('U536');
  });

  test('handles names starting with H or W', () => {
    expect(soundex('Hansen')).toBe('H525');
    expect(soundex('Wilson')).toBe('W425');
    expect(soundex('Wright')).toBe('W623');
  });

  test('handles complex phonetic patterns', () => {
    // Names that should sound similar get same code
    expect(soundex('Peterson')).toBe('P362');
    expect(soundex('Petersen')).toBe('P362');

    expect(soundex('Johnson')).toBe('J525');
    expect(soundex('Jonson')).toBe('J525');
  });

  test('handles special edge cases', () => {
    // All vowels after consonant
    expect(soundex('Baeiouy')).toBe('B000');

    // Alternating consonants and vowels
    expect(soundex('Bababa')).toBe('B110');

    // Multiple H and W
    expect(soundex('Hwhwhw')).toBe('H000');
  });

  test('maintains standard Soundex compatibility', () => {
    // Classic Soundex test cases - verified against Maryland State Archives
    const testCases = [
      ['Honeyman', 'H555'],
      ['Levinson', 'L152'],
      ['Lukasiewicz', 'L222'],
      ['McDonnell', 'M235'],
      ["O'Hara", 'O600'],
      ['Pfister', 'P236'],
      ['Van de Berg', 'V531'],
    ];

    for (const [input, expected] of testCases) {
      expect(soundex(input)).toBe(expected);
    }
  });

  test('handles non-English characters gracefully', () => {
    // Characters not in the mapping should be ignored
    expect(soundex('José')).toBe('J200');
    expect(soundex('Müller')).toBe('M460');
    expect(soundex('Björk')).toBe('B262');
  });
});
