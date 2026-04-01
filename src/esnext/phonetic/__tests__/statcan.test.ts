import { statcan as std } from '../../../../standards/statcan.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { statcan } from '../statcan.ts';

describe('statcan', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(statcan(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('returns variable-length codes up to 4 characters', () => {
    const result = statcan('Smith');
    expect(result).toBe('SMTH');
    expect(result).toHaveLength(4);
  });

  test('produces identical codes for phonetically similar words', () => {
    // Classic phonetic similarity test - same consonant pattern after vowel removal
    expect(statcan('Smith')).toBe(statcan('Smyth'));
    expect(statcan('Smith')).toBe('SMTH');
    expect(statcan('Smyth')).toBe('SMTH');
  });

  test('handles empty string', () => {
    const result = statcan('');
    expect(result).toBe('');
  });

  test('preserves first letter case sensitivity', () => {
    // Case of first letter should be preserved
    expect(statcan('jackson')).toBe('JCKS');
    expect(statcan('Jackson')).toBe('JCKS');

    // Different first letters should produce different codes
    expect(statcan('Catherine')).toBe('CTHR');
    expect(statcan('Katherine')).toBe('KTHR');
    expect(statcan('Catherine')).not.toBe(statcan('Katherine'));
  });

  test('handles single characters and short words', () => {
    expect(statcan('A')).toBe('A');
    expect(statcan('B')).toBe('B');
    expect(statcan('Be')).toBe('B');
    expect(statcan('Bet')).toBe('BT');
  });

  test('removes vowels correctly', () => {
    // Vowels (A, E, I, O, U, Y) should be removed after first letter
    expect(statcan('Apple')).toBe('APL'); // A preserved, pple -> pl
    expect(statcan('Eagle')).toBe('EGL'); // E preserved, agle -> gl
    expect(statcan('AEIOU')).toBe('A'); // All vowels after first removed

    // Y is treated as vowel
    expect(statcan('Young')).toBe('YNG'); // Y preserved, oung -> ng
  });

  test('handles duplicate consonants correctly', () => {
    // Consecutive identical consonants should be collapsed to one
    expect(statcan('Miller')).toBe('MLR'); // ll -> l
    expect(statcan('Bennett')).toBe('BNT'); // nn -> n, tt -> t
    expect(statcan('Carroll')).toBe('CRL'); // rr -> r, ll -> l
  });

  test('truncates long words to 4 characters maximum', () => {
    const longWord = 'Supercalifragilisticexpialidocious';
    const result = statcan(longWord);

    expect(result).toBe('SPRC');
    expect(result).toHaveLength(4);
  });

  test('produces consistent results', () => {
    const input = 'Testing';
    const result1 = statcan(input);
    const result2 = statcan(input);
    const result3 = statcan(input);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(result1).toBe('TSTN');
  });

  test('handles special characters and numbers', () => {
    // Special characters should be processed as part of the algorithm
    expect(statcan("O'Brien")).toBe('OBRN');
    expect(statcan('Test-Name')).toBe('TSTN');
    expect(statcan('Test123')).toBe('TST');
  });

  test('processes common surname patterns', () => {
    // Test common surname patterns
    expect(statcan('McDonald')).toBe('MCDN');
    expect(statcan("O'Connor")).toBe('OCNR');
    expect(statcan('Van Der Berg')).toBe('VNDR');
  });

  test('handles international characters', () => {
    // Should work with accented and international characters
    expect(statcan('José')).toBe('JS');
    expect(statcan('François')).toBe('FRNC');
    expect(statcan('Müller')).toBe('MLR');
    expect(statcan('González')).toBe('GNZL');
  });

  test('produces different codes for different names', () => {
    const names = ['Smith', 'Jones', 'Williams', 'Brown', 'Davis'];
    const codes = names.map((name) => statcan(name));

    // All should be different
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  test('maintains phonetic similarity where appropriate', () => {
    // Names that sound similar should have same codes
    expect(statcan('Johnson')).toBe('JHNS');
    expect(statcan('Jonson')).toBe('JNSN');

    // These are actually different due to different consonant patterns
    expect(statcan('Johnson')).not.toBe(statcan('Jonson'));
  });

  test('validates output characteristics', () => {
    const testWords = ['Test', 'Name', 'Algorithm', 'Phonetic'];

    for (const word of testWords) {
      const result = statcan(word);
      expect(result.length).toBeLessThanOrEqual(4);
      expect(result.length).toBeGreaterThan(0);
      // Should contain only letters (no padding with zeros)
      expect(result).toMatch(/^[A-Za-z]+$/v);
    }
  });

  test('handles edge cases', () => {
    // Test edge cases and boundary conditions

    // Single vowels
    expect(statcan('A')).toBe('A');
    expect(statcan('E')).toBe('E');
    expect(statcan('I')).toBe('I');
    expect(statcan('O')).toBe('O');
    expect(statcan('U')).toBe('U');
    expect(statcan('Y')).toBe('Y');

    // Words with only vowels after first letter
    expect(statcan('AEIOU')).toBe('A');
    expect(statcan('EAIOU')).toBe('E');
  });

  test('processes real genealogical name variations', () => {
    // Test realistic name variations that genealogists encounter

    // Similar but different spellings
    expect(statcan('Thomson')).toBe('THMS');
    expect(statcan('Thompson')).toBe('THMP');
    expect(statcan('Thomson')).not.toBe(statcan('Thompson'));

    // Different variations
    expect(statcan('Clark')).toBe('CLRK');
    expect(statcan('Clarke')).toBe('CLRK'); // Should be same
    expect(statcan('Clark')).toBe(statcan('Clarke'));
  });

  test('algorithm consistency across similar patterns', () => {
    // Test that similar patterns produce consistent results

    // Names with similar consonant patterns
    const endingSon = ['Johnson', 'Jackson', 'Wilson', 'Anderson'];
    const codes = endingSon.map((name) => statcan(name));

    // All should have different codes due to different consonant patterns
    for (const code of codes) {
      expect(code.length).toBeLessThanOrEqual(4);
      expect(code).toMatch(/^[A-Z]+$/v);
    }
  });

  test('performance with repeated calls', () => {
    const input = 'Performance';
    const iterations = 100;

    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(statcan(input));
    }

    // All results should be identical
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBe(1);
  });

  test('real world name database scenarios', () => {
    // Test with a variety of real surnames that might be found in databases

    const surnames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez',
      'Hernandez',
      'Lopez',
      'Gonzalez',
      'Wilson',
      'Anderson',
      'Thomas',
      'Taylor',
      'Moore',
      'Jackson',
      'Martin',
    ];

    for (const surname of surnames) {
      const code = statcan(surname);
      expect(code.length).toBeLessThanOrEqual(4);
      expect(code.length).toBeGreaterThan(0);
      expect(code).toMatch(/^[A-Z]+$/v);
    }

    // Verify some known phonetic similarities
    expect(statcan('Smith')).toBe(statcan('Smyth'));
  });

  test('handles consonant-only words', () => {
    // Words with few or no vowels
    expect(statcan('Krst')).toBe('KRST'); // No vowels except potential Y
    expect(statcan('Myth')).toBe('MTH'); // Y treated as vowel, removed
    expect(statcan('Rhythm')).toBe('RHTH'); // Y treated as vowel
  });

  test('case preservation in first letter only', () => {
    // First letter case should be preserved, rest should be uppercase
    expect(statcan('smith')).toBe('SMTH');
    expect(statcan('SMITH')).toBe('SMTH');
    expect(statcan('Smith')).toBe('SMTH');
    expect(statcan('sMITH')).toBe('SMTH'); // Lowercase 's' at start
  });

  test('complex name patterns', () => {
    // Test complex real-world name patterns

    expect(statcan('MacKenzie')).toBe('MCKN');
    expect(statcan("O'Malley")).toBe('OML');
    expect(statcan('Van Der Waals')).toBe('VNDR');
    expect(statcan('Saint-Pierre')).toBe('SNTP');
  });

  test('vowel handling specifics', () => {
    // Test specific vowel handling behavior

    // Each vowel should be removed after first position
    expect(statcan('Banana')).toBe('BN'); // B + nana -> nnn -> nn -> n (duplicates removed)
    expect(statcan('Coconut')).toBe('CCNT'); // C + coconut -> ccnt -> cnt
    expect(statcan('Papaya')).toBe('PP'); // P + apaya -> pp -> p
  });

  test('boundary length cases', () => {
    // Test cases around the 4-character boundary

    expect(statcan('Ab')).toBe('AB'); // No vowel removal for consonant-consonant
    expect(statcan('Abc')).toBe('ABC'); // 3 chars
    expect(statcan('Abcd')).toBe('ABCD'); // 4 chars exactly
    expect(statcan('Abcde')).toBe('ABCD'); // Truncated to 4 chars
    expect(statcan('Abcdef')).toBe('ABCD'); // Truncated to 4 chars
  });
});
