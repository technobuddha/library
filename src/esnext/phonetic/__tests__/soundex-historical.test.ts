import { soundexHistorical as std } from '../../../../standards/soundex-historical.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { soundex } from '../soundex.ts';

const soundexHistorical = (input: string): string => soundex(input, 'historical');

describe('soundexHistorical', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(soundexHistorical(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('handles empty string', () => {
    const result = soundexHistorical('');

    expect(result).toBe('');
  });

  test('generates correct codes for basic names', () => {
    expect(soundexHistorical('Robert')).toBe('R163');
    expect(soundexHistorical('Rupert')).toBe('R163');
    expect(soundexHistorical('Rubin')).toBe('R150');
    expect(soundexHistorical('Washington')).toBe('W252');
    expect(soundexHistorical('Lee')).toBe('L000');
    expect(soundexHistorical('Gutierrez')).toBe('G362');
  });

  test('handles case insensitivity', () => {
    expect(soundexHistorical('ROBERT')).toBe('R163');
    expect(soundexHistorical('robert')).toBe('R163');
    expect(soundexHistorical('RoBerT')).toBe('R163');
  });

  test('preserves first letter', () => {
    expect(soundexHistorical('Smith')).toBe('S530');
    expect(soundexHistorical('Smyth')).toBe('S530');
    expect(soundexHistorical('Johnson')).toBe('J525');
    expect(soundexHistorical('Jackson')).toBe('J250');
  });

  test('handles vowels correctly', () => {
    // Vowels are ignored except for first position
    expect(soundexHistorical('Aeiou')).toBe('A000');
    expect(soundexHistorical('Apple')).toBe('A140');
    expect(soundexHistorical('Orange')).toBe('O652');
  });

  test('handles H and W as separators', () => {
    // H and W don\'t get codes but act as separators
    expect(soundexHistorical('Ashcraft')).toBe('A261');
    expect(soundexHistorical('Burroughs')).toBe('B620');
    expect(soundexHistorical('Honeyman')).toBe('H555');
  });

  test('prevents consecutive duplicate codes', () => {
    // Adjacent letters with same code should produce single digit
    expect(soundexHistorical('Pfister')).toBe('P236');
    expect(soundexHistorical('Jackson')).toBe('J250');
    expect(soundexHistorical('Tymczak')).toBe('T522');
  });

  test('handles consonant groups correctly', () => {
    // Group 1: B, F, P, V - consecutive same codes collapse
    expect(soundexHistorical('Bfpv')).toBe('B000');

    // Group 2: C, G, J, K, Q, S, X, Z - consecutive same codes collapse
    expect(soundexHistorical('Cgjkqsxz')).toBe('C000');

    // Group 3: D, T - consecutive same codes collapse
    expect(soundexHistorical('Dt')).toBe('D000');

    // Group 4: L
    expect(soundexHistorical('Ll')).toBe('L000');

    // Group 5: M, N - consecutive same codes collapse
    expect(soundexHistorical('Mn')).toBe('M000');

    // Group 6: R
    expect(soundexHistorical('Rr')).toBe('R000');
  });

  test('pads short codes with zeros', () => {
    expect(soundexHistorical('A')).toBe('A000');
    expect(soundexHistorical('Ab')).toBe('A100');
    expect(soundexHistorical('Abc')).toBe('A120');
  });

  test('truncates long codes to 4 characters', () => {
    expect(soundexHistorical('soundexSpecial')).toBe('S532');
    expect(soundexHistorical('Constitution')).toBe('C523');
  });

  test('handles single characters', () => {
    expect(soundexHistorical('A')).toBe('A000');
    expect(soundexHistorical('B')).toBe('B000');
    expect(soundexHistorical('Z')).toBe('Z000');
  });

  test('handles names starting with vowels', () => {
    expect(soundexHistorical('Adams')).toBe('A352');
    expect(soundexHistorical('Evans')).toBe('E152');
    expect(soundexHistorical('Iverson')).toBe('I162');
    expect(soundexHistorical('Olson')).toBe('O425');
    expect(soundexHistorical('Underwood')).toBe('U536');
  });

  test('handles names starting with H or W', () => {
    expect(soundexHistorical('Hansen')).toBe('H525');
    expect(soundexHistorical('Wilson')).toBe('W425');
    expect(soundexHistorical('Wright')).toBe('W623');
  });

  test('handles complex phonetic patterns', () => {
    // Names that should sound similar get same code
    expect(soundexHistorical('Peterson')).toBe('P362');
    expect(soundexHistorical('Petersen')).toBe('P362');

    expect(soundexHistorical('Johnson')).toBe('J525');
    expect(soundexHistorical('Jonson')).toBe('J525');
  });

  test('handles special edge cases', () => {
    // All vowels after consonant
    expect(soundexHistorical('Baeiouy')).toBe('B000');

    // Alternating consonants and vowels
    expect(soundexHistorical('Bababa')).toBe('B110');

    // Multiple H and W
    expect(soundexHistorical('Hwhwhw')).toBe('H000');
  });

  test('maintains standard soundexSpecial compatibility', () => {
    // Classic soundexSpecial test cases - verified against Maryland State Archives
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
      expect(soundexHistorical(input)).toBe(expected);
    }
  });

  test('handles non-English characters gracefully', () => {
    // Characters not in the mapping should be ignored
    expect(soundexHistorical('José')).toBe('J200');
    expect(soundexHistorical('Müller')).toBe('M460');
    expect(soundexHistorical('Björk')).toBe('B262');
  });
});
