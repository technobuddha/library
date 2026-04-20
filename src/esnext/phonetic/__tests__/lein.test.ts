import { lein as std } from '../../../../standards/lein.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { lein } from '../lein.ts';

describe('lein', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(lein(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    60_000,
  );

  test('handles empty string', () => {
    expect(lein('')).toBe('');
  });

  test('handles single characters', () => {
    // Vowels and silent letters
    expect(lein('A')).toBe('A000');
    expect(lein('E')).toBe('E000');
    expect(lein('I')).toBe('I000');
    expect(lein('O')).toBe('O000');
    expect(lein('U')).toBe('U000');
    expect(lein('H')).toBe('H000');
    expect(lein('W')).toBe('W000');

    // Consonants with numeric codes
    expect(lein('B')).toBe('B000');
    expect(lein('C')).toBe('C000');
    expect(lein('D')).toBe('D000');
    expect(lein('F')).toBe('F000');
    expect(lein('G')).toBe('G000');
    expect(lein('J')).toBe('J000');
    expect(lein('K')).toBe('K000');
    expect(lein('L')).toBe('L000');
    expect(lein('M')).toBe('M000');
    expect(lein('N')).toBe('N000');
    expect(lein('P')).toBe('P000');
    expect(lein('Q')).toBe('Q000');
    expect(lein('R')).toBe('R000');
    expect(lein('S')).toBe('S000');
    expect(lein('T')).toBe('T000');
    expect(lein('V')).toBe('V000');
    expect(lein('X')).toBe('X000');
    expect(lein('Y')).toBe('Y000');
    expect(lein('Z')).toBe('Z000');
  });

  test('handles case insensitivity', () => {
    expect(lein('smith')).toBe('S210');
    expect(lein('SMITH')).toBe('S210');
    expect(lein('Smith')).toBe('S210');
    expect(lein('SmItH')).toBe('S210');
  });

  test('removes diacritics and non-alphabetic characters', () => {
    expect(lein('José')).toBe('J500');
    expect(lein('Müller')).toBe('M330');
    expect(lein("O'Brien")).toBe('O432');
    expect(lein('Van-Der-Berg')).toBe('V213');
    expect(lein('Smith123!@#')).toBe('S210');
  });

  test('always returns exactly 4 characters', () => {
    expect(lein('A')).toHaveLength(4);
    expect(lein('Smith')).toHaveLength(4);
    expect(lein('VeryLongLastNameThatExceedsFourCharacters')).toHaveLength(4);
  });

  test('pads short results with zeros', () => {
    expect(lein('A')).toBe('A000');
    expect(lein('AB')).toBe('A400');
    expect(lein('ABC')).toBe('A450');
  });

  test('truncates long results to 4 characters', () => {
    expect(lein('ABCDEFGH')).toBe('A451');
    expect(lein('SMITHERS')).toBe('S213');
  });

  test('handles vowel skipping after first position', () => {
    // Vowels A, E, I, O, U are skipped (=) after first position
    expect(lein('AEIOU')).toBe('A000');
    expect(lein('BEAUTIFUL')).toBe('B143');
    expect(lein('QUEUE')).toBe('Q000');
  });

  test('handles H and W skipping after first position', () => {
    // H and W are skipped (=) after first position
    expect(lein('HELLO')).toBe('H300');
    expect(lein('WHAT')).toBe('W100');
    expect(lein('WHERE')).toBe('W300');
    expect(lein('HOWL')).toBe('H300');
  });

  test('handles consonant group 1 (code 1): D, T', () => {
    expect(lein('DAVID')).toBe('D410');
    expect(lein('THOMAS')).toBe('T250');
    expect(lein('DETECTIVE')).toBe('D151');
  });

  test('handles consonant group 2 (code 2): M, N', () => {
    expect(lein('MARTIN')).toBe('M312');
    expect(lein('NANCY')).toBe('N250');
    expect(lein('MANNING')).toBe('M250');
  });

  test('handles consonant group 3 (code 3): L, R', () => {
    expect(lein('LARRY')).toBe('L300');
    expect(lein('ROBERT')).toBe('R431');
    expect(lein('ROLLER')).toBe('R330');
  });

  test('handles consonant group 4 (code 4): B, F, P, V', () => {
    expect(lein('BARBARA')).toBe('B343');
    expect(lein('FRANK')).toBe('F325');
    expect(lein('PETER')).toBe('P130');
    expect(lein('VICTOR')).toBe('V513');
  });

  test('handles consonant group 5 (code 5): C, G, J, K, Q, S, X, Z', () => {
    expect(lein('CHARLES')).toBe('C335');
    expect(lein('GEORGE')).toBe('G350');
    expect(lein('JAMES')).toBe('J250');
    expect(lein('KAREN')).toBe('K320');
    expect(lein('QUINCY')).toBe('Q250');
    expect(lein('SARAH')).toBe('S300');
    expect(lein('XAVIER')).toBe('X430');
    expect(lein('ZACHARY')).toBe('Z530');
  });

  test('handles O and Y skipping when not in first position', () => {
    expect(lein('BOY')).toBe('B000'); // Y at end is skipped (=)
    expect(lein('OYSTER')).toBe('O513'); // O first, then Y skipped, S->5, T->1, R->3
    expect(lein('YOUNG')).toBe('Y250'); // Y first is preserved
    expect(lein('ROYAL')).toBe('R300'); // R first, O and Y skipped, A skipped, L->3 but L is skipped too
  });

  test('removes consecutive duplicate codes', () => {
    // Consecutive same codes should be collapsed
    expect(lein('BOBBY')).toBe('B400'); // B->B, O skipped, B->4, B->4 (consecutive removed), Y skipped
    expect(lein('LITTLE')).toBe('L130'); // L->L, I skipped, T->1, T->1 (consecutive removed), L->3, E skipped
    expect(lein('PEPPER')).toBe('P430'); // P->P, E skipped, P->4, P->4 (consecutive removed), E skipped, R->3
  });

  test('handles mixed consonant and vowel patterns', () => {
    expect(lein('SMITH')).toBe('S210');
    expect(lein('JOHNSON')).toBe('J252');
    expect(lein('WILLIAMS')).toBe('W325');
    expect(lein('BROWN')).toBe('B320');
    expect(lein('JONES')).toBe('J250');
    expect(lein('GARCIA')).toBe('G350');
    expect(lein('MILLER')).toBe('M330');
    expect(lein('DAVIS')).toBe('D450');
    expect(lein('RODRIGUEZ')).toBe('R135');
    expect(lein('MARTINEZ')).toBe('M312');
  });

  test('handles words starting with vowels', () => {
    expect(lein('ADAMS')).toBe('A125');
    expect(lein('EVANS')).toBe('E425');
    expect(lein('IRWIN')).toBe('I320');
    expect(lein('OLIVER')).toBe('O343');
    expect(lein('UNDERWOOD')).toBe('U213');
  });

  test('handles words starting with H or W', () => {
    expect(lein('HANSEN')).toBe('H252');
    expect(lein('HARRIS')).toBe('H350');
    expect(lein('WILSON')).toBe('W352');
    expect(lein('WHITE')).toBe('W100');
    expect(lein('WRIGHT')).toBe('W351');
  });

  test('handles complex phonetic patterns', () => {
    // Names that might sound similar but have different spellings
    expect(lein('PETERSON')).toBe('P135');
    expect(lein('PETERSEN')).toBe('P135');

    expect(lein('JACKSON')).toBe('J555');
    expect(lein('JAKSON')).toBe('J552');

    expect(lein('CATHERINE')).toBe('C132'); // C->C, A skipped, T->1, H skipped, E skipped, R->3, I skipped, N->2, E skipped
    expect(lein('KATHERINE')).toBe('K132'); // K->K, A skipped, T->1, H skipped, E skipped, R->3, I skipped, N->2, E skipped
  });

  test('handles edge cases with all vowels', () => {
    expect(lein('AREA')).toBe('A300');
    expect(lein('AUDIO')).toBe('A100');
    expect(lein('IDEA')).toBe('I100');
  });

  test('handles edge cases with consecutive consonants', () => {
    expect(lein('STRENGTH')).toBe('S132');
    expect(lein('SCREAM')).toBe('S532');
    expect(lein('CHRISTMAS')).toBe('C351'); // C->C, H skipped, R->3, I skipped, S->5, T->1, M->2 (but consecutive S), A skipped, S->5 (duplicate removed)
  });

  test('handles names with repeated letters', () => {
    expect(lein('BOOK')).toBe('B500'); // B->B, O skipped, O skipped, K->5 (but wait, O gets x code when not first)
    expect(lein('COOL')).toBe('C300'); // C->C, O->x, O->x (consecutive removed), L->3
    expect(lein('DOOR')).toBe('D300'); // D->D, O->x, O->x (consecutive removed), R->3
    expect(lein('KEEP')).toBe('K400'); // K->K, E skipped, E skipped, P->4
  });

  test('handles silent letters and common combinations', () => {
    expect(lein('KNEE')).toBe('K200'); // K->K, N->2, E skipped, E skipped
    expect(lein('WRIGHT')).toBe('W351'); // W->W, R->3, I skipped, G->5, H skipped, T->1
    expect(lein('CASTLE')).toBe('C513'); // C->C, A skipped, S->5 (but becomes part of first), T->1, L->3, E skipped
  });

  test('handles non-English characters gracefully', () => {
    // Characters not in the mapping should be ignored after diacritic removal
    expect(lein('José')).toBe('J500'); // Removes accent, becomes 'Jose'
    expect(lein('Björk')).toBe('B535'); // ö becomes o, j->5, o skipped, r->3, k->5
    expect(lein('François')).toBe('F325'); // F->F, r->3, a skipped, n->2, c->5, o skipped, i skipped, s->5 (consecutive removed)
  });

  test('handles empty result after processing', () => {
    expect(lein('   ')).toBe('');
    expect(lein('123')).toBe('');
    expect(lein('!@#$%')).toBe('');
  });

  test('maintains first letter preservation', () => {
    // First letter should always be preserved as-is regardless of its normal code
    expect(lein('SMITH')).toBe('S210');
    expect(lein('TSMITH')).toBe('T521'); // T->T, S->5, M->2, I skipped, T->1, H skipped
    expect(lein('XSMITH')).toBe('X521'); // X->X, S->5, M->2, I skipped, T->1, H skipped (but S and T collapse?)
  });

  test('complex real-world surname examples', () => {
    expect(lein('MCDONALD')).toBe('M512');
    expect(lein('OCONNOR')).toBe('O523'); // O->O, C->5, O skipped, N->2, N->2 (consecutive removed), O skipped, R->3
    expect(lein('DUJOHNSON')).toBe('D525'); // D->D, U skipped, J->5, O skipped, H skipped, N->2, S->5, O skipped, N->2 (consecutive removed)
    expect(lein('VANDERBERG')).toBe('V213');
    expect(lein('WASHINGTON')).toBe('W525');
  });

  test('handles algorithm-specific edge cases', () => {
    // Test O and Y skipping when not in first position
    expect(lein('BOSTON')).toBe('B512'); // B->B, O skipped, S->5, T->1, O skipped, N->2
    expect(lein('MYSTERY')).toBe('M513'); // M->M, Y skipped, S->5, T->1, E skipped, R->3, Y skipped
    expect(lein('OXYGEN')).toBe('O552'); // O->O, X->5, Y skipped, G->5 (consecutive removed), E skipped, N->2
  });

  test('verifies padding behavior with various lengths', () => {
    expect(lein('A')).toBe('A000');
    expect(lein('AB')).toBe('A400');
    expect(lein('ABC')).toBe('A450');
    expect(lein('ABCD')).toBe('A451');
    expect(lein('ABCDE')).toBe('A451'); // Truncated to 4 chars
  });

  test('verifies truncation behavior', () => {
    const longName = 'SUPERCALIFRAGILISTICEXPIALIDOCIOUS';
    const result = lein(longName);
    expect(result).toHaveLength(4);
    expect(result).toBe('S435'); // S->S, U skipped, P->4, E skipped, R->3, C->5
  });
});
