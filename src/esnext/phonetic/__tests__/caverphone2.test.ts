import { caverphone2 as std } from '../../../../standards/caverphone2.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { caverphone } from '../caverphone.ts';

const caverphone2 = (input: string): string => caverphone(input, 'v2.0');

describe('caverphone2', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(caverphone2(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    60_000,
  );

  test('handles empty string', () => {
    expect(caverphone2('')).toBe('');
  });

  test('handles single characters', () => {
    expect(caverphone2('a')).toBe('A111111111');
    expect(caverphone2('b')).toBe('P111111111');
    expect(caverphone2('z')).toBe('S111111111');
  });

  test('handles case insensitivity', () => {
    expect(caverphone2('SMITH')).toEqual(caverphone2('smith'));
    expect(caverphone2('JOHNSON')).toEqual(caverphone2('johnson'));
    expect(caverphone2('MiLlEr')).toEqual(caverphone2('miller'));
  });

  test('removes diacritics and non-alphabetic characters', () => {
    expect(caverphone2('José')).toEqual(caverphone2('Jose'));
    expect(caverphone2('Müller')).toEqual(caverphone2('Muller'));
    expect(caverphone2("O'Brien")).toEqual(caverphone2('OBrien'));
    expect(caverphone2('Van-Der-Berg')).toEqual(caverphone2('VanDerBerg'));
  });

  test('always returns 10 characters', () => {
    expect(caverphone2('a')).toHaveLength(10);
    expect(caverphone2('hello')).toHaveLength(10);
    expect(caverphone2('verylongname')).toHaveLength(10);
  });

  test('pads short results with 1', () => {
    expect(caverphone2('a')).toBe('A111111111');
    expect(caverphone2('ab')).toBe('AP11111111');
  });

  test('truncates long results to 10 characters', () => {
    expect(caverphone2('verylongwordthatexceedssixcharacters')).toHaveLength(10);
  });

  test('handles e at end removal', () => {
    expect(caverphone2('make')).toBe('MK11111111');
    expect(caverphone2('rake')).toBe('RK11111111');
    expect(caverphone2('house')).toBe('AS11111111');
  });

  test('handles vowel transformations', () => {
    expect(caverphone2('apple')).toBe('APA1111111');
    expect(caverphone2('eagle')).toBe('AKA1111111');
    expect(caverphone2('igloo')).toBe('AKLA111111');
    expect(caverphone2('ocean')).toBe('ASN1111111');
    expect(caverphone2('under')).toBe('ANTA111111');
  });

  test('handles consonant transformations', () => {
    // c/q/x -> k
    expect(caverphone2('cat')).toBe('KT11111111');
    expect(caverphone2('queen')).toBe('KN11111111');
    expect(caverphone2('box')).toBe('PK11111111');

    // v -> f
    expect(caverphone2('voice')).toBe('FK11111111');

    // d -> t
    expect(caverphone2('dog')).toBe('TK11111111');

    // b -> p
    expect(caverphone2('boy')).toBe('PA11111111');

    // z -> s
    expect(caverphone2('zoo')).toBe('SA11111111');

    // g -> k
    expect(caverphone2('go')).toBe('KA11111111');
  });

  test('handles special combinations', () => {
    // tch -> 2ch
    expect(caverphone2('match')).toBe('MK11111111');

    // sh -> s2
    expect(caverphone2('ship')).toBe('SP11111111');

    // ph -> fh
    expect(caverphone2('phone')).toBe('FN11111111');

    // gh -> 22
    expect(caverphone2('ghost')).toBe('ST11111111');

    // dg -> 2g
    expect(caverphone2('edge')).toBe('AK11111111');
  });

  test('handles position-specific rules', () => {
    // gn at start -> 2n
    expect(caverphone2('gnome')).toBe('NM11111111');

    // mb at end stays mb
    expect(caverphone2('lamb')).toBe('LM11111111');

    // h at start -> A
    expect(caverphone2('house')).toBe('AS11111111');
  });

  test('handles ci/ce/cy transformations', () => {
    expect(caverphone2('city')).toBe('STA1111111');
    expect(caverphone2('cent')).toBe('SNT1111111');
    expect(caverphone2('cyber')).toBe('SPA1111111');
  });

  test('handles tio/tia transformations', () => {
    expect(caverphone2('nation')).toBe('NSN1111111');
    expect(caverphone2('partial')).toBe('PSA1111111');
  });

  test('handles rough transformations', () => {
    expect(caverphone2('cough')).toBe('KF11111111');
    expect(caverphone2('rough')).toBe('RF11111111');
    expect(caverphone2('tough')).toBe('TF11111111');
    expect(caverphone2('enough')).toBe('ANF1111111');
    expect(caverphone2('trough')).toBe('TRF1111111');
  });

  test('handles j transformation to y', () => {
    expect(caverphone2('jump')).toBe('YMP1111111');
    expect(caverphone2('joy')).toBe('YA11111111');
    expect(caverphone2('major')).toBe('MA11111111');
  });

  test('handles y transformations', () => {
    // y at start with vowel -> Y3
    expect(caverphone2('yes')).toBe('YS11111111');
    expect(caverphone2('young')).toBe('YNK1111111');

    // y at start -> A
    expect(caverphone2('you')).toBe('YA11111111');

    // y elsewhere -> 3
    expect(caverphone2('happy')).toBe('APA1111111');
  });

  test('handles double consonant compression', () => {
    // s+ -> S, t+ -> T, etc.
    expect(caverphone2('miss')).toBe('MS11111111');
    expect(caverphone2('button')).toBe('PTN1111111');
    expect(caverphone2('pepper')).toBe('PPA1111111');
  });

  test('handles w transformations', () => {
    expect(caverphone2('water')).toBe('WTA1111111');
    expect(caverphone2('what')).toBe('WT11111111');
    expect(caverphone2('when')).toBe('WN11111111');
    expect(caverphone2('window')).toBe('WNTA111111');
  });

  test('handles r transformations', () => {
    expect(caverphone2('run')).toBe('RN11111111');
    expect(caverphone2('car')).toBe('KA11111111');
    expect(caverphone2('red')).toBe('RT11111111');
  });

  test('handles l transformations', () => {
    expect(caverphone2('love')).toBe('LF11111111');
    expect(caverphone2('call')).toBe('KA11111111');
    expect(caverphone2('blue')).toBe('PLA1111111');
  });

  test('handles cq transformation', () => {
    expect(caverphone2('acquire')).toBe('AKA1111111');
    expect(caverphone2('jacque')).toBe('YKA1111111');
  });

  test('handles complex phonetic patterns', () => {
    expect(caverphone2('psychology')).toBe('PSKLKA1111');
    expect(caverphone2('knight')).toBe('KNT1111111');
    expect(caverphone2('rhythm')).toBe('TM11111111');
  });

  test('handles edge cases with special characters', () => {
    expect(caverphone2('  ')).toBe('');
    expect(caverphone2('123')).toBe('');
    expect(caverphone2('!!!')).toBe('');
  });

  test('handles words with only vowels', () => {
    expect(caverphone2('area')).toBe('ARA1111111');
    expect(caverphone2('oil')).toBe('AA11111111');
    expect(caverphone2('eye')).toBe('AA11111111');
  });

  test('handles similar sounding names', () => {
    expect(caverphone2('Smith')).toBe('SMT1111111');
    expect(caverphone2('Smyth')).toBe('SMT1111111');
    expect(caverphone2('Johnson')).toBe('YNSN111111');
    expect(caverphone2('Jackson')).toBe('YKSN111111');
  });

  test('handles consecutive identical letters', () => {
    expect(caverphone2('book')).toBe('PK11111111');
    expect(caverphone2('cool')).toBe('KA11111111');
    expect(caverphone2('door')).toBe('TA11111111');
    expect(caverphone2('keep')).toBe('KP11111111');
  });

  test('handles silent letters', () => {
    expect(caverphone2('knee')).toBe('KNA1111111');
    expect(caverphone2('wrist')).toBe('RST1111111');
    expect(caverphone2('castle')).toBe('KSTA111111');
  });

  test('handles 3 at end becomes A', () => {
    expect(caverphone2('the')).toBe('T111111111');
    expect(caverphone2('she')).toBe('S111111111');
    expect(caverphone2('he')).toBe('A111111111');
  });

  test('handles multiple rule applications', () => {
    expect(caverphone2('daughter')).toBe('TTA1111111');
    expect(caverphone2('receipt')).toBe('RSPT111111');
    expect(caverphone2('thoughts')).toBe('TTS1111111');
  });

  test('handles known Caverphone 2.0 examples', () => {
    expect(caverphone2('Peter')).toBe('PTA1111111');
    expect(caverphone2('ready')).toBe('RTA1111111');
    expect(caverphone2('social')).toBe('SSA1111111');
    expect(caverphone2('able')).toBe('APA1111111');
    expect(caverphone2('Tedder')).toBe('TTA1111111');
    expect(caverphone2('Karleen')).toBe('KLN1111111');
    expect(caverphone2('Carlene')).toBe('KLN1111111');
  });
});
