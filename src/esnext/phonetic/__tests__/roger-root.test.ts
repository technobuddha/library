import { rogerRoot as std } from '../../../../standards/roger-root.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { rogerRoot } from '../roger-root.ts';

describe('rogerRoot', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(rogerRoot(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('returns 5-character codes for valid input', () => {
    const result = rogerRoot('Smith');
    expect(result).toHaveLength(5);
    expect(result).toBe('00310');
  });

  test('produces identical codes for phonetically similar words', () => {
    // Classic phonetic similarity test
    expect(rogerRoot('Smith')).toBe(rogerRoot('Smyth'));
    expect(rogerRoot('Smith')).toBe('00310');
    expect(rogerRoot('Smyth')).toBe('00310');

    // C/K variation
    expect(rogerRoot('Catherine')).toBe(rogerRoot('Katherine'));
    expect(rogerRoot('Catherine')).toBe('07142');
    expect(rogerRoot('Katherine')).toBe('07142');
  });

  test('handles empty string', () => {
    const result = rogerRoot('');
    expect(result).toBe('');
  });

  test('handles single characters', () => {
    expect(rogerRoot('A')).toBe('10000');
    expect(rogerRoot('B')).toBe('09000');
    expect(rogerRoot('S')).toBe('00000');
  });

  test('handles special letter combinations correctly', () => {
    // SCH combination
    expect(rogerRoot('Schmidt')).toBe('06310');
    expect(rogerRoot('School')).toBe('06500');

    // SH combination
    expect(rogerRoot('Shine')).toBe('06200');
    expect(rogerRoot('Sharp')).toBe('06490');

    // PH combination
    expect(rogerRoot('Phone')).toBe('08200');
    expect(rogerRoot('Philip')).toBe('08590');

    // WR combination
    expect(rogerRoot('Wright')).toBe('04710');
    expect(rogerRoot('Write')).toBe('04100');

    // CH combination
    expect(rogerRoot('Church')).toBe('06460');
    expect(rogerRoot('Charles')).toBe('06450');
  });

  test('handles consonant clusters', () => {
    // KN combination
    expect(rogerRoot('Knight')).toBe('02710');
    expect(rogerRoot('Knife')).toBe('02800');

    // GN combination
    expect(rogerRoot('Gnome')).toBe('02300');

    // DG combination
    expect(rogerRoot('Edgar')).toBe('17400');

    // Multiple consonant patterns
    expect(rogerRoot('Pfinster')).toBe('08201');
  });

  test('handles vowels correctly', () => {
    // Vowels should map according to algorithm
    expect(rogerRoot('Apple')).toBe('19500');
    expect(rogerRoot('Eagle')).toBe('17500');
    expect(rogerRoot('Ice')).toBe('10000');
    expect(rogerRoot('Orange')).toBe('14270');
    expect(rogerRoot('Under')).toBe('12140');
  });

  test('handles case insensitive input', () => {
    expect(rogerRoot('smith')).toBe(rogerRoot('SMITH'));
    expect(rogerRoot('Johnson')).toBe(rogerRoot('johnson'));
    expect(rogerRoot('MixedCase')).toBe(rogerRoot('mixedcase'));
  });

  test('produces consistent results', () => {
    const input = 'Testing';
    const result1 = rogerRoot(input);
    const result2 = rogerRoot(input);
    const result3 = rogerRoot(input);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });

  test('handles special characters and numbers', () => {
    // Special characters should be ignored/removed
    expect(rogerRoot('Test-Name')).toBe('01012');
    expect(rogerRoot('Test123')).toBe('01010');
    expect(rogerRoot("O'Brian")).toBe('19420');
  });

  test('produces different codes for different sounds', () => {
    const codes = [
      rogerRoot('Smith'),
      rogerRoot('Jones'),
      rogerRoot('Williams'),
      rogerRoot('Brown'),
      rogerRoot('Davis'),
    ];

    // All should be different
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  test('handles long words correctly', () => {
    const longWord = 'Supercalifragilisticexpialidocious';
    const result = rogerRoot(longWord);

    expect(result).toHaveLength(5);
    expect(result).toMatch(/^\d{5}$/v); // Should be 5 digits
  });

  test('pads short codes correctly', () => {
    // Short inputs should be padded with 0s to 5 characters
    expect(rogerRoot('A')).toBe('10000');
    expect(rogerRoot('Be')).toBe('09000');
    expect(rogerRoot('Go')).toBe('07000');
  });

  test('handles specific algorithm patterns', () => {
    // Test specific transformations from the scanning table

    // CE pattern -> 0
    expect(rogerRoot('Fence')).toBe('08200');

    // CI pattern -> 0
    expect(rogerRoot('Circle')).toBe('00475');

    // CY pattern -> 0
    expect(rogerRoot('Cycle')).toBe('00750');

    // TS pattern -> 0
    expect(rogerRoot('Cats')).toBe('07000');

    // Multiple special patterns
    expect(rogerRoot('Psychology')).toBe('09065');
  });

  test('handles German-style combinations', () => {
    // TSCH combination
    expect(rogerRoot('Deutscher')).toBe('01640');

    // TSH combination
    expect(rogerRoot('Tshirt')).toBe('06410');

    // These patterns are common in Germanic names
    expect(rogerRoot('Tschaikovsky')).toBe('06780');
  });

  test('validates output format', () => {
    const testWords = ['Test', 'Name', 'Algorithm', 'Phonetic'];

    for (const word of testWords) {
      const result = rogerRoot(word);
      expect(result).toMatch(/^\d{5}$/v); // Should be exactly 5 digits
      expect(result).toHaveLength(5);
    }
  });

  test('handles accented characters', () => {
    // Should work with international characters
    expect(rogerRoot('José')).toBe('30000');
    expect(rogerRoot('François')).toBe('08427');
    expect(rogerRoot('Müller')).toBe('03540');
  });

  test('processes common name patterns', () => {
    // Test common surname patterns that genealogists encounter
    expect(rogerRoot('McDonald')).toBe('03712');
    expect(rogerRoot("O'Connor")).toBe('17240');
    expect(rogerRoot('Van Der Berg')).toBe('08214');
    expect(rogerRoot('De La Cruz')).toBe('01574');
  });

  test('handles silent letters and complex patterns', () => {
    // Words with patterns that should be handled by the algorithm
    expect(rogerRoot('Psychology')).toBe('09065'); // P + S should be handled
    expect(rogerRoot('Pneumonia')).toBe('02320'); // PN pattern
    expect(rogerRoot('Gnarly')).toBe('02450'); // GN pattern
  });

  test('performance with repeated calls', () => {
    const input = 'Performance';
    const iterations = 100;

    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(rogerRoot(input));
    }

    // All results should be identical
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBe(1);
  });

  test('boundary conditions', () => {
    // Test edge cases and boundary conditions

    // Single letters for each major category
    expect(rogerRoot('B')).toBe('09000'); // Consonant
    expect(rogerRoot('A')).toBe('10000'); // Vowel
    expect(rogerRoot('H')).toBe('20000'); // Special case

    // Very short meaningful words
    expect(rogerRoot('Go')).toBe('07000');
    expect(rogerRoot('No')).toBe('02000');
    expect(rogerRoot('We')).toBe('40000');
  });

  test('algorithm consistency across similar patterns', () => {
    // Test that similar patterns produce appropriately similar or different codes

    // Similar patterns should have some consistency
    const schWords = ['School', 'Scholar', 'Schedule'];
    const schCodes = schWords.map((word) => rogerRoot(word));

    // All should start with 06 (SCH pattern)
    for (const code of schCodes) {
      expect(code.startsWith('06')).toBeTrue();
    }

    // PH words
    const phWords = ['Phone', 'Philip', 'Phoenix'];
    const phCodes = phWords.map((word) => rogerRoot(word));

    // All should start with 08 (PH pattern)
    for (const code of phCodes) {
      expect(code.startsWith('08')).toBeTrue();
    }
  });

  test('real genealogical name variations', () => {
    // Test realistic name variations that genealogists encounter

    // Germanic variations
    expect(rogerRoot('Mueller')).toBe(rogerRoot('Müller'));
    expect(rogerRoot('Schmid')).toBe('06310');
    expect(rogerRoot('Schmidt')).toBe('06310');

    // Common English variations
    expect(rogerRoot('Thomson')).toBe('01302');
    expect(rogerRoot('Thompson')).toBe('01390');

    // These might be different due to the P in Thompson
    expect(rogerRoot('Thomson')).not.toBe(rogerRoot('Thompson'));
  });
});
