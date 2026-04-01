import { soundD as std } from '../../../../standards/sound-d.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { soundD } from '../sound-d.ts';

describe('soundD', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(soundD(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('returns 4-character codes for valid input', () => {
    const result = soundD('Smith');
    expect(result).toHaveLength(4);
    expect(result).toBe('2530');
  });

  test('produces identical codes for phonetically similar words', () => {
    // Classic phonetic similarity test
    expect(soundD('Smith')).toBe(soundD('Smyth'));
    expect(soundD('Smith')).toBe('2530');
    expect(soundD('Smyth')).toBe('2530');

    // Johnson variations
    expect(soundD('Johnson')).toBe(soundD('Jonson'));
    expect(soundD('Johnson')).toBe('2525');
    expect(soundD('Jonson')).toBe('2525');
  });

  test('handles empty string', () => {
    const result = soundD('');
    expect(result).toBe('');
  });

  test('handles single characters', () => {
    expect(soundD('A')).toBe('0000');
    expect(soundD('B')).toBe('1000');
    expect(soundD('S')).toBe('2000');
  });

  test('handles initial consonant clusters correctly', () => {
    // KN combination -> N
    expect(soundD('Knight')).toBe('5300');
    expect(soundD('Knife')).toBe('5100');

    // GN combination -> N
    expect(soundD('Gnome')).toBe('5500');
    expect(soundD('Gnat')).toBe('5300');

    // PN combination -> N
    expect(soundD('Pneumonia')).toBe('5550');

    // WR combination -> R
    expect(soundD('Wright')).toBe('6300');
    expect(soundD('Write')).toBe('6300');

    // WH combination -> W
    expect(soundD('When')).toBe('5000');
    expect(soundD('White')).toBe('3000');

    // X at start -> S
    expect(soundD('Xavier')).toBe('2160');
    expect(soundD('Xray')).toBe('2600');

    // AC combination -> C
    expect(soundD('Accept')).toBe('2130');
  });

  test('handles special letter combinations', () => {
    // DG before E/I -> 2
    expect(soundD('Bridge')).toBe('1620');
    expect(soundD('Judge')).toBe('2200');
    expect(soundD('Fudge')).toBe('1200');

    // GH -> silent
    expect(soundD('Laugh')).toBe('4000');
    expect(soundD('Rough')).toBe('6000');
    expect(soundD('Night')).toBe('5300');
  });

  test('handles phonetic mappings correctly', () => {
    // Labial consonants (B, P, F, V) -> 1
    expect(soundD('Baker')).toBe('1260');
    expect(soundD('Peter')).toBe('1360');
    expect(soundD('Frank')).toBe('1652');
    expect(soundD('Victor')).toBe('1236');

    // Fricatives and sibilants (C, S, K, G, J, Q, X, Z) -> 2
    expect(soundD('Carter')).toBe('2636');
    expect(soundD('Scott')).toBe('2300');
    expect(soundD('King')).toBe('2520');
    expect(soundD('Garcia')).toBe('2620');

    // Dental/alveolar stops (D, T) -> 3
    expect(soundD('Davis')).toBe('3120');
    expect(soundD('Taylor')).toBe('3460');
    expect(soundD('Thomas')).toBe('3520');

    // Liquid L -> 4
    expect(soundD('Lewis')).toBe('4200');
    expect(soundD('Lopez')).toBe('4120');
    expect(soundD('Lee')).toBe('4000');

    // Nasals (M, N) -> 5
    expect(soundD('Miller')).toBe('5460');
    expect(soundD('Nelson')).toBe('5425');
    expect(soundD('Moore')).toBe('5600');

    // Liquid R -> 6
    expect(soundD('Roberts')).toBe('6163');
    expect(soundD('Rodriguez')).toBe('6362');
    expect(soundD('Robinson')).toBe('6152');
  });

  test('handles vowels and padding correctly', () => {
    // Vowels should be removed (mapped to 0 then removed)
    expect(soundD('Apple')).toBe('1400');
    expect(soundD('Eagle')).toBe('2400');
    expect(soundD('Ice')).toBe('2000');
    expect(soundD('Orange')).toBe('6520');
    expect(soundD('Under')).toBe('5360');

    // Short inputs should be padded with 0s to 4 characters
    expect(soundD('A')).toBe('0000');
    expect(soundD('Be')).toBe('1000');
    expect(soundD('Go')).toBe('2000');
  });

  test('handles case insensitive input', () => {
    expect(soundD('smith')).toBe(soundD('SMITH'));
    expect(soundD('Johnson')).toBe(soundD('johnson'));
    expect(soundD('MixedCase')).toBe(soundD('mixedcase'));
  });

  test('produces consistent results', () => {
    const input = 'Testing';
    const result1 = soundD(input);
    const result2 = soundD(input);
    const result3 = soundD(input);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });

  test('handles duplicate consonants correctly', () => {
    // Consecutive identical consonants should be collapsed to one
    expect(soundD('Miller')).toBe('5460'); // LL -> L
    expect(soundD('Bennett')).toBe('1530'); // NN -> N, TT -> T
    expect(soundD('Garrett')).toBe('2630'); // RR -> R, TT -> T
    expect(soundD('Bissett')).toBe('1230'); // SS -> S, TT -> T
  });

  test('produces different codes for different sounds', () => {
    const codes = [
      soundD('Smith'),
      soundD('Jones'),
      soundD('Williams'),
      soundD('Brown'),
      soundD('Davis'),
    ];

    // All should be different
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  test('handles long words correctly', () => {
    const longWord = 'Supercalifragilisticexpialidocious';
    const result = soundD(longWord);

    expect(result).toHaveLength(4);
    expect(result).toMatch(/^\d{4}$/v); // Should be 4 digits
  });

  test('validates output format', () => {
    const testWords = ['Test', 'Name', 'Algorithm', 'Phonetic'];

    for (const word of testWords) {
      const result = soundD(word);
      expect(result).toMatch(/^\d{4}$/v); // Should be exactly 4 digits
      expect(result).toHaveLength(4);
    }
  });

  test('handles special characters and numbers', () => {
    // Special characters should be ignored/removed
    expect(soundD("O'Brian")).toBe('1650');
    expect(soundD('Test-Name')).toBe('3235');
    expect(soundD('Test123')).toBe('3230');
    expect(soundD('José')).toBe('2200');
  });

  test('processes common surname patterns', () => {
    // Test common surname patterns
    expect(soundD('McDonald')).toBe('5235');
    expect(soundD("O'Connor")).toBe('2560');
    expect(soundD('Van Der Berg')).toBe('1536');
    expect(soundD('De La Cruz')).toBe('3426');
  });

  test('handles genealogical name variations', () => {
    // Test realistic name variations that genealogists encounter

    // Germanic variations
    expect(soundD('Schmidt')).toBe('2530');
    expect(soundD('Schmitt')).toBe('2530');

    // English variations
    expect(soundD('Thomson')).toBe('3525');
    expect(soundD('Thompson')).toBe('3512');

    // These should be different due to the P in Thompson
    expect(soundD('Thomson')).not.toBe(soundD('Thompson'));

    // Similar sounding but different spellings
    expect(soundD('Clark')).toBe('2462');
    expect(soundD('Clarke')).toBe('2462'); // Should be same
  });

  test('algorithm consistency across similar patterns', () => {
    // Test that similar patterns produce consistent results

    // Names ending in -son
    const sonNames = ['Johnson', 'Jackson', 'Wilson', 'Anderson'];
    const sonCodes = sonNames.map((name) => soundD(name));

    // All should end with similar patterns (not identical, but consistent mapping)
    for (const code of sonCodes) {
      expect(code).toMatch(/^\d{4}$/v);
    }

    // Names starting with similar sounds
    const smithNames = ['Smith', 'Smyth', 'Smithe'];
    const smithCodes = smithNames.map((name) => soundD(name));

    // Smith and Smyth should be identical
    expect(smithCodes[0]).toBe(smithCodes[1]);
  });

  test('boundary conditions', () => {
    // Test edge cases and boundary conditions

    // Single letters for each major category
    expect(soundD('B')).toBe('1000'); // Labial
    expect(soundD('C')).toBe('2000'); // Fricative
    expect(soundD('D')).toBe('3000'); // Dental
    expect(soundD('L')).toBe('4000'); // Liquid L
    expect(soundD('M')).toBe('5000'); // Nasal
    expect(soundD('R')).toBe('6000'); // Liquid R

    // Very short meaningful words
    expect(soundD('Go')).toBe('2000');
    expect(soundD('No')).toBe('5000');
    expect(soundD('We')).toBe('0000'); // W mapped to 0, then removed and padded
  });

  test('performance with repeated calls', () => {
    const input = 'Performance';
    const iterations = 100;

    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(soundD(input));
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
      const code = soundD(surname);
      expect(code).toMatch(/^\d{4}$/v);
      expect(code).toHaveLength(4);
    }

    // Verify some known phonetic similarities
    expect(soundD('Smith')).toBe(soundD('Smyth'));
    expect(soundD('Johnson')).toBe(soundD('Jonson'));
  });

  test('handles international characters', () => {
    // Should work with accented and international characters
    expect(soundD('José')).toBe('2200');
    expect(soundD('François')).toBe('1652');
    expect(soundD('Müller')).toBe('5460');
    expect(soundD('González')).toBe('2524');
  });

  test('algorithm-specific transformation patterns', () => {
    // Test specific transformations mentioned in the algorithm rules

    // Initial clusters
    expect(soundD('Knot')).toBe('5300'); // KN -> N
    expect(soundD('Gnaw')).toBe('5000'); // GN -> N
    expect(soundD('Psalm')).toBe('1245'); // PS -> S (P remains, S -> 2)
    expect(soundD('Write')).toBe('6300'); // WR -> R
    expect(soundD('Who')).toBe('0000'); // WH -> W -> 0 (removed and padded)

    // DG before E/I
    expect(soundD('Badge')).toBe('1200'); // DG before E -> 2
    expect(soundD('Fridge')).toBe('1620'); // DG before E -> 2

    // GH combinations
    expect(soundD('Sight')).toBe('2300'); // GH -> silent
    expect(soundD('Tough')).toBe('3000'); // GH -> silent
  });
});
