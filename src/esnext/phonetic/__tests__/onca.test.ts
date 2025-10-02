import { onca as std } from '../../../../standards/onca.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { onca } from '../onca.ts';

describe('onca', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        expect(onca(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('handles empty string', () => {
    expect(onca('')).toBe('');
  });

  test('handles single character input', () => {
    expect(onca('A')).toBe('A000');
    expect(onca('B')).toBe('B000');
    expect(onca('Z')).toBe('Z000');
  });

  test('generates correct ONCA codes for basic names', () => {
    // These test cases verify the combination of NYSIIS followed by Soundex
    expect(onca('Smith')).toBe('S530'); // NYSIIS: 'SNAT' -> Soundex: 'S530'
    expect(onca('Johnson')).toBe('J250'); // NYSIIS: 'JASAN' -> Soundex: 'J250'
    expect(onca('Brown')).toBe('B650'); // NYSIIS: 'BRAN' -> Soundex: 'B650'
    expect(onca('Wilson')).toBe('W425'); // NYSIIS: 'WALSAN' -> Soundex: 'W425'
    expect(onca('Miller')).toBe('M460'); // NYSIIS: 'MALAR' -> Soundex: 'M460'
  });

  test('handles case insensitivity', () => {
    expect(onca('smith')).toBe('S530');
    expect(onca('SMITH')).toBe('S530');
    expect(onca('SmItH')).toBe('S530');
    expect(onca('JOHNSON')).toBe('J250');
    expect(onca('johnson')).toBe('J250');
  });

  test('handles names with MAC prefix', () => {
    expect(onca('MacDonald')).toBe('M235'); // NYSIIS: 'MCDANALD' -> Soundex: 'M235'
    expect(onca('MacBeth')).toBe('M213'); // NYSIIS: 'MCBAT' -> Soundex: 'M213'
    expect(onca('MacArthur')).toBe('M263'); // NYSIIS: 'MCARTAR' -> Soundex: 'M263'
  });

  test('handles names with KN prefix', () => {
    expect(onca('Knight')).toBe('N230'); // NYSIIS: 'NNAGT' -> Soundex: 'N230'
    expect(onca('Knoll')).toBe('N400'); // NYSIIS: 'NNAL' -> Soundex: 'N400'
    expect(onca('Knife')).toBe('N100'); // NYSIIS: 'NNAF' -> Soundex: 'N100'
  });

  test('handles names with PH prefix', () => {
    expect(onca('Phillips')).toBe('F410'); // NYSIIS: 'FFALAP' -> Soundex: 'F410'
    expect(onca('Phoenix')).toBe('F520'); // NYSIIS: 'FFANAX' -> Soundex: 'F520'
    expect(onca('Phantom')).toBe('F535'); // NYSIIS: 'FFANTAN' -> Soundex: 'F535'
  });

  test('handles names with SCH prefix', () => {
    expect(onca('Schmidt')).toBe('S530'); // NYSIIS: 'SSNAD' -> Soundex: 'S530'
    expect(onca('Schultz')).toBe('S430'); // NYSIIS: 'SSALT' -> Soundex: 'S430'
    expect(onca('Schneider')).toBe('S536'); // NYSIIS: 'SSNADAR' -> Soundex: 'S536'
  });

  test('handles names with vowel suffixes', () => {
    expect(onca('Lee')).toBe('L000'); // NYSIIS: 'LY' -> Soundex: 'L000'
    expect(onca('McKee')).toBe('M200'); // NYSIIS: 'MCY' -> Soundex: 'M200'
    expect(onca('Christie')).toBe('C623'); // NYSIIS: 'CHRASTY' -> Soundex: 'C623'
  });

  test('handles names with consonant suffixes', () => {
    expect(onca('Grant')).toBe('G630'); // NYSIIS: 'GRAD' -> Soundex: 'G630'
    expect(onca('Hunt')).toBe('H300'); // NYSIIS: 'HAD' -> Soundex: 'H300'
    expect(onca('Ford')).toBe('F300'); // NYSIIS: 'FAD' -> Soundex: 'F300'
    expect(onca('Stuart')).toBe('S330'); // NYSIIS: 'STAD' -> Soundex: 'S330'
  });

  test('handles names with apostrophes', () => {
    expect(onca("O'Brien")).toBe('O165'); // NYSIIS: 'OBRAN' -> Soundex: 'O165'
    expect(onca("D'Angelo")).toBe('D524'); // NYSIIS: 'DANGAL' -> Soundex: 'D524'
    expect(onca("O'Connor")).toBe('O256'); // NYSIIS: 'OCANAR' -> Soundex: 'O256'
  });

  test('handles whitespace trimming', () => {
    expect(onca(' Smith ')).toBe('S530');
    expect(onca('  Johnson  ')).toBe('J250');
    expect(onca('\t Brown \n')).toBe('B650');
  });

  test('handles special characters', () => {
    expect(onca('Smith123')).toBe('S530'); // Non-alphabetic characters ignored
    expect(onca('Brown-Smith')).toBe('B652'); // NYSIIS: 'BRANSNAT' -> Soundex: 'B652'
    expect(onca('!@#')).toBe(''); // No valid characters
  });

  test('handles short names', () => {
    expect(onca('Li')).toBe('L000'); // NYSIIS: 'L' -> Soundex: 'L000'
    expect(onca('Wu')).toBe('W000'); // NYSIIS: 'W' -> Soundex: 'W000'
    expect(onca('Yu')).toBe('Y000'); // NYSIIS: 'Y' -> Soundex: 'Y000'
  });

  test('handles similar sounding names', () => {
    // Names that should sound similar should produce similar or identical ONCA codes
    expect(onca('Brown')).toBe(onca('Braun')); // Both should produce same NYSIIS -> same Soundex
    expect(onca('Peterson')).toBe('P362'); // NYSIIS: 'PATARSAN' -> Soundex: 'P362'
    expect(onca('Petersen')).toBe('P362'); // Should be same as Peterson due to similar NYSIIS output
  });

  test('handles vowel transformations', () => {
    expect(onca('Aaron')).toBe('A650'); // NYSIIS: 'AARAN' -> Soundex: 'A650'
    expect(onca('Maria')).toBe('M600'); // NYSIIS: 'MAR' -> Soundex: 'M600'
    expect(onca('Garcia')).toBe('G620'); // NYSIIS: 'GARC' -> Soundex: 'G620'
  });

  test('handles H and W transformations', () => {
    expect(onca('Shaw')).toBe('S000'); // NYSIIS: 'SH' -> Soundex: 'S000'
    expect(onca('Hawkins')).toBe('H250'); // NYSIIS: 'HACAN' -> Soundex: 'H250'
    expect(onca('Crawford')).toBe('C613'); // NYSIIS: 'CRAFAD' -> Soundex: 'C613'
  });

  test('handles Q, Z, and M transformations', () => {
    expect(onca('Queen')).toBe('Q500'); // NYSIIS: 'QAN' -> Soundex: 'Q500'
    expect(onca('Zimmerman')).toBe('Z565'); // NYSIIS: 'ZANARNAN' -> Soundex: 'Z565'
    expect(onca('Martin')).toBe('M635'); // NYSIIS: 'MARTAN' -> Soundex: 'M635'
  });

  test('handles compound names', () => {
    expect(onca('McPherson')).toBe('M216'); // NYSIIS: 'MCFARSAN' -> Soundex: 'M216'
    expect(onca('VanZandt')).toBe('V525'); // NYSIIS: 'VANSAND' -> Soundex: 'V525'
    expect(onca('DeAngelo')).toBe('D524'); // NYSIIS: 'DANGAL' -> Soundex: 'D524'
  });

  test('handles long complex names', () => {
    expect(onca('Schwarzenegger')).toBe('S625'); // NYSIIS: 'SSWARSANAGAR' -> Soundex: 'S625'
    expect(onca('Kowalkowski')).toBe('C422'); // NYSIIS: 'CALCASC' -> Soundex: 'C422'
    expect(onca('Konstantinopolous')).toBe('C523'); // NYSIIS: 'CANSTANTANAPAL' -> Soundex: 'C523'
  });

  test('handles names starting with vowels', () => {
    expect(onca('Adams')).toBe('A350'); // NYSIIS: 'ADAN' -> Soundex: 'A350'
    expect(onca('Evans')).toBe('E150'); // NYSIIS: 'EVAN' -> Soundex: 'E150'
    expect(onca('Irving')).toBe('I615'); // NYSIIS: 'IRVANG' -> Soundex: 'I615'
    expect(onca('Owen')).toBe('O500'); // NYSIIS: 'OWAN' -> Soundex: 'O500'
    expect(onca('Ulrich')).toBe('U462'); // NYSIIS: 'ULRAC' -> Soundex: 'U462'
  });

  test('handles edge cases with repeated consonants', () => {
    expect(onca('Mississippi')).toBe('M221'); // NYSIIS: 'MASASAP' -> Soundex: 'M221'
    expect(onca('Illinois')).toBe('I450'); // NYSIIS: 'ILAN' -> Soundex: 'I450'
    expect(onca('Tennessee')).toBe('T520'); // Complex NYSIIS transformation -> Soundex
  });

  test('handles unusual letter combinations', () => {
    expect(onca('Tschaikovsky')).toBe('T221'); // NYSIIS: 'TSACAVSCY' -> Soundex: 'T221'
    expect(onca('Djokovic')).toBe('D221'); // NYSIIS: 'DJACAVAC' -> Soundex: 'D221'
    expect(onca('Tchaikovsky')).toBe('T221'); // NYSIIS: 'TCACAVSCY' -> Soundex: 'T221'
  });

  test('handles names with multiple transformations', () => {
    expect(onca('Christopher')).toBe('C623'); // NYSIIS: 'CHRASTAFAR' -> Soundex: 'C623'
    expect(onca('Katherine')).toBe('C365'); // NYSIIS: 'CATARAN' -> Soundex: 'C365'
    expect(onca('Thompson')).toBe('T512'); // NYSIIS: 'THANPSAN' -> Soundex: 'T512'
  });

  test('produces consistent results', () => {
    // Multiple calls should produce identical results
    const name = 'Jackson';
    const result1 = onca(name);
    const result2 = onca(name);
    const result3 = onca(name);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(result1).toBe('J250'); // NYSIIS: 'JACSAN' -> Soundex: 'J250'
  });

  test('handles non-English characters', () => {
    // Characters not handled by NYSIIS/Soundex should be processed gracefully
    expect(onca('José')).toBe('J200'); // Accented characters typically ignored/simplified
    expect(onca('Müller')).toBe('M460'); // Umlaut typically ignored
    expect(onca('Björk')).toBe('B262'); // Nordic characters processed
  });
});
