import { caverphone1 as std } from '../../../../standards/caverphone1.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { caverphone } from '../caverphone.ts';

const caverphone1 = (input: string): string => caverphone(input, 'v1.0');

describe('caverphone1', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(caverphone1(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    60_000,
  );

  test('handles empty string', () => {
    expect(caverphone1('')).toBe('');
  });

  test('handles single characters', () => {
    expect(caverphone1('a')).toBe('A11111');
    expect(caverphone1('b')).toBe('P11111');
    expect(caverphone1('z')).toBe('S11111');
  });

  test('handles case insensitivity', () => {
    expect(caverphone1('SMITH')).toEqual(caverphone1('smith'));
    expect(caverphone1('JOHNSON')).toEqual(caverphone1('johnson'));
    expect(caverphone1('MiLlEr')).toEqual(caverphone1('miller'));
  });

  test('removes diacritics and non-alphabetic characters', () => {
    expect(caverphone1('José')).toEqual(caverphone1('Jose'));
    expect(caverphone1('Müller')).toEqual(caverphone1('Muller'));
    expect(caverphone1("O'Brien")).toEqual(caverphone1('OBrien'));
    expect(caverphone1('Van-Der-Berg')).toEqual(caverphone1('VanDerBerg'));
  });

  test('always returns 6 characters', () => {
    expect(caverphone1('a')).toHaveLength(6);
    expect(caverphone1('hello')).toHaveLength(6);
    expect(caverphone1('verylongname')).toHaveLength(6);
  });

  test('pads short results with 1', () => {
    expect(caverphone1('a')).toBe('A11111');
    expect(caverphone1('ab')).toBe('AP1111');
  });

  test('truncates long results to 6 characters', () => {
    expect(caverphone1('verylongwordthatexceedssixcharacters')).toHaveLength(6);
  });

  test('handles vowel transformations', () => {
    expect(caverphone1('Lee')).toBe('L11111');
    expect(caverphone1('Thompson')).toBe('TMPSN1');

    expect(caverphone1('apple')).toBe('APL111');
    expect(caverphone1('eagle')).toBe('AKL111');
    expect(caverphone1('igloo')).toBe('AKL111');
    expect(caverphone1('ocean')).toBe('ASN111');
    expect(caverphone1('under')).toBe('ANT111');
  });

  test('handles consonant transformations', () => {
    // c/q/x -> k
    expect(caverphone1('cat')).toBe('KT1111');
    expect(caverphone1('queen')).toBe('KN1111');
    expect(caverphone1('box')).toBe('PK1111');

    // v -> f
    expect(caverphone1('voice')).toBe('FS1111');

    // d -> t
    expect(caverphone1('dog')).toBe('TK1111');

    // b -> p
    expect(caverphone1('boy')).toBe('P11111');

    // z -> s
    expect(caverphone1('zoo')).toBe('S11111');

    // g -> k
    expect(caverphone1('go')).toBe('K11111');
  });

  test('handles special combinations', () => {
    // tch -> 2ch
    expect(caverphone1('match')).toBe('MK1111');

    // sh -> s2
    expect(caverphone1('ship')).toBe('SP1111');

    // ph -> fh
    expect(caverphone1('phone')).toBe('FN1111');

    // gh -> 22
    expect(caverphone1('ghost')).toBe('ST1111');

    // dg -> 2g
    expect(caverphone1('edge')).toBe('AK1111');
  });

  test('handles position-specific rules', () => {
    // e at end removed
    expect(caverphone1('make')).toBe('MK1111');
    expect(caverphone1('rake')).toBe('RK1111');

    // gn at start -> 2n
    expect(caverphone1('gnome')).toBe('NM1111');

    // mb at end -> m2
    expect(caverphone1('lamb')).toBe('LM1111');

    // h at start -> A
    expect(caverphone1('house')).toBe('AS1111');
  });

  test('handles ci/ce/cy transformations', () => {
    expect(caverphone1('city')).toBe('ST1111');
    expect(caverphone1('cent')).toBe('SNT111');
    expect(caverphone1('cyber')).toBe('SP1111');
  });

  test('handles tio/tia transformations', () => {
    expect(caverphone1('nation')).toBe('NSN111');
    expect(caverphone1('partial')).toBe('PS1111');
  });

  test('handles rough transformations', () => {
    expect(caverphone1('cough')).toBe('KF1111');
    expect(caverphone1('rough')).toBe('RF1111');
    expect(caverphone1('tough')).toBe('TF1111');
    expect(caverphone1('enough')).toBe('ANF111');
  });

  test('handles known Caverphone 1.0 examples', () => {
    expect(caverphone1('Peter')).toBe('PT1111');
    expect(caverphone1('ready')).toBe('RT1111');
    expect(caverphone1('social')).toBe('SS1111');
    expect(caverphone1('able')).toBe('APL111');
    expect(caverphone1('Tedder')).toBe('TT1111');
    expect(caverphone1('Karleen')).toBe('KLN111');
    expect(caverphone1('Carlene')).toBe('KLN111');
  });

  test('handles double consonant compression', () => {
    // s+ -> S, t+ -> T, etc.
    expect(caverphone1('miss')).toBe('MS1111');
    expect(caverphone1('button')).toBe('PTN111');
    expect(caverphone1('pepper')).toBe('PP1111');
  });

  test('handles cq transformation', () => {
    expect(caverphone1('acquire')).toBe('AKR111');
    expect(caverphone1('jacque')).toBe('YK1111');
  });

  test('handles j transformation to y', () => {
    expect(caverphone1('jump')).toBe('YMP111');
    expect(caverphone1('joy')).toBe('Y11111');
    expect(caverphone1('major')).toBe('MY1111');
  });

  test('handles complex vowel sequences', () => {
    expect(caverphone1('beauty')).toBe('PT1111');
    expect(caverphone1('queue')).toBe('K11111');
    expect(caverphone1('audio')).toBe('AT1111');
  });

  test('handles multiple rule applications', () => {
    expect(caverphone1('psychology')).toBe('PSKLK1');
    expect(caverphone1('knight')).toBe('KNT111');
    expect(caverphone1('rhythm')).toBe('TM1111');
  });

  test('handles edge cases with special characters', () => {
    expect(caverphone1('  ')).toBe('');
    expect(caverphone1('123')).toBe('');
    expect(caverphone1('!!!')).toBe('');
  });

  test('handles words with only vowels', () => {
    expect(caverphone1('area')).toBe('AR1111');
    expect(caverphone1('oil')).toBe('A11111');
    expect(caverphone1('eye')).toBe('AY1111');
  });

  test('handles complex phonetic patterns', () => {
    expect(caverphone1('daughter')).toBe('TT1111');
    expect(caverphone1('receipt')).toBe('RSPT11');
    expect(caverphone1('thoughts')).toBe('TTS111');
  });

  test('handles word boundaries and position rules', () => {
    expect(caverphone1('wrap')).toBe('RP1111');
    expect(caverphone1('write')).toBe('RT1111');
    expect(caverphone1('thumb')).toBe('TM1111');
  });

  test('handles consecutive identical letters', () => {
    expect(caverphone1('book')).toBe('PK1111');
    expect(caverphone1('cool')).toBe('K11111');
    expect(caverphone1('door')).toBe('T11111');
    expect(caverphone1('keep')).toBe('KP1111');
  });

  test('handles silent letters', () => {
    expect(caverphone1('knee')).toBe('KN1111');
    expect(caverphone1('wrist')).toBe('RST111');
    expect(caverphone1('castle')).toBe('KSTL11');
  });

  test('handles combination transformations with vowels', () => {
    expect(caverphone1('change')).toBe('KNK111');
    expect(caverphone1('school')).toBe('SK1111');
    expect(caverphone1('church')).toBe('KK1111');
  });
});
