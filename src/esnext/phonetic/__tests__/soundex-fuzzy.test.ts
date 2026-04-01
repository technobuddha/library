import { soundexFuzzy as std } from '../../../../standards/soundex-fuzzy.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { soundex } from '../soundex.ts';

const soundexFuzzy = (input: string): string => soundex(input, 'fuzzy');

describe('soundexFuzzy', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(soundexFuzzy(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );
  test('should handle basic words', () => {
    expect(soundexFuzzy('Smith')).toBe('S53');
    expect(soundexFuzzy('Smyth')).toBe('S53');
    expect(soundexFuzzy('Johnson')).toBe('J595');
  });

  test('should handle empty and whitespace input', () => {
    expect(soundexFuzzy('')).toBe('');
    expect(soundexFuzzy('   ')).toBe('');
    expect(soundexFuzzy('\t\n')).toBe('');
  });

  test('should handle single characters', () => {
    expect(soundexFuzzy('A')).toBe('A');
    expect(soundexFuzzy('B')).toBe('B');
    expect(soundexFuzzy('H')).toBe('H');
    expect(soundexFuzzy('W')).toBe('W');
  });

  test('should normalize case', () => {
    expect(soundexFuzzy('smith')).toBe('S53');
    expect(soundexFuzzy('SMITH')).toBe('S53');
    expect(soundexFuzzy('SmItH')).toBe('S53');
  });

  test('should remove diacritics', () => {
    expect(soundexFuzzy('José')).toBe('J9');
    expect(soundexFuzzy('Müller')).toBe('M46');
    expect(soundexFuzzy('François')).toBe('F6579');
  });

  test('should handle non-alphabetic characters', () => {
    expect(soundexFuzzy('Smith-Jones')).toBe('S53759');
    expect(soundexFuzzy("O'Connor")).toBe('O756');
    expect(soundexFuzzy('123Smith456')).toBe('S53');
  });

  test('should apply beginning-of-word rules', () => {
    expect(soundexFuzzy('Czar')).toBe('S6');
    expect(soundexFuzzy('Tsar')).toBe('S6');
    expect(soundexFuzzy('Gnome')).toBe('N5');
    expect(soundexFuzzy('Hour')).toBe('H6');
    expect(soundexFuzzy('Write')).toBe('R3');
    expect(soundexFuzzy('Hwang')).toBe('W57');
    expect(soundexFuzzy('Knee')).toBe('N');
    expect(soundexFuzzy('Ng')).toBe('N');
  });

  test('should apply end-of-word rules', () => {
    expect(soundexFuzzy('Beach')).toBe('B7');
    expect(soundexFuzzy('Point')).toBe('P3');
    expect(soundexFuzzy('Heart')).toBe('H6');
    expect(soundexFuzzy('Heard')).toBe('H63');
  });

  test('should apply middle-of-word rules', () => {
    expect(soundexFuzzy('Cake')).toBe('K7');
    expect(soundexFuzzy('Check')).toBe('C7');
    expect(soundexFuzzy('Cook')).toBe('K7');
    expect(soundexFuzzy('Celery')).toBe('S46');
    expect(soundexFuzzy('Clear')).toBe('K46');
    expect(soundexFuzzy('Crown')).toBe('K65');
    expect(soundexFuzzy('City')).toBe('S3');
    expect(soundexFuzzy('Cow')).toBe('K');
    expect(soundexFuzzy('Cute')).toBe('K3');
    expect(soundexFuzzy('Cycle')).toBe('S74');
    expect(soundexFuzzy('Judge')).toBe('J7');
    expect(soundexFuzzy('Ghost')).toBe('H93');
    expect(soundexFuzzy('MacDonald')).toBe('M73543');
    expect(soundexFuzzy('McConnell')).toBe('M754');
    expect(soundexFuzzy('Against')).toBe('A759');
    expect(soundexFuzzy('Pfizer')).toBe('F96');
    expect(soundexFuzzy('Phone')).toBe('F5');
    expect(soundexFuzzy('School')).toBe('S4');
    expect(soundexFuzzy('Nation')).toBe('N95');
    expect(soundexFuzzy('Partial')).toBe('P694');
    expect(soundexFuzzy('Watch')).toBe('W37');
  });

  test('should handle consecutive duplicate codes', () => {
    expect(soundexFuzzy('Ll')).toBe('L');
    expect(soundexFuzzy('Mm')).toBe('M');
    expect(soundexFuzzy('Bookkeeper')).toBe('B716');
  });

  test('should handle vowels correctly', () => {
    //expect(soundexFuzzy('Aeiou')).toBe('A');
    expect(soundexFuzzy('Eagle')).toBe('E74');
    expect(soundexFuzzy('Iowa')).toBe('I');
  });

  test('should handle silent letters', () => {
    expect(soundexFuzzy('Why')).toBe('W');
    expect(soundexFuzzy('Hour')).toBe('H6');
    expect(soundexFuzzy('Honest')).toBe('H593');
  });

  test('should handle complex names', () => {
    expect(soundexFuzzy('Washington')).toBe('W95735');
    expect(soundexFuzzy('Lincoln')).toBe('L5745');
    expect(soundexFuzzy('Roosevelt')).toBe('R9143');
    expect(soundexFuzzy('Jefferson')).toBe('J1695');
  });

  test('should maintain first character', () => {
    expect(soundexFuzzy('Smith').charAt(0)).toBe('S');
    expect(soundexFuzzy('Johnson').charAt(0)).toBe('J');
    expect(soundexFuzzy('Brown').charAt(0)).toBe('B');
  });

  test('should handle phonetically similar names', () => {
    // These should produce the same code
    const codes1 = [soundexFuzzy('Catherine'), soundexFuzzy('Katherine'), soundexFuzzy('Kathryn')];
    expect(codes1[0]).toBe(codes1[1]);
    expect(codes1[1]).toBe(codes1[2]);

    // These should produce the same code
    const codes2 = [soundexFuzzy('Stephen'), soundexFuzzy('Steven')];
    expect(codes2[0]).toBe(codes2[1]);
  });

  test('shound handle silent lettters', () => {
    expect(soundexFuzzy('yttrium')).toBe('Y365');
    expect(soundexFuzzy('Wyndham')).toBe('W535');
    expect(soundexFuzzy('Yuscak')).toBe('Y977');
    expect(soundexFuzzy('Zyskowski')).toBe('Z797');
    expect(soundexFuzzy('YTUARTE')).toBe('Y363');
  });
});
