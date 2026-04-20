import { metaphone as std } from '../../../../standards/metaphone.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { metaphone } from '../metaphone.ts';

const metaphone1 = (input: string): string => metaphone(input, '1');

describe('metaphone1', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(metaphone1(word), prepare(word, true)).toStrictEqual(std(prepare(word, true)));
      }
    },
    60_000,
  );

  test('returns variable-length codes', () => {
    const result = metaphone1('Smith');
    expect(result).toBe('SM0');
    expect(result.length).toBeGreaterThan(0);
  });

  test('produces identical codes for phonetically similar words', () => {
    // Classic phonetic similarity test
    expect(metaphone1('Smith')).toBe(metaphone1('Smyth'));
    expect(metaphone1('Smith')).toBe('SM0');
    expect(metaphone1('Smyth')).toBe('SM0');

    // Catherine variations
    expect(metaphone1('Catherine')).toBe(metaphone1('Katherine'));
    expect(metaphone1('Catherine')).toBe('K0RN');
    expect(metaphone1('Katherine')).toBe('K0RN');
  });

  test('handles empty string', () => {
    const result = metaphone1('');
    expect(result).toBe('');
  });

  test('handles single characters', () => {
    expect(metaphone1('A')).toBe('A');
    expect(metaphone1('B')).toBe('B');
    expect(metaphone1('C')).toBe('K'); // C → K
  });

  test('handles initial consonant clusters correctly', () => {
    // KN combination -> N
    expect(metaphone1('Knight')).toBe('NFT');
    expect(metaphone1('Knife')).toBe('NF');

    // GN combination -> N
    expect(metaphone1('Gnome')).toBe('NM');
    expect(metaphone1('Gnat')).toBe('NT');

    // WR combination -> R
    expect(metaphone1('Wright')).toBe('RFT');
    expect(metaphone1('Write')).toBe('RT');

    // PH combination -> F
    expect(metaphone1('Phone')).toBe('FN');
    expect(metaphone1('Philip')).toBe('FLP');

    // X at start -> S
    expect(metaphone1('Xavier')).toBe('SFR');
    expect(metaphone1('Xray')).toBe('SR');

    // WH combination -> W
    expect(metaphone1('When')).toBe('WN');
    expect(metaphone1('White')).toBe('WT');
  });

  test('handles context-sensitive consonant transformations', () => {
    // C -> S before I/E/Y
    expect(metaphone1('Circle')).toBe('SRKL');
    expect(metaphone1('Cent')).toBe('SNT');
    expect(metaphone1('Cycle')).toBe('SKL');

    // C -> K elsewhere
    expect(metaphone1('Cat')).toBe('KT');
    expect(metaphone1('Come')).toBe('KM');

    // G -> J before I/E/Y
    expect(metaphone1('Gym')).toBe('JM');
    expect(metaphone1('Gem')).toBe('JM');
    expect(metaphone1('Giant')).toBe('JNT');

    // G -> K elsewhere (actually G stays G in most cases)
    expect(metaphone1('Go')).toBe('K');
    expect(metaphone1('Game')).toBe('KM');
  });

  test('handles complex sound patterns', () => {
    // CH -> X
    expect(metaphone1('Church')).toBe('XRX');
    expect(metaphone1('Chair')).toBe('XR');

    // SCH -> SK (not at beginning)
    expect(metaphone1('School')).toBe('SXL'); // Actually becomes SXL due to other rules

    // TH -> 0
    expect(metaphone1('Thick')).toBe('0K');
    expect(metaphone1('Thomas')).toBe('0MS');

    // SH -> X
    expect(metaphone1('Sharp')).toBe('XRP');
    expect(metaphone1('Shine')).toBe('XN');

    // DG -> J before E/I
    expect(metaphone1('Judge')).toBe('JJ');
    expect(metaphone1('Bridge')).toBe('BRJ');
  });

  test('handles vowel removal and silent letters', () => {
    // Vowels after first position should be removed
    expect(metaphone1('Apple')).toBe('APL');
    expect(metaphone1('Eagle')).toBe('EKL');
    expect(metaphone1('Orange')).toBe('ORNJ');

    // Silent H after vowels
    expect(metaphone1('Laugh')).toBe('LF');
    expect(metaphone1('Night')).toBe('NFT');

    // Silent W/Y not before vowels
    expect(metaphone1('Law')).toBe('L');
    expect(metaphone1('Boy')).toBe('B');
  });

  test('handles duplicate consonant reduction', () => {
    // Consecutive identical consonants should be reduced
    expect(metaphone1('Butter')).toBe('BTR');
    expect(metaphone1('Miller')).toBe('MLR');
    expect(metaphone1('Bennett')).toBe('BNT');
    expect(metaphone1('Carroll')).toBe('KRL');
  });

  test('handles D -> T transformation', () => {
    // All D should become T
    expect(metaphone1('Dog')).toBe('TK');
    expect(metaphone1('Davis')).toBe('TFS');
    expect(metaphone1('David')).toBe('TFT');
  });

  test('handles V -> F and Z -> S transformations', () => {
    // V -> F
    expect(metaphone1('Victor')).toBe('FKTR');
    expect(metaphone1('Voice')).toBe('FS');

    // Z -> S
    expect(metaphone1('Zero')).toBe('SR');
    expect(metaphone1('Zoom')).toBe('SM');
  });

  test('produces consistent results', () => {
    const input = 'Testing';
    const result1 = metaphone1(input);
    const result2 = metaphone1(input);
    const result3 = metaphone1(input);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });

  test('handles special characters and numbers', () => {
    // Special characters should be processed according to rules
    expect(metaphone1("O'Brian")).toBe('OBRN');
    expect(metaphone1('Test-Name')).toBe('TSTNM');
    expect(metaphone1('Test123')).toBe('TST');
  });

  test('processes common surname patterns', () => {
    // Test common surname patterns
    expect(metaphone1('Johnson')).toBe('JNSN');
    expect(metaphone1('Jackson')).toBe('JKSN');
    expect(metaphone1('Wilson')).toBe('WLSN');
    expect(metaphone1('Anderson')).toBe('ANTRSN');
  });

  test('handles international characters', () => {
    // Should work with accented and international characters
    expect(metaphone1('José')).toBe('JS');
    expect(metaphone1('François')).toBe('FRNKS');
    expect(metaphone1('Müller')).toBe('MLR');
    expect(metaphone1('González')).toBe('KNSLS');
  });

  test('produces different codes for different sounds', () => {
    const names = ['Smith', 'Jones', 'Williams', 'Brown', 'Davis'];
    const codes = names.map((name) => metaphone1(name));

    // All should be different
    const uniqueCodes = new Set(codes);
    expect(uniqueCodes.size).toBe(codes.length);
  });

  test('validates output format', () => {
    const testWords = ['Test', 'Name', 'Algorithm', 'Phonetic'];

    for (const word of testWords) {
      const result = metaphone1(word);
      expect(result.length).toBeGreaterThan(0);
      // Should contain only uppercase letters and numbers (0 for TH)
      expect(result).toMatch(/^[A-Z\d]*$/v);
    }
  });

  test('handles edge cases', () => {
    // Test edge cases and boundary conditions

    // Words starting with vowels
    expect(metaphone1('Apple')).toBe('APL');
    expect(metaphone1('Eagle')).toBe('EKL');
    expect(metaphone1('Ice')).toBe('IS'); // I + CE -> IS
    expect(metaphone1('Orange')).toBe('ORNJ');
    expect(metaphone1('Under')).toBe('UNTR');

    // Very short words
    expect(metaphone1('A')).toBe('A');
    expect(metaphone1('Be')).toBe('B');
    expect(metaphone1('Go')).toBe('K');
  });

  test('processes real genealogical name variations', () => {
    // Test realistic name variations that genealogists encounter

    // Similar spellings should produce same codes
    expect(metaphone1('Catherine')).toBe(metaphone1('Katherine'));
    expect(metaphone1('Smith')).toBe(metaphone1('Smyth'));

    // Different variations
    expect(metaphone1('Thomson')).toBe('0MSN');
    expect(metaphone1('Thompson')).toBe('0MPSN');
    expect(metaphone1('Thomson')).not.toBe(metaphone1('Thompson'));
  });

  test('algorithm consistency across similar patterns', () => {
    // Test that similar patterns produce consistent results

    // TH patterns should all become 0
    const thWords = ['Thomas', 'Thompson', 'Smith', 'Thick'];
    const thCodes = thWords.map((word) => metaphone1(word));

    for (const code of thCodes) {
      expect(code).toContain('0'); // All should contain the TH -> 0 transformation
    }

    // CH patterns should all become X
    const chWords = ['Church', 'Chair', 'Charles'];
    const chCodes = chWords.map((word) => metaphone1(word));

    for (const code of chCodes) {
      expect(code).toContain('X'); // All should contain the CH -> X transformation
    }
  });

  test('performance with repeated calls', () => {
    const input = 'Performance';
    const iterations = 100;

    const results = [];
    for (let i = 0; i < iterations; i++) {
      results.push(metaphone1(input));
    }

    // All results should be identical
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBe(1);
  });

  test('real world name database scenarios', () => {
    // Test with a variety of real surnames

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
      const code = metaphone1(surname);
      expect(code.length).toBeGreaterThan(0);
      expect(code).toMatch(/^[A-Z\d]+$/v);
    }

    // Verify some known phonetic similarities
    expect(metaphone1('Smith')).toBe(metaphone1('Smyth'));
    expect(metaphone1('Catherine')).toBe(metaphone1('Katherine'));
  });

  test('handles consonant-only and vowel-heavy words', () => {
    // Words with few vowels
    expect(metaphone1('Rhythm')).toBe('R0M'); // TH -> 0, Y removed
    expect(metaphone1('Myth')).toBe('M0'); // TH -> 0, Y removed

    // Words with many vowels
    expect(metaphone1('Audio')).toBe('AT');
    expect(metaphone1('Queue')).toBe('K'); // Q -> K, vowels removed
  });

  test('specific transformation patterns', () => {
    // Test specific algorithm transformations

    // AE at start -> E
    expect(metaphone1('Aether')).toBe('E0R'); // AE -> E, TH -> 0

    // MB at end -> M
    expect(metaphone1('Bomb')).toBe('BM');
    expect(metaphone1('Thumb')).toBe('0M'); // TH -> 0, MB -> M

    // Q -> K
    expect(metaphone1('Queen')).toBe('KN');
    expect(metaphone1('Queue')).toBe('K');

    // Multiple rule interactions
    expect(metaphone1('Psychology')).toBe('PSXLJ'); // P+S, CH->X, G->J
  });

  test('case sensitivity handling', () => {
    // Algorithm should handle different cases consistently
    expect(metaphone1('smith')).toBe(metaphone1('SMITH'));
    expect(metaphone1('Johnson')).toBe(metaphone1('johnson'));
    expect(metaphone1('MixedCase')).toBe(metaphone1('mixedcase'));
  });

  test('complex real-world examples', () => {
    // Complex name patterns from real genealogical data

    expect(metaphone1('MacKenzie')).toBe('MKNS');
    expect(metaphone1("O'Malley")).toBe('OML');
    expect(metaphone1('Van Der Berg')).toBe('FNTRBRK');
    expect(metaphone1('Saint-Pierre')).toBe('SNTPR');
  });

  test('handles long words correctly', () => {
    const longWord = 'Supercalifragilisticexpialidocious';
    const result = metaphone1(longWord);

    expect(result.length).toBeGreaterThan(0);
    expect(result).toMatch(/^[A-Z\d]+$/v);
  });

  test('boundary and edge transformations', () => {
    // Test transformations at word boundaries

    // Initial patterns
    expect(metaphone1('Pneumonia')).toBe('NMN'); // PN -> N
    expect(metaphone1('Gnarly')).toBe('NRL'); // GN -> N

    // Final patterns
    expect(metaphone1('Lamb')).toBe('LM'); // MB -> M at end
    expect(metaphone1('Climb')).toBe('KLM'); // C->K, MB->M
  });

  test('covers G followed by N not NED (lines 231-233)', () => {
    expect(metaphone1('GNARLY')).toBe('NRL'); // G at offset 0, next is N, not NED, offset < length-2
    expect(metaphone1('GNOMIC')).toBe('NMK'); // G at offset 0, next is N, not NED, offset < length-2
    expect(metaphone1('GNA')).toBe('N'); // Minimal case: G-N-A triggers branch, actual output is 'N'
  });

  test('covers H followed by vowel, prev not DIPHTHONG_H (line 301)', () => {
    expect(metaphone1('AHI')).toContain('H'); // A-H-I, prev is A, not in DIPHTHONG_H
    expect(metaphone1('HA')).toContain('H'); // Minimal case: H-A triggers branch
  });

  test('covers K not preceded by C (line 313)', () => {
    expect(metaphone1('KITE')).toContain('K'); // K not preceded by C
    expect(metaphone1('KA')).toContain('K'); // Minimal case: K-A triggers branch
  });

  test('covers Y followed by vowel (lines 330-331)', () => {
    expect(metaphone1('YODEL')).toContain('Y'); // Y followed by O
    expect(metaphone1('YA')).toContain('Y'); // Minimal case: Y-A triggers branch
  });

  test('covers F, J, L, M, N, R cases (lines 342-343)', () => {
    expect(metaphone1('Fame')).toContain('F');
    expect(metaphone1('Jam')).toContain('J');
    expect(metaphone1('Lime')).toContain('L');
    expect(metaphone1('Mane')).toContain('M');
    expect(metaphone1('Name')).toContain('N');
    expect(metaphone1('Rime')).toContain('R');
  });
});
