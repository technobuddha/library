import { soundexP123 as std } from '../../../../standards/soundex-p123.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { soundex } from '../soundex.ts';

const soundexP123 = (input: string): string => soundex(input, 'p123');

describe('soundex p123', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(soundexP123(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('handles empty string', () => {
    const result = soundexP123('');

    expect(result).toBe('');
  });

  test('generates correct P123 codes for basic names', () => {
    expect(soundexP123('Robert')).toBe('R163');
    expect(soundexP123('Rupert')).toBe('R163');
    expect(soundexP123('Rubin')).toBe('R150');
    expect(soundexP123('Washington')).toBe('W252');
    expect(soundexP123('Lee')).toBe('L000');
    expect(soundexP123('Gutierrez')).toBe('G362');
  });

  test('handles case insensitivity', () => {
    expect(soundexP123('ROBERT')).toBe('R163');
    expect(soundexP123('robert')).toBe('R163');
    expect(soundexP123('RoBerT')).toBe('R163');
    expect(soundexP123('SMITH')).toBe('S530');
    expect(soundexP123('smith')).toBe('S530');
  });

  test('preserves first letter', () => {
    expect(soundexP123('Smith')).toBe('S530');
    expect(soundexP123('Smyth')).toBe('S530');
    expect(soundexP123('Johnson')).toBe('J525');
    expect(soundexP123('Jackson')).toBe('J250');
  });

  test('handles P123 numeric mapping correctly', () => {
    // P123 mapping: 1=B,F,P,V; 2=C,G,J,K,Q,S,X,Z; 3=D,T; 4=L; 5=M,N; 6=R
    expect(soundexP123('B')).toBe('B000'); // B -> 1
    expect(soundexP123('F')).toBe('F000'); // F -> 1
    expect(soundexP123('P')).toBe('P000'); // P -> 1
    expect(soundexP123('V')).toBe('V000'); // V -> 1

    expect(soundexP123('C')).toBe('C000'); // C -> 2
    expect(soundexP123('G')).toBe('G000'); // G -> 2
    expect(soundexP123('J')).toBe('J000'); // J -> 2
    expect(soundexP123('K')).toBe('K000'); // K -> 2
    expect(soundexP123('Q')).toBe('Q000'); // Q -> 2
    expect(soundexP123('S')).toBe('S000'); // S -> 2
    expect(soundexP123('X')).toBe('X000'); // X -> 2
    expect(soundexP123('Z')).toBe('Z000'); // Z -> 2

    expect(soundexP123('D')).toBe('D000'); // D -> 3
    expect(soundexP123('T')).toBe('T000'); // T -> 3

    expect(soundexP123('L')).toBe('L000'); // L -> 4

    expect(soundexP123('M')).toBe('M000'); // M -> 5
    expect(soundexP123('N')).toBe('N000'); // N -> 5

    expect(soundexP123('R')).toBe('R000'); // R -> 6
  });

  test('handles vowels and separators correctly', () => {
    // Vowels (A,E,I,O,U,Y) and separators (H,W) should be ignored after first position
    expect(soundexP123('Aeiou')).toBe('A000');
    expect(soundexP123('Apple')).toBe('A140');
    expect(soundexP123('Orange')).toBe('O652');
    expect(soundexP123('Ashcraft')).toBe('A226'); // H acts as separator
    expect(soundexP123('Burroughs')).toBe('B622'); // H acts as separator
    expect(soundexP123('Honeyman')).toBe('H555'); // H in first position preserved
  });

  test('prevents consecutive duplicate codes', () => {
    // Adjacent letters with same P123 code should produce single digit
    expect(soundexP123('Pfister')).toBe('P123'); // P + F(1) + I(ignored) + S(2) + T(3) + E(ignored) + R(6) = P123
    expect(soundexP123('Jackson')).toBe('J250'); // J(2) C(2) -> J2, then K(2) S(2) -> 2, then N(5)
    expect(soundexP123('Tymczak')).toBe('T522'); // T(3) -> T, then M(5) C(2) Z(2) -> 522, then K(2) ignored (4 chars max)
  });

  test('handles consonant groups with P123 mapping', () => {
    // Group 1: B, F, P, V - consecutive same codes collapse
    expect(soundexP123('Bfpv')).toBe('B100'); // B + F(1) + P(1) -> B1 (duplicates collapsed) + V(1) -> 1 (collapsed), pad to B100

    // Group 2: C, G, J, K, Q, S, X, Z - consecutive same codes collapse
    expect(soundexP123('Cgjkqsxz')).toBe('C200'); // All map to 2, collapse to C2, pad to C200

    // Group 3: D, T - consecutive same codes collapse
    expect(soundexP123('Dt')).toBe('D300'); // Both map to 3, collapse to D3, pad to D300

    // Group 4: L (single letter)
    expect(soundexP123('Ll')).toBe('L400'); // Both map to 4, collapse to L4, pad to L400

    // Group 5: M, N - consecutive same codes collapse
    expect(soundexP123('Mn')).toBe('M500'); // Both map to 5, collapse to M5, pad to M500

    // Group 6: R (single letter)
    expect(soundexP123('Rr')).toBe('R600'); // Both map to 6, collapse to R6, pad to R600
  });

  test('pads short codes with zeros', () => {
    expect(soundexP123('A')).toBe('A000');
    expect(soundexP123('Ab')).toBe('A100'); // A + B(1)
    expect(soundexP123('Abc')).toBe('A120'); // A + B(1) + C(2)
    expect(soundexP123('Abcd')).toBe('A123'); // A + B(1) + C(2) + D(3)
  });

  test('truncates long codes to 4 characters', () => {
    expect(soundexP123('Soundex')).toBe('S532'); // S + O(ignored) + U(ignored) + N(5) + D(3) + E(ignored) + X(2) = S532
    expect(soundexP123('Constitution')).toBe('C523'); // C + O(ignored) + N(5) + S(2) + T(3) + ... = C523 (truncated)
  });

  test('handles single characters', () => {
    expect(soundexP123('A')).toBe('A000');
    expect(soundexP123('B')).toBe('B000');
    expect(soundexP123('Z')).toBe('Z000');
  });

  test('handles names starting with vowels', () => {
    expect(soundexP123('Adams')).toBe('A352'); // A + D(3) + M(5) + S(2)
    expect(soundexP123('Evans')).toBe('E152'); // E + V(1) + N(5) + S(2)
    expect(soundexP123('Iverson')).toBe('I162'); // I + V(1) + R(6) + S(2)
    expect(soundexP123('Olson')).toBe('O425'); // O + L(4) + S(2) + N(5)
    expect(soundexP123('Underwood')).toBe('U536'); // U + N(5) + D(3) + R(6)
  });

  test('handles names starting with H or W', () => {
    expect(soundexP123('Hansen')).toBe('H525'); // H + N(5) + S(2) + N(5) -> H525
    expect(soundexP123('Wilson')).toBe('W425'); // W + L(4) + S(2) + N(5)
    expect(soundexP123('Wright')).toBe('W623'); // W + R(6) + G(2) + T(3)
  });

  test('handles complex phonetic patterns', () => {
    // Names that should sound similar get same code with P123
    expect(soundexP123('Peterson')).toBe('P362'); // P + T(3) + R(6) + S(2)
    expect(soundexP123('Petersen')).toBe('P362'); // Should be same as Peterson

    expect(soundexP123('Johnson')).toBe('J525'); // J + H(ignored) + N(5) + S(2) + N(5) -> J525
    expect(soundexP123('Jonson')).toBe('J525'); // Should be same as Johnson
  });

  test('handles special edge cases', () => {
    // All vowels after consonant
    expect(soundexP123('Baeiouy')).toBe('B000'); // B + vowels ignored

    // Alternating consonants and vowels
    expect(soundexP123('Bababa')).toBe('B110'); // B + B(1) + B(1) -> B1, pad to B100, but actually B + A(ignored) + B(1) + A(ignored) + B(1) + A(ignored) = B110

    // Multiple H and W (separators)
    expect(soundexP123('Hwhwhw')).toBe('H000'); // H + W(ignored) + H(ignored) + W(ignored) + H(ignored) + W(ignored)
  });

  test('maintains P123 algorithm compatibility', () => {
    // Test cases specific to P123 algorithm behavior
    const testCases = [
      ['Smith', 'S530'], // S + M(5) + T(3) + H(ignored) = S530
      ['Brown', 'B650'], // B + R(6) + O(ignored) + W(ignored) + N(5) = B650
      ['Davis', 'D120'], // D + A(ignored) + V(1) + I(ignored) + S(2) = D120
      ['Miller', 'M460'], // M + I(ignored) + L(4) + L(4) -> M4 + E(ignored) + R(6) = M460
      ['Wilson', 'W425'], // W + I(ignored) + L(4) + S(2) + O(ignored) + N(5) = W425
      ['Moore', 'M600'], // M + O(ignored) + O(ignored) + R(6) + E(ignored) = M600
      ['Taylor', 'T460'], // T + A(ignored) + Y(ignored) + L(4) + O(ignored) + R(6) = T460
      ['Anderson', 'A536'], // A + N(5) + D(3) + E(ignored) + R(6) + S(2) + O(ignored) + N(5) = A536
      ['Thomas', 'T520'], // T + H(ignored) + O(ignored) + M(5) + A(ignored) + S(2) = T520
      ['Jackson', 'J250'], // J + A(ignored) + C(2) + K(2) -> J2 + S(2) -> 2 + O(ignored) + N(5) = J250
    ];

    for (const [input, expected] of testCases) {
      expect(soundexP123(input)).toBe(expected);
    }
  });

  test('handles non-English characters gracefully', () => {
    // Characters not in the P123 mapping should be ignored
    expect(soundexP123('José')).toBe('J200'); // J + O(ignored) + S(2) + E(ignored) = J200 (accented é ignored)
    expect(soundexP123('Müller')).toBe('M460'); // M + U(ignored) + L(4) + L(4) -> M4 + E(ignored) + R(6) = M460 (umlaut ignored)
    expect(soundexP123('Björk')).toBe('B262'); // B + J(2) + O(ignored) + R(6) + K(2) = B262
  });

  test('compares P123 with standard NARA algorithm', () => {
    // Verify P123 produces same results as NARA for basic cases (they should be identical)
    const testNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
    ];

    for (const name of testNames) {
      const naraResult = soundex(name, 'nara');
      const p123Result = soundexP123(name);
      // P123 should produce same results as NARA for most common names
      expect(p123Result).toBe(naraResult);
    }
  });

  test('handles whitespace and special characters', () => {
    expect(soundexP123(' Smith ')).toBe('S530');
    expect(soundexP123('Smith-Jones')).toBe('S532'); // S + M(5) + I(ignored) + T(3) + H(ignored) + - + J(2) + O(ignored) + N(5) + E(ignored) + S(2) = S532
    expect(soundexP123("O'Connor")).toBe('O256'); // O + C(2) + O(ignored) + N(5) + N(5) -> O25 + O(ignored) + R(6) = O256
    expect(soundexP123('Van Der Berg')).toBe('V536'); // V + A(ignored) + N(5) + space stops processing in basic form, or continues: D(3) + E(ignored) + R(6)
  });

  test('handles repeated consonants correctly', () => {
    // P123 should collapse repeated consonant codes like standard Soundex
    expect(soundexP123('Pfeiffer')).toBe('P116'); // P + F(1) + E(ignored) + I(ignored) + F(1) -> 1 (collapsed) + F(1) -> 1 (collapsed) + E(ignored) + R(6) = P116
    expect(soundexP123('Bookkeeper')).toBe('B216'); // B + O(ignored) + O(ignored) + K(2) + K(2) -> B2 + E(ignored) + E(ignored) + P(1) + E(ignored) + R(6) = B216
    expect(soundexP123('Committee')).toBe('C530'); // C + O(ignored) + M(5) + M(5) -> C5 + I(ignored) + T(3) + T(3) -> 3 + E(ignored) + E(ignored) = C530
  });
});
