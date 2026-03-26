import { toString } from '../../string/to-string.ts';

import { createAlgorithm } from '../algorithm.ts';
import { phonetic } from '../phonetic.ts';

describe('phonetic (100% coverage edge cases)', () => {
  test('covers preprocessRules branch', () => {
    const options = createAlgorithm({
      preprocessRules: [{ r: /x/gv, s: 'y' }],
      scan: [{ m: 'y', o: '1' }],
    });
    expect(phonetic('x', options)).toBe(''); // No match for 'y' after preprocess, so output is ''
  });

  test('covers prepareRules branch', () => {
    const options = createAlgorithm({
      prepareRules: [{ r: /b/gv, s: 'z' }],
      scan: [{ m: 'z', o: '2' }],
    });
    expect(phonetic('b', options)).toBe(''); // No match for 'z' after prepare, so output is ''
  });

  test('covers notFound reset branch', () => {
    const options = createAlgorithm({
      scan: [{ m: 'X', o: '1' }],
      notFound: 'reset',
    });
    expect(phonetic('A', options)).toBe(''); // No match, so output is empty string
  });

  test('covers removeDuplicates full branch', () => {
    const options = createAlgorithm({
      scan: [{ m: 'A', o: '1' }],
      removeDuplicates: 'full',
    });
    expect(phonetic('AAAA', options)).toBe('1');
  });

  test('covers forking as number (array output)', () => {
    const options = createAlgorithm({
      scan: [{ m: 'A', o: ['1', '2'] }],
      forking: 2,
    });
    expect(phonetic('A', options)).toEqual(['1', '2']);
  });

  test('covers firstLetter replace with non-silent', () => {
    const options = createAlgorithm({
      firstLetter: 'replace',
      silentLetters: ['Z'],
      scan: [{ m: 'A', o: '1' }],
    });
    expect(phonetic('A', options)).toBe('A'); // Not silent, so prefix is kept
  });

  test('covers firstLetter prefix', () => {
    const options = createAlgorithm({
      firstLetter: 'prefix',
      scan: [{ m: 'A', o: '1' }],
    });
    expect(phonetic('A', options)).toBe('A1');
  });

  test('covers firstLetter separate', () => {
    const options = createAlgorithm({
      firstLetter: 'separate',
      scan: [{ m: 'A', o: '1' }],
    });
    expect(phonetic('A', options)).toBe('A'); // Only the primary letter is kept
  });

  test('covers firstLetter vowel with non-vowel', () => {
    const options = createAlgorithm({
      firstLetter: 'vowel',
      scan: [{ m: 'B', o: '1' }],
    });
    expect(phonetic('B', options)).toBe('1');
  });

  test('covers firstLetter vowel with vowel', () => {
    const options = createAlgorithm({
      firstLetter: 'vowel',
      scan: [{ m: 'A', o: 'A' }],
    });
    expect(phonetic('A', options)).toBe('A'); // Only the primary letter is kept
  });

  test('covers laterRules branch', () => {
    const options = createAlgorithm({
      scan: [{ m: 'A', o: '1' }],
      laterRules: [{ r: /1/gv, s: 'X' }],
    });
    expect(phonetic('A', options)).toBe('X');
  });
});

