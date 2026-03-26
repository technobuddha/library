import { alphaSis as std } from '../../../../standards/alpha-sis.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { alphaSis } from '../alpha-sis.ts';

describe('alphaSis', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(alphaSis(word).sort(), word).toStrictEqual(std(prepare(word)));
      }
    },
    60_000,
  );

  test('returns array for all inputs', () => {
    const result = alphaSis('Smith');
    expect(result).toBeArray();
    expect(result.length).toBeGreaterThan(0);
  });

  test('returns multiple variants for words with phonetic alternatives', () => {
    // Words with 'C' should have multiple variants due to fork: ['7', '6']
    const result = alphaSis('Cat');
    expect(result).toBeArray();
    expect(result.length).toBeGreaterThan(1);

    // Each result should be a string
    for (const code of result) {
      expect(typeof code).toBe('string');
    }
  });

  test('handles empty string', () => {
    const result = alphaSis('');
    expect(result).toBeArray();
    expect(result).toHaveLength(0);
  });

  test('handles single characters', () => {
    const resultA = alphaSis('A');
    expect(resultA).toBeArray();
    expect(resultA.length).toBeGreaterThan(0);

    const resultB = alphaSis('B');
    expect(resultB).toBeArray();
    expect(resultB.length).toBeGreaterThan(0);
  });

  test('generates codes of correct length', () => {
    const result = alphaSis('Testing');
    for (const code of result) {
      expect(code.length).toBeLessThanOrEqual(14);
      expect(code.length).toBeGreaterThan(0);
    }
  });

  test('returns consistent results for same input', () => {
    const input = 'Johnson';
    const result1 = alphaSis(input);
    const result2 = alphaSis(input);

    expect(result1).toEqual(result2);
  });

  test('handles case insensitive input', () => {
    const lower = alphaSis('smith');
    const upper = alphaSis('SMITH');
    const mixed = alphaSis('Smith');

    // All should produce same results (case insensitive)
    expect(lower).toEqual(upper);
    expect(upper).toEqual(mixed);
  });

  test('handles special letter combinations', () => {
    // Test CH combination - should use specific rule
    const chResult = alphaSis('Church');
    expect(chResult).toBeArray();
    expect(chResult.length).toBeGreaterThan(0);

    // Test SCH combination - should use specific rule
    const schResult = alphaSis('School');
    expect(schResult).toBeArray();
    expect(schResult.length).toBeGreaterThan(0);

    // Test PH combination - should use specific rule
    const phResult = alphaSis('Phone');
    expect(phResult).toBeArray();
    expect(phResult.length).toBeGreaterThan(0);
  });

  test('handles vowels at start', () => {
    // Test various vowels that should map to specific codes
    const vowels = ['Apple', 'Elephant', 'Ice', 'Orange', 'Umbrella'];

    for (const word of vowels) {
      const result = alphaSis(word);
      expect(result).toBeArray();
      expect(result.length).toBeGreaterThan(0);
    }
  });

  test('handles consonant clusters', () => {
    // Test words with consonant clusters that have special rules
    const clusters = ['Knight', 'Psychology', 'Gnome', 'Write'];

    for (const word of clusters) {
      const result = alphaSis(word);
      expect(result).toBeArray();
      expect(result.length).toBeGreaterThan(0);
    }
  });

  test('handles numbers and special characters', () => {
    // Test with numbers - should be filtered out
    const result1 = alphaSis('Test123');
    expect(result1).toBeArray();

    // Test with special characters - should be filtered out
    const result2 = alphaSis('Test-Name');
    expect(result2).toBeArray();

    // Test with mixed - should be filtered out
    const result3 = alphaSis('A1B2C3!@#');
    expect(result3).toBeArray();
  });

  test('returns codes with expected format', () => {
    const result = alphaSis('Example');

    for (const code of result) {
      // Should contain only digits and possibly dashes
      expect(code).toMatch(/^[\d\-]+$/v);
    }
  });

  test('handles long inputs', () => {
    const longInput = 'Supercalifragilisticexpialidocious';
    const result = alphaSis(longInput);

    expect(result).toBeArray();
    expect(result.length).toBeGreaterThan(0);

    // Even long inputs should respect max length
    for (const code of result) {
      expect(code.length).toBeLessThanOrEqual(14);
    }
  });

  test('produces different codes for different inputs', () => {
    const result1 = alphaSis('Smith');
    const result2 = alphaSis('Jones');
    const result3 = alphaSis('Williams');

    // Different words should generally produce different codes
    expect(result1).not.toEqual(result2);
    expect(result2).not.toEqual(result3);
    expect(result1).not.toEqual(result3);
  });

  test('handles words with silent letters', () => {
    // Test words that have silent letters or special pronunciations
    const words = ['Knight', 'Psalm', 'Write', 'Gnome'];

    for (const word of words) {
      const result = alphaSis(word);
      expect(result).toBeArray();
      expect(result.length).toBeGreaterThan(0);
    }
  });

  test('produces unique codes in result array', () => {
    const result = alphaSis('Testing');
    const uniqueSet = new Set(result);

    // All codes in the result should be unique
    expect(uniqueSet.size).toBe(result.length);
  });

  test('handles accented characters', () => {
    // Test with accented characters (should be handled by phonetic function)
    const accentedWords = ['José', 'François', 'Müller'];

    for (const word of accentedWords) {
      const result = alphaSis(word);
      expect(result).toBeArray();
      expect(result.length).toBeGreaterThan(0);
    }
  });

  test('specific letter pattern behaviors', () => {
    // Test specific patterns mentioned in the algorithm

    // 'C' should have fork behavior
    const cResult = alphaSis('Cat');
    expect(cResult.length).toBeGreaterThan(1); // Should have multiple variants

    // 'CZ' should have multiple variants
    const czResult = alphaSis('Czar');
    expect(czResult.length).toBeGreaterThan(1);

    // 'DS' should have fork behavior
    const dsResult = alphaSis('Hudson');
    expect(dsResult).toBeArray();
  });

  test('performance with repeated calls', () => {
    const input = 'Performance';

    // Should produce consistent results across multiple calls
    const result1 = alphaSis(input);
    const result2 = alphaSis(input);
    const result3 = alphaSis(input);

    expect(result1).toEqual(result2);
    expect(result2).toEqual(result3);
  });
});
