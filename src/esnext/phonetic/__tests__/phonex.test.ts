import { phonex as std } from '../../../../standards/phonex.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { phonex } from '../phonex.ts';

describe('phonex', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(phonex(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('returns 4-character codes for valid input', () => {
    const result = phonex('Smith');
    expect(result).toHaveLength(4);
    expect(result).toBe('S530');
  });

  test('produces identical codes for phonetically similar words', () => {
    // Classic phonetic similarity test
    expect(phonex('Smith')).toBe(phonex('Smyth'));

    // K->C transformation
    expect(phonex('Catherine')).toBe(phonex('Katherine'));

    // Same phonetic structure
    expect(phonex('Johnson')).toBe(phonex('Jonsen'));
  });

  test('handles empty string', () => {
    const result = phonex('');
    expect(result).toBe('');
  });

  test('handles single characters', () => {
    expect(phonex('A')).toBe('A000');
    expect(phonex('B')).toBe('B000');
    expect(phonex('S')).toBe('0000'); // Single S gets transformed
  });

  test('applies initial letter transformations correctly', () => {
    // KN -> N transformation
    expect(phonex('Knight')).toBe('N230');
    expect(phonex('Knife')).toBe('N100');

    // PH -> F transformation
    expect(phonex('Phone')).toBe('F500');
    expect(phonex('Philip')).toBe('F410');

    // WR -> R transformation
    expect(phonex('Write')).toBe('R300');
    expect(phonex('Wright')).toBe('R230');

    // H removal at start
    expect(phonex('Henry')).toBe('A560');
    expect(phonex('Hello')).toBe('A400');
  });

  test('applies vowel transformations', () => {
    // Initial vowels -> A
    expect(phonex('Apple')).toBe('A140');
    expect(phonex('Eagle')).toBe('A240');
    expect(phonex('Ice')).toBe('A200');
    expect(phonex('Orange')).toBe('A650');
    expect(phonex('Under')).toBe('A560');
    expect(phonex('Yellow')).toBe('A400');
  });

  test('applies consonant transformations', () => {
    // K/Q -> C transformation
    expect(phonex('King')).toBe('C500');
    expect(phonex('Queen')).toBe('C500');

    // J -> G transformation
    expect(phonex('John')).toBe('G500');
    expect(phonex('James')).toBe('G500');

    // P -> B transformation
    expect(phonex('Peter')).toBe('B360');
    expect(phonex('Paul')).toBe('B400');

    // V -> F transformation
    expect(phonex('Victor')).toBe('F236');
    expect(phonex('Vincent')).toBe('F525');

    // Z -> S transformation
    expect(phonex('Zachary')).toBe('S260');
    expect(phonex('Zero')).toBe('S600');
  });

  test('handles consonant clusters correctly', () => {
    // L patterns
    expect(phonex('Language')).toBe('L520');
    expect(phonex('Letter')).toBe('L360');

    // R patterns
    expect(phonex('Robert')).toBe('R130');
    expect(phonex('Richard')).toBe('R230');

    // M/N patterns
    expect(phonex('Mountain')).toBe('M535');
    expect(phonex('National')).toBe('N354');
  });

  test('removes duplicate consecutive letters', () => {
    // Double letters should be reduced
    expect(phonex('Letter')).toBe('L360');
    expect(phonex('Hammer')).toBe('A560');
    expect(phonex('Balloon')).toBe('B450');
  });

  test('handles case insensitive input', () => {
    expect(phonex('smith')).toBe(phonex('SMITH'));
    expect(phonex('Johnson')).toBe(phonex('johnson'));
    expect(phonex('MixedCase')).toBe(phonex('mixedcase'));
  });

  test('produces consistent results', () => {
    const input = 'Testing';
    const result1 = phonex(input);
    const result2 = phonex(input);
    const result3 = phonex(input);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });

  test('handles special characters and numbers', () => {
    // Special characters should be ignored/removed
    expect(phonex('Test-Name')).toBe('T235');
    expect(phonex('Test123')).toBe('T230');
    expect(phonex("O'Brian")).toBe('A165');
  });

  test('produces different codes for different sounds', () => {
    const codes = [
      phonex('Smith'),
      phonex('Jones'),
      phonex('Williams'),
      phonex('Brown'),
      phonex('Davis'),
    ];

    // All should be different (not testing exact values since they depend on algorithm)
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  test('handles long words correctly', () => {
    const longWord = 'Supercalifragilisticexpialidocious';
    const result = phonex(longWord);

    expect(result).toHaveLength(4);
    expect(result[0]).toMatch(/[A-Z]/v); // First character should be a letter
    expect(result.slice(1)).toMatch(/^\d{3}$/v); // Remaining should be 3 digits
  });

  test('handles words with silent letters', () => {
    // Words with patterns that should be simplified
    expect(phonex('Psychology')).toBe('B242'); // PS -> B (P->B transformation)
    expect(phonex('Gnome')).toBe('G500'); // Initial G should remain
    expect(phonex('Lamb')).toBe('L510'); // Silent B at end -> L
  });

  test('applies D/T transformations', () => {
    // D/T + C combinations
    expect(phonex('Doctor')).toBe('D236');
    expect(phonex('Picture')).toBe('B236');

    // Regular D/T -> 3
    expect(phonex('David')).toBe('D130');
    expect(phonex('Thomas')).toBe('T500');
  });

  test('handles M/N + consonant patterns', () => {
    // M/N followed by D/G should remove the D/G
    expect(phonex('Sandwich')).toBe('S520');
    expect(phonex('Language')).toBe('L520');
  });

  test('removes trailing S patterns', () => {
    // Multiple S at end should be removed by priorRules
    expect(phonex('Business')).toBe('B250');
    expect(phonex('Address')).toBe('A360');
  });

  test('pads short codes correctly', () => {
    // Short inputs should be padded with 0s
    expect(phonex('A')).toBe('A000');
    expect(phonex('Be')).toBe('B000');
    expect(phonex('Go')).toBe('G000');
  });

  test('handles accented characters', () => {
    // Should work with international characters
    expect(phonex('José')).toBe('G200');
    expect(phonex('François')).toBe('F652');
    expect(phonex('Müller')).toBe('M460');
  });

  test('specific algorithm rule validation', () => {
    // Test specific transformations from the algorithm

    // Test that function produces valid codes with expected patterns
    expect(phonex('Book')).toBe('B200'); // B + digits
    expect(phonex('Fish')).toBe('F200'); // F + digits

    // Test first letter transformations work
    expect(phonex('Cat')).toMatch(/^C\d{3}$/v);
    expect(phonex('Good')).toMatch(/^G\d{3}$/v);

    // Test output format consistency
    expect(phonex('Door')).toMatch(/^[A-Z\d]\d{3}$/v);
    expect(phonex('Table')).toMatch(/^[A-Z\d]\d{3}$/v);
  });

  test('performance with repeated calls', () => {
    const input = 'Performance';
    const iterations = 100;

    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(phonex(input));
    }

    // All results should be identical
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBe(1);
  });
});
