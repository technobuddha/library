import { soundexRefined as std } from '../../../../standards/soundex-refined.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { soundex } from '../soundex.ts';

const soundexRefined = (input: string): string => soundex(input, 'refined');

describe('soundexRefined', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(soundexRefined(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('handles empty string', () => {
    const result = soundexRefined('');

    expect(result).toBe('');
  });

  test('generates correct codes for basic names', () => {
    expect(soundexRefined('Robert')).toBe('R901096');
    expect(soundexRefined('Rupert')).toBe('R901096');
    expect(soundexRefined('Johnson')).toBe('J408308');
    expect(soundexRefined('Jackson')).toBe('J40308');
    expect(soundexRefined('Smith')).toBe('S38060');
  });

  test('handles case insensitivity', () => {
    expect(soundexRefined('ROBERT')).toBe('R901096');
    expect(soundexRefined('robert')).toBe('R901096');
    expect(soundexRefined('RoBerT')).toBe('R901096');
  });

  test('preserves first letter with numeric code', () => {
    expect(soundexRefined('Adams')).toBe('A06083');
    expect(soundexRefined('Evans')).toBe('E02083');
    expect(soundexRefined('Iverson')).toBe('I0209308');
    expect(soundexRefined('Olson')).toBe('O07308');
    expect(soundexRefined('Underwood')).toBe('U0860906');
  });

  test('handles vowels correctly', () => {
    // Vowels get code 0, consecutive duplicates collapse
    expect(soundexRefined('Aeiou')).toBe('A0');
    expect(soundexRefined('Apple')).toBe('A0170');
    expect(soundexRefined('Orange')).toBe('O090840');
  });

  test('handles H and W correctly', () => {
    // H and W get code 0
    expect(soundexRefined('Hansen')).toBe('H08308');
    expect(soundexRefined('Wilson')).toBe('W07308');
    expect(soundexRefined('Wright')).toBe('W090406');
  });

  test('prevents consecutive duplicate codes', () => {
    // Adjacent letters with same code should produce single digit
    expect(soundexRefined('Letter')).toBe('L70609');
    expect(soundexRefined('Better')).toBe('B10609');
    expect(soundexRefined('Butter')).toBe('B10609');
  });

  test('handles consonant groups correctly', () => {
    // Group 1: B, P - consecutive same codes collapse
    expect(soundexRefined('Bp')).toBe('B1');

    // Group 2: F, V - consecutive same codes collapse
    expect(soundexRefined('Fv')).toBe('F2');

    // Group 3: C, S, K - consecutive same codes collapse
    expect(soundexRefined('Csk')).toBe('C3');

    // Group 4: G, J - consecutive same codes collapse
    expect(soundexRefined('Gj')).toBe('G4');

    // Group 5: Q, X, Z - consecutive same codes collapse
    expect(soundexRefined('Qxz')).toBe('Q5');

    // Group 6: D, T - consecutive same codes collapse
    expect(soundexRefined('Dt')).toBe('D6');

    // Group 7: L
    expect(soundexRefined('Ll')).toBe('L7');

    // Group 8: M, N - consecutive same codes collapse
    expect(soundexRefined('Mn')).toBe('M8');

    // Group 9: R
    expect(soundexRefined('Rr')).toBe('R9');
  });

  test('handles single characters', () => {
    expect(soundexRefined('A')).toBe('A0');
    expect(soundexRefined('B')).toBe('B1');
    expect(soundexRefined('Z')).toBe('Z5');
  });

  test('handles complex phonetic patterns', () => {
    // Names that should sound similar get similar codes
    expect(soundexRefined('Peterson')).toBe('P10609308');
    expect(soundexRefined('Petersen')).toBe('P10609308');

    expect(soundexRefined('Pfister')).toBe('P1203609');
    expect(soundexRefined('Fisher')).toBe('F20309');
  });

  test('handles special edge cases', () => {
    // All vowels after consonant - consecutive 0s collapse
    expect(soundexRefined('Baeiouy')).toBe('B10');

    // Alternating consonants and vowels
    expect(soundexRefined('Bababa')).toBe('B101010');

    // Multiple H and W - consecutive 0s collapse
    expect(soundexRefined('Hwhwhw')).toBe('H0');
  });

  test('generates variable length codes', () => {
    // Unlike standard Soundex, refined can be any length
    expect(soundexRefined('Constitution')).toBe('C30836060608');
    expect(soundexRefined('Extraordinary')).toBe('E056909608090');
    expect(soundexRefined('Antidisestablishmentarianism')).toBe('A086060303601703080860908038');
  });

  test('handles mixed case consistently', () => {
    const testCases = [
      ['McDonald', 'M83608076'],
      ['mcDonald', 'M83608076'],
      ['MCDONALD', 'M83608076'],
      ['mcdonald', 'M83608076'],
    ];

    for (const [input, expected] of testCases) {
      expect(soundexRefined(input)).toBe(expected);
    }
  });

  test('maintains phonetic similarity', () => {
    // These should produce codes with similar patterns
    expect(soundexRefined('Catherine')).toBe('C30609080');
    expect(soundexRefined('Katherine')).toBe('K30609080');

    expect(soundexRefined('Steven')).toBe('S360208');
    expect(soundexRefined('Stephen')).toBe('S360108');

    expect(soundexRefined('Philip')).toBe('P10701');
    expect(soundexRefined('Phillip')).toBe('P10701');
  });

  test('handles non-English characters gracefully', () => {
    // Characters not in the mapping should be ignored
    expect(soundexRefined('José')).toBe('J4030');
    expect(soundexRefined('Müller')).toBe('M80709');
    expect(soundexRefined('Björk')).toBe('B14093');
  });
});