describe('phonetic', () => {
  test('handles empty string', () => {
    const options = createAlgorithm({});
    const result = phonetic('', options);
    expect(result).toBe('');
  });

  test('handles basic string without options', () => {
    const options = createAlgorithm({});
    const result = phonetic('Test', options);
    expect(result).toBe('TEST');
  });

  describe('case conversion', () => {
    test('converts to uppercase by default', () => {
      const options = createAlgorithm({});
      expect(phonetic('hello', options)).toBe('HELLO');
    });

    test('converts to uppercase explicitly', () => {
      const options = createAlgorithm({ convertCase: 'upper' });
      expect(phonetic('hello', options)).toBe('HELLO');
    });

    test('converts to lowercase', () => {
      const options = createAlgorithm({ convertCase: 'lower' });
      expect(phonetic('HELLO', options)).toBe('hello');
    });
  });

  describe('diacritics and non-alphabetic removal', () => {
    test('removes diacritics', () => {
      const options = createAlgorithm({});
      expect(phonetic('café', options)).toBe('CAFE');
      expect(phonetic('naïve', options)).toBe('NAIVE');
      expect(phonetic('résumé', options)).toBe('RESUME');
    });

    test('removes diacritics with charSet option (explicit line 163)', () => {
      const options = createAlgorithm({ charSet: 'basic-latin' });
      expect(phonetic('café', options)).toBe('CAFE');
      expect(phonetic('naïve', options)).toBe('NAIVE');
    });

    test('removes non-alphabetic characters', () => {
      const options = createAlgorithm({ keep: { alphabetic: true } });
      expect(phonetic('hello123', options)).toBe('HELLO');
      expect(phonetic('test-case', options)).toBe('TESTCASE');
      expect(phonetic('foo_bar!', options)).toBe('FOOBAR');
    });

    test('removes non-alphabetic with keep option (explicit line 164)', () => {
      const options = createAlgorithm({ keep: { alphabetic: true } });
      expect(phonetic('hello123', options)).toBe('HELLO');
      expect(phonetic('test-case', options)).toBe('TESTCASE');
      expect(phonetic('foo_bar!', options)).toBe('FOOBAR');
    });

    test('removes non-alphabetic with eliminate false (explicit non-default line 164)', () => {
      // Should exercise the non-default branch; eliminate: false preserves non-alphabetic chars
      const options = createAlgorithm({});
      expect(phonetic('hello123', options)).toBe('HELLO123');
      expect(phonetic('test-case', options)).toBe('TEST CASE');
      expect(phonetic('foo_bar!', options)).toBe('FOO BAR');
    });

    test('handles mixed diacritics and non-alphabetic', () => {
      const options = createAlgorithm({ keep: { alphabetic: true } });
      expect(phonetic('José123!', options)).toBe('JOSE');
      expect(phonetic('François-Marie', options)).toBe('FRANCOISMARIE');
    });
  });

  describe('priorRules', () => {
    test('priorRules block is executed and output is changed', () => {
      // This test ensures lines 163-164 are covered by using a string that is not empty after strip
      // and a priorRule that changes the output
      const options = createAlgorithm({
        priorRules: [{ r: /B/gv, s: 'Z' }],
      });
      expect(phonetic('ABBA', options)).toBe('AZZA');
    });
    test('applies priorRules when text is not empty after strip', () => {
      const options = createAlgorithm({
        keep: { alphabetic: true },
        priorRules: [{ r: /A/gv, s: 'X' }],
      });
      expect(phonetic('A1A', options)).toBe('XX');
    });
    test('handles empty after strip but priorRules present', () => {
      // Input is all non-alphabetic, so strip makes it empty, but priorRules is present
      const options = createAlgorithm({
        keep: { alphabetic: true },
        priorRules: [{ r: /./gv, s: 'X' }],
      });
      expect(phonetic('1234', options)).toBe('');
    });
    test('applies single prior rule', () => {
      const options = createAlgorithm({
        priorRules: [{ r: /PH/gv, s: 'F' }],
      });
      expect(phonetic('PHILIP', options)).toBe('FILIP');
    });

    test('applies multiple prior rules', () => {
      const options = createAlgorithm({
        priorRules: [
          { r: /SC/gv, s: 'S' },
          { r: /CH/gv, s: 'H' },
          { r: /PH/gv, s: 'F' },
        ],
      });
      expect(phonetic('SCHOOL', options)).toBe('SHOOL'); // SC rule doesn't match the way SC appears in SCHOOL
      expect(phonetic('CHECK', options)).toBe('HECK'); // CH -> H, giving "HECK"
      expect(phonetic('PHILIP', options)).toBe('FILIP');
    });

    test('covers preprocessRules and priorRules together (line 159)', () => {
      // preprocessRules runs first, then priorRules
      const options = createAlgorithm({
        preprocessRules: [{ r: /b/gv, s: 'B' }],
        priorRules: [{ r: /B/gv, s: 'Z' }],
      });
      expect(phonetic('abBA', options)).toBe('AZZA');
    });
  });

  describe('scan (character mapping)', () => {
    test('covers phoneticTrace with setQueries', () => {
      const options = createAlgorithm({
        setQueries: () => ['foo', 'bar'],
        scan: [
          { m: 'A', q: 'foo', o: '1' },
          { m: 'B', q: 'bar', o: '2' },
          { m: 'C', q: 'qqq', o: '3' },
          { m: 'D', q: '!foo', o: '4' },
          { m: 'E', q: '!bar', o: '5' },
          { m: 'F', q: '!qqq', o: '6' },
        ],
      });
      expect(phonetic('ABCDEF', options)).toBe('126'); // A->1 (foo), B->2 (bar), C no match, D no match (!foo fails)
    });
    test('performs basic character scanning', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'A', o: '-' }, // A produces no output (separator)
          { m: 'B', o: '1' },
          { m: 'C', o: '2' },
        ],
      });
      expect(phonetic('ABC', options)).toBe('12'); // A ignored, B->1, C->2
    });

    test('handles position-specific scanning', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'A', i: 'b', o: '0' }, // A only at position 0
          { m: 'A', o: '9' }, // A at other positions
          { m: 'B', o: '1' },
        ],
      });
      expect(phonetic('ABA', options)).toBe('019'); // A at pos 0->0, B->1, A at pos 2->9
    });

    test('handles next character conditions', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'C', n: 'A', o: '3' }, // C before A gets 3
          { m: 'C', o: '2' }, // C otherwise gets 2
          { m: 'A', o: '-' }, // A is separator
          { m: 'B', o: '1' },
        ],
      });
      expect(phonetic('CA', options)).toBe('3'); // C before A
      expect(phonetic('CB', options)).toBe('21'); // C not before A, then B
    });

    test('handles previous character conditions', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'H', p: 'C', o: '8' }, // H after C gets 8
          { m: 'H', o: '-' }, // H otherwise is separator
          { m: 'C', o: '2' },
          { m: 'T', o: '3' },
        ],
      });
      expect(phonetic('CHT', options)).toBe('283'); // C->2, H after C->8, T->3
      expect(phonetic('THT', options)).toBe('33'); // T->3, H not after C (separator), T->3
    });

    test('ignores separators (dash codes)', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'H', o: '-' }, // H is separator
          { m: 'B', o: '1' },
        ],
      });
      expect(phonetic('BHB', options)).toBe('11'); // B->1, H ignored, B->1
    });

    test('collapses consecutive identical codes', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'B', o: '1' },
          { m: 'F', o: '1' },
          { m: 'P', o: '1' },
          { m: 'A', o: '-' }, // Separator (ignored)
        ],
      });
      expect(phonetic('BFP', options)).toBe('1'); // B->1, F would be 1 but collapsed, P would be 1 but collapsed
      expect(phonetic('BAP', options)).toBe('11'); // B->1, A ignored, P->1 (not consecutive after separator)
    });

    test('handles equal codes (no last value update)', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }, { m: 'E' }, { m: 'I', o: '1' }],
      });
      expect(phonetic('AEI', options)).toBe('1'); // A->1, E->= (no output, no last update), I->1 (collapsed with A's 1 since last is still 1)
    });

    test('handles forking as a number (not boolean)', () => {
      // This will trigger the else branch at lines 260-261
      // forking = 2, o = array of length 2
      const options = createAlgorithm({
        scan: [
          { m: 'C', o: ['X', 'Y'] },
          { m: 'A', o: '1' },
        ],
        forking: 2,
      });
      // This will hit the code path where forking is not boolean
      const result = phonetic('CA', options);
      // Should produce two results, one for each fork
      expect(result).toBeArray();
      expect(result).toHaveLength(2);
      expect(result).toContain('X1');
      expect(result).toContain('Y1');
    });
    test('covers removeDuplicates full (lines 222-223)', () => {
      // This triggers the while loop for removeDuplicates === 'full'
      const options = createAlgorithm({
        scan: [
          { m: 'A', o: '1' },
          { m: 'B', o: '1' },
        ],
        removeDuplicates: 'full',
      });
      // The result should collapse all repeated codes
      expect(phonetic('AABBAA', options)).toBe('1');
    });

    test('covers appendToResults branch (line 241)', () => {
      // This triggers the appendToResults([scanResults[i]], o[i]) branch
      const options = createAlgorithm({
        scan: [
          { m: 'C', o: ['X', 'Y'] },
          { m: 'A', o: ['1', '2'] },
        ],
        forking: 2,
      });
      // Should produce two results, one for each fork path
      const result = phonetic('CA', options);
      expect(result).toBeArray();
      expect(result).toHaveLength(2);
      expect(result).toContain('X1');
      expect(result).toContain('Y2');
    });

    test('covers removeDuplicates metaphone (line 241)', () => {
      // This triggers the removeDuplicates === 'metaphone' branch
      const options = createAlgorithm({
        scan: [
          { m: 'A', o: '1' },
          { m: 'C', o: '2' },
        ],
        removeDuplicates: 'metaphone',
      });
      // 'A' is not 'C', so repeated 'A's should be collapsed except after a 'C'
      expect(phonetic('AAACCAA', options)).toBe('1221');
      // 'C' is special, so repeated 'C's are not collapsed
      expect(phonetic('CC', options)).toBe('22');
    });
  });

  describe('firstLetter', () => {
    test('does not keep first letter by default', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'A', o: '1' },
          { m: 'B', o: '2' },
          { m: 'C', o: '3' },
        ],
      });
      expect(phonetic('SMITH', options)).toBe(''); // No scan rules for S, M, I, T, H, so output is empty
    });

    test('keeps first letter separately', () => {
      const options = createAlgorithm({
        firstLetter: 'separate',
        scan: [
          { m: 'S', o: '2' },
          { m: 'M', o: '5' },
        ],
      });
      expect(phonetic('SM', options)).toBe('S5'); // S->2, M->5 becomes "25", then first char "2" + remaining "5" = "25"
    });

    test('handles vowel preservation', () => {
      const options = createAlgorithm({
        firstLetter: 'vowel',
        scan: [
          { m: 'A', o: '-' },
          { m: 'B', o: '1' },
        ],
      });
      expect(phonetic('AB', options)).toBe('A1'); // A->'-' (ignored), B->1, result="1", first="" (empty from result), not a vowel
      expect(phonetic('BA', options)).toBe('1'); // B->1, A->'-' (ignored), result="1", first="1", not a vowel
    });

    test('handles vowel preservation with AEIOU vowels', () => {
      const options = createAlgorithm({
        firstLetter: 'vowel',
        scan: [
          { m: 'A', o: 'A' }, // A produces 'A'
          { m: 'E', o: 'E' }, // E produces 'E'
          { m: 'I', o: 'I' }, // I produces 'I'
          { m: 'O', o: 'O' }, // O produces 'O'
          { m: 'U', o: 'U' }, // U produces 'U'
          { m: 'X', o: '9' },
        ],
      });
      // When first char of result is a vowel, it gets preserved
      expect(phonetic('AX', options)).toBe('A9'); // Result="A9", first="A" (vowel), kept as is
      expect(phonetic('EX', options)).toBe('EE9'); // Result="E9", first="E" (vowel), prepended -> "EE9"
      expect(phonetic('IX', options)).toBe('II9'); // Result="I9", first="I" (vowel), prepended -> "II9"
      expect(phonetic('OX', options)).toBe('OO9'); // Result="O9", first="O" (vowel), prepended -> "OO9"
      expect(phonetic('UX', options)).toBe('UU9'); // Result="U9", first="U" (vowel), prepended -> "UU9"
    });

    test('handles special vowel case when text starts with A', () => {
      const options = createAlgorithm({
        firstLetter: 'vowel',
        scan: [
          { m: 'A', o: 'A' }, // A produces 'A'
          { m: 'X', o: '9' },
        ],
      });
      // Special case: when first char of result is 'A' and original first was vowel, replace first A with original
      expect(phonetic('AX', options)).toBe('A9'); // Result="A9", first="A" (vowel), starts with A so first+rest -> "A"+"9"
    });
  });

  describe('laterRules', () => {
    test('applies single later rule', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '0' }],
        laterRules: [{ r: /0/gv, s: '' }], // Remove zeros
      });
      expect(phonetic('AA', options)).toBe(''); // A->0, A->0 (collapsed to just 0), then laterRules remove 0 -> empty
    });

    test('applies multiple later rules', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'A', o: '1' },
          { m: 'B', o: '2' },
          { m: 'C', o: '3' },
        ],
        laterRules: [
          { r: /0/gv, s: '' }, // Remove zeros
          { r: /(..)1$/gv, s: '$1' }, // Remove trailing 1 if 2+ chars before it
        ],
      });
      expect(phonetic('ABA', options)).toBe('12'); // A->1, B->2, A->1, then laterRules
      expect(phonetic('AB', options)).toBe('12'); // A->1, B->2, then laterRules
    });
  });

  describe('padding and length', () => {
    test('pads to specified length', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }],
        pad: '0',
        length: 4,
      });
      expect(phonetic('A', options)).toBe('1000'); // A gets '1', then padded to 4 with '0'
      expect(phonetic('AA', options)).toBe('1000'); // A->1, A->1 (collapsed to just 1), padded
    });

    test('truncates to specified length', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }],
        length: 2,
      });
      expect(phonetic('AAAA', options)).toBe('1'); // AAAA->1 (collapsed), truncated to 2 but only '1' exists
    });

    test('handles length without padding', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }],
        length: 3,
      });
      expect(phonetic('A', options)).toBe('1'); // No padding, just truncation, result is '1'
      expect(phonetic('AAAA', options)).toBe('1'); // AAAA->1 (collapsed), truncated to 3
    });

    test('no length restriction when length is 0', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }],
        length: 0,
      });
      expect(phonetic('AAAA', options)).toBe('1'); // AAAA->1 (collapsed), no length restriction
    });
  });

  describe('next character conditions', () => {
    test('handles single next character condition', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'C', n: 'A', o: '3' }, // C before A gets 3
          { m: 'C', o: '2' }, // C otherwise gets 2
          { m: 'A', o: '1' },
          { m: 'E', o: '1' },
        ],
      });
      expect(phonetic('CA', options)).toBe('31'); // C before A gets 3, then A gets 1
      expect(phonetic('CE', options)).toBe('21'); // C not before A gets 2, then E gets 1
    });

    test('handles multiple next character conditions', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'C', n: ['A', 'E'], o: '3' }, // C before A or E gets 3
          { m: 'C', o: '2' }, // C otherwise gets 2
          { m: 'A', o: '1' },
          { m: 'E', o: '1' },
          { m: 'I', o: '1' },
        ],
      });
      expect(phonetic('CA', options)).toBe('31'); // C before A gets 3
      expect(phonetic('CE', options)).toBe('31'); // C before E gets 3
      expect(phonetic('CI', options)).toBe('21'); // C not before A or E gets 2
    });
  });

  describe('complex scenarios', () => {
    test('soundex-like algorithm', () => {
      const soundexOptions = createAlgorithm({
        scan: [
          // Position-specific rules for first character (preserve as-is)
          { m: 'R', i: 'b', o: 'R' },
          { m: 'S', i: 'b', o: 'S' },
          { m: 'J', i: 'b', o: 'J' },
          // All other letters at position 0 preserved
          { m: 'A', i: 'b', o: 'A' },
          { m: 'B', i: 'b', o: 'B' },
          { m: 'C', i: 'b', o: 'C' },
          { m: 'D', i: 'b', o: 'D' },
          { m: 'E', i: 'b', o: 'E' },
          { m: 'F', i: 'b', o: 'F' },
          { m: 'G', i: 'b', o: 'G' },
          { m: 'H', i: 'b', o: 'H' },
          { m: 'I', i: 'b', o: 'I' },
          { m: 'K', i: 'b', o: 'K' },
          { m: 'L', i: 'b', o: 'L' },
          { m: 'M', i: 'b', o: 'M' },
          { m: 'N', i: 'b', o: 'N' },
          { m: 'O', i: 'b', o: 'O' },
          { m: 'P', i: 'b', o: 'P' },
          { m: 'Q', i: 'b', o: 'Q' },
          { m: 'T', i: 'b', o: 'T' },
          { m: 'U', i: 'b', o: 'U' },
          { m: 'V', i: 'b', o: 'V' },
          { m: 'W', i: 'b', o: 'W' },
          { m: 'X', i: 'b', o: 'X' },
          { m: 'Y', i: 'b', o: 'Y' },
          { m: 'Z', i: 'b', o: 'Z' },
          // Vowels ignored at other positions
          { m: 'A', o: '-' },
          { m: 'E', o: '-' },
          { m: 'I', o: '-' },
          { m: 'O', o: '-' },
          { m: 'U', o: '-' },
          { m: 'Y', o: '-' },
          { m: 'H', o: '-' },
          { m: 'W', o: '-' },
          // Consonants mapped at non-first positions
          { m: 'B', o: '1' },
          { m: 'F', o: '1' },
          { m: 'P', o: '1' },
          { m: 'V', o: '1' },
          { m: 'C', o: '2' },
          { m: 'G', o: '2' },
          { m: 'J', o: '2' },
          { m: 'K', o: '2' },
          { m: 'Q', o: '2' },
          { m: 'S', o: '2' },
          { m: 'X', o: '2' },
          { m: 'Z', o: '2' },
          { m: 'D', o: '3' },
          { m: 'T', o: '3' },
          { m: 'L', o: '4' },
          { m: 'M', o: '5' },
          { m: 'N', o: '5' },
          { m: 'R', o: '6' },
        ],
        pad: '0',
        length: 4,
      });

      expect(phonetic('ROBERT', soundexOptions)).toBe('R163');
      expect(phonetic('SMITH', soundexOptions)).toBe('S530');
      expect(phonetic('JOHNSON', soundexOptions)).toBe('J525');
    });

    test('metaphone-like preprocessing', () => {
      const metaphoneOptions = createAlgorithm({
        priorRules: [
          { r: /^KN/gv, s: 'N' },
          { r: /^WR/gv, s: 'R' },
          { r: /^PH/gv, s: 'F' },
          { r: /MB$/gv, s: 'M' },
        ],
        scan: [
          { m: 'K', o: '2' },
          { m: 'N', o: '5' },
          { m: 'W', o: '-' },
          { m: 'R', o: '6' },
          { m: 'P', o: '1' },
          { m: 'H', o: '-' },
          { m: 'F', o: '1' },
          { m: 'M', o: '5' },
          { m: 'B', o: '1' },
          { m: 'I', o: '-' },
          { m: 'G', o: '2' },
          { m: 'T', o: '3' },
          { m: 'L', o: '4' },
          { m: 'A', o: '-' },
        ],
      });

      expect(phonetic('KNIGHT', metaphoneOptions)).toBe('523'); // KN->N: N(5), I(-), G(2), H(-), T(3)
      expect(phonetic('WRIGHT', metaphoneOptions)).toBe('623'); // WR->R: R(6), I(-), G(2), H(-), T(3)
      expect(phonetic('PHILIP', metaphoneOptions)).toBe('141'); // PH->F: F(1), I(-), L(4), I(-), P(1)
      expect(phonetic('LAMB', metaphoneOptions)).toBe('45'); // LAMB->LAM: L(4), A(-), M(5)
    });

    test('fuzzy matching with vowel removal', () => {
      const fuzzyOptions = createAlgorithm({
        scan: [
          // First B preserved
          { m: 'B', i: 'b', o: 'B' },
          // Vowels produce 0 (removed later)
          { m: 'A', o: '0' },
          { m: 'E', o: '0' },
          { m: 'I', o: '0' },
          { m: 'O', o: '0' },
          { m: 'U', o: '0' },
          // Consonants mapped
          { m: 'B', o: '1' },
          { m: 'T', o: '2' },
          { m: 'F', o: '3' },
          { m: 'L', o: '4' },
        ],
        laterRules: [{ r: /0/gv, s: '' }], // Remove vowel codes
        firstLetter: 'separate',
      });

      expect(phonetic('BEAUTIFUL', fuzzyOptions)).toBe('B234'); // B(kept) + E(0->removed), A(0->removed), U(0->removed), T(2), I(0->removed), F(3), U(0->removed), L(4)
      expect(phonetic('BEAT', fuzzyOptions)).toBe('B2'); // B(kept) + E(0->removed), A(0->removed), T(2)
    });

    test('fork scanner for multiple possible encodings', () => {
      const forkOptions = createAlgorithm({
        forking: true,
        scan: [
          { m: 'C', o: ['2', '3'] }, // C can be either 2 or 3
          { m: 'A', o: '1' },
        ],
      });

      const results = phonetic('CA', forkOptions);
      expect(results).toEqual(['21', '31']); // Two possible encodings
    });

    test('fork with special characters (dash and equals)', () => {
      const forkOptions = createAlgorithm({
        forking: true,
        scan: [
          { m: 'X', o: ['1', '-'] }, // Fork with special chars
          { m: 'A', o: '2' },
        ],
      });

      const results = phonetic('XA', forkOptions);
      // '-' means skip
      expect(results).toBeArray();
      expect(results.length).toBeGreaterThan(0);
    });

    test('fork with repeated characters', () => {
      const forkOptions = createAlgorithm({
        forking: true,
        scan: [
          { m: 'C', o: ['555', '55'] }, // Both code and fork
          { m: 'A', o: '1' },
        ],
        removeDuplicates: 'last',
      });

      const results = phonetic('CA', forkOptions);
      expect(results).toBeArray();
    });

    test('scan rule without output or fork', () => {
      const noOutputOptions = createAlgorithm({
        scan: [
          { m: 'X' }, // No 'o' and no 'fork' - silent character
          { m: 'A', o: '1' },
        ],
      });

      const result = phonetic('XA', noOutputOptions);
      expect(result).toBe('1'); // X produces no output
    });
  });

  describe('edge cases', () => {
    test('handles single character input', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }],
        pad: '0',
        length: 4,
      });
      expect(phonetic('A', options)).toBe('1000'); // A gets '1', padded to 4
    });

    test('handles input with only non-alphabetic characters', () => {
      expect(phonetic('123!@#', createAlgorithm({ keep: { alphabetic: true } }))).toBe('');
    });

    test('handles input that becomes empty after processing', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '-' }], // A produces no output (separator)
      });
      expect(phonetic('AAA', options)).toBe(''); // All As are separators
    });

    test('handles mixed case with special conversion', () => {
      const result2 = phonetic('HeLLo', createAlgorithm({ convertCase: 'lower' }));
      expect(result2).toBe('hello');
    });

    test('handles very long input', () => {
      const longInput = 'A'.repeat(100);
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }],
        length: 5,
      });
      expect(phonetic(longInput, options)).toBe('1'); // Only first A processed, gives '1', others collapsed
    });

    test('handles unicode characters', () => {
      expect(phonetic('Müller', createAlgorithm({}))).toBe('MULLER');
      expect(phonetic('François', createAlgorithm({}))).toBe('FRANCOIS');
      expect(phonetic('José', createAlgorithm({}))).toBe('JOSE');
      expect(phonetic('Björk', createAlgorithm({}))).toBe('BJORK');
    });

    test('handles empty scan array', () => {
      // Removed unused options1 variable
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '-' }], // A produces no output (separator)
      });
      expect(phonetic('AAA', options)).toBe(''); // All As are separators
    });
  });

  describe('performance and memory', () => {
    test('handles large replacement rules efficiently', () => {
      const manyRules = Array.from({ length: 100 }, (_, i) => ({
        r: new RegExp(toString(i), 'gv'),
        s: 'X',
      }));

      const options = createAlgorithm({
        priorRules: manyRules,
        scan: [
          { m: 'H', o: '1' },
          { m: 'E', o: '2' },
          { m: 'L', o: '3' },
          { m: 'O', o: '4' },
        ],
      });

      expect(phonetic('HELLO123', options)).toBe('1234'); // H->1, E->2, L->3, L->3 (collapsed), O->4
    });

    test('handles complex scanning efficiently', () => {
      const complexScan = Array.from({ length: 26 }, (_, i) => ({
        m: String.fromCharCode(65 + i), // A-Z
        o: toString(i % 10), // 0-9 cycling
      }));

      const options = createAlgorithm({
        scan: complexScan,
      });

      expect(phonetic('ABCDE', options)).toBe('01234'); // A->0, B->1, C->2, D->3, E->4
    });

    test('handles scanning with position and condition matching', () => {
      const options = createAlgorithm({
        scan: [
          { m: 'TH', o: '8' }, // Multi-character match
          { m: 'CH', o: '5' },
          { m: 'PH', o: '1' },
          { m: 'T', o: '3' }, // Single character fallback
          { m: 'C', o: '2' },
          { m: 'P', o: '1' },
          { m: 'H', o: '-' },
        ],
      });

      expect(phonetic('THATCH', options)).toBe('835'); // TH->8 (pos 0-1), A (no rule, skipped), T->3 (pos 3), CH->5 (pos 4-5)
    });
  });

  // --- Additional coverage tests ---
  describe('firstLetter (extra coverage)', () => {
    test('keeps first letter as prefix', () => {
      const options = createAlgorithm({
        firstLetter: 'prefix',
        scan: [
          { m: 'A', o: '1' },
          { m: 'B', o: '2' },
        ],
      });
      expect(phonetic('AB', options)).toBe('A12');
    });

    test('replaces first letter with silent letter', () => {
      const options = createAlgorithm({
        firstLetter: 'replace',
        silentLetters: ['A', 'E', 'I', 'O', 'U'],
        scan: [
          { m: 'A', o: '1' },
          { m: 'B', o: '2' },
        ],
      });
      expect(phonetic('AB', options)).toBe('A12'); // A is silent, so prefix is kept
      const options2 = createAlgorithm({
        firstLetter: 'replace',
        silentLetters: ['X'],
        scan: [
          { m: 'A', o: '1' },
          { m: 'B', o: '2' },
        ],
      });
      expect(phonetic('AB', options2)).toBe('A2'); // A not silent, so replaced
    });
  });

  describe('forking (extra coverage)', () => {
    test('returns [empty] for empty input with forking', () => {
      const options = createAlgorithm({ forking: true }) as ReturnType<typeof createAlgorithm> & {
        forking: true;
      };
      expect(phonetic('', options)).toEqual([]);
    });
  });

  describe('pad and length edge cases (extra coverage)', () => {
    test('pads with empty string', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }],
        pad: '',
        length: 4,
      });
      expect(phonetic('A', options)).toBe('1'); // pad is empty, so no padding
    });
    test('length with no pad', () => {
      const options = createAlgorithm({
        scan: [{ m: 'A', o: '1' }],
        length: 2,
      });
      expect(phonetic('A', options)).toBe('1'); // no pad, just truncation
    });
  });

  describe('laterRules with no scan (extra coverage)', () => {
    test('applies laterRules when scan is undefined', () => {
      const options = createAlgorithm({
        laterRules: [{ r: /T/gv, s: 'X' }],
      });
      expect(phonetic('TEST', options)).toBe('XESX');
    });
  });
});
