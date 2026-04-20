import { nysiis2 as std } from '../../../../standards/nysiis2.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { nysiis } from '../nysiis.ts';

const nysiisModified = (input: string): string => nysiis(input, 'modified');

describe('nysiisModified', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(nysiisModified(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('returns empty string for empty input', () => {
    expect(nysiisModified('')).toBe('');
  });

  test('handles single character input', () => {
    expect(nysiisModified('A')).toBe('A');
    expect(nysiisModified('B')).toBe('B');
    expect(nysiisModified('Z')).toBe('S');
  });

  test('handles basic names', () => {
    expect(nysiisModified('Smith')).toBe('SNATH');
    expect(nysiisModified('Johnson')).toBe('JANSAN');
    expect(nysiisModified('Brown')).toBe('BRAN');
    expect(nysiisModified('Williams')).toBe('WALAN');
    expect(nysiisModified('Jones')).toBe('JAN');
  });

  test('handles MAC prefix transformation', () => {
    expect(nysiisModified('MacDonald')).toBe('MCDANALD');
    expect(nysiisModified('MacBeth')).toBe('MCBATH');
    expect(nysiisModified('MacArthur')).toBe('MCARTAR');
    expect(nysiisModified('MacPherson')).toBe('MCFARSAN');
  });

  test('handles PF prefix transformation', () => {
    expect(nysiisModified('Pfizer')).toBe('FASAR');
    expect(nysiisModified('Pfeffer')).toBe('FAFAR');
    expect(nysiisModified('Pfeiffer')).toBe('FAFAR');
  });

  test('handles IX suffix transformation', () => {
    expect(nysiisModified('Phoenix')).toBe('FANAC');
    expect(nysiisModified('Felix')).toBe('FALAC');
  });

  test('handles EX suffix transformation', () => {
    expect(nysiisModified('Alex')).toBe('ALAC');
    expect(nysiisModified('Rex')).toBe('RAC');
  });

  test('handles YE/EE/IE suffix transformation', () => {
    expect(nysiisModified('Lee')).toBe('LY');
    expect(nysiisModified('McKee')).toBe('MCY');
    expect(nysiisModified('Christie')).toBe('CHRASTY');
    expect(nysiisModified('Leslie')).toBe('LASLY');
    expect(nysiisModified('Charlie')).toBe('CARLY');
  });

  test('handles DT/RT/RD/NT/ND suffix transformation', () => {
    expect(nysiisModified('Grant')).toBe('GRAD');
    expect(nysiisModified('Hunt')).toBe('HAD');
    expect(nysiisModified('Ford')).toBe('FAD');
    expect(nysiisModified('Stuart')).toBe('STAD');
    expect(nysiisModified('Fitzgerald')).toBe('FATSGARALD');
  });

  test('handles EV to EF transformation', () => {
    expect(nysiisModified('Steven')).toBe('STAFAN');
    expect(nysiisModified('Kevin')).toBe('CAFAN');
    expect(nysiisModified('Evelyn')).toBe('EVALAN');
  });

  test('handles vowel followed by W transformation', () => {
    expect(nysiisModified('Shaw')).toBe('S');
    expect(nysiisModified('Hawkins')).toBe('HACAN');
    expect(nysiisModified('Crawford')).toBe('CRAFAD');
  });

  test('collapses all vowels to A', () => {
    expect(nysiisModified('Aaron')).toBe('ARAN');
    expect(nysiisModified('Beautiful')).toBe('BATAFAL');
    expect(nysiisModified('Aeiou')).toBe('A');
  });

  test('handles GHT transformation', () => {
    expect(nysiisModified('Wright')).toBe('RAGT');
    expect(nysiisModified('Knight')).toBe('NAGT');
    expect(nysiisModified('Light')).toBe('LAGT');
  });

  test('handles DG transformation', () => {
    expect(nysiisModified('Edgar')).toBe('EGAR');
    expect(nysiisModified('Edge')).toBe('EG');
  });

  test('handles PH transformation', () => {
    expect(nysiisModified('Phillips')).toBe('FALAP');
    expect(nysiisModified('Phantom')).toBe('FANTAN');
    expect(nysiisModified('Stephen')).toBe('STAFAN');
  });

  test('handles H preceded by vowel transformation', () => {
    expect(nysiisModified('Ahern')).toBe('ARN');
    expect(nysiisModified('Cohen')).toBe('CAN');
    expect(nysiisModified('Graham')).toBe('GRAN');
  });

  test('handles KN transformation', () => {
    expect(nysiisModified('Knoll')).toBe('NAL');
    expect(nysiisModified('Knife')).toBe('NAF');
  });

  test('handles K to C transformation', () => {
    expect(nysiisModified('Karl')).toBe('CARL');
    expect(nysiisModified('King')).toBe('CANG');
    expect(nysiisModified('Kelly')).toBe('CALY');
  });

  test('handles M to N transformation (not first character)', () => {
    expect(nysiisModified('Martin')).toBe('MARTAN');
    expect(nysiisModified('Mason')).toBe('MASAN');
    expect(nysiisModified('Miller')).toBe('MALAR');
    expect(nysiisModified('Thomas')).toBe('TAN');
  });

  test('handles Q to G transformation (not first character)', () => {
    expect(nysiisModified('Queen')).toBe('QAN');
    expect(nysiisModified('Quinn')).toBe('QAN');
    expect(nysiisModified('Quincy')).toBe('QANCY');
  });

  test('handles SH transformation', () => {
    expect(nysiisModified('Shaw')).toBe('S');
    expect(nysiisModified('Fisher')).toBe('FASAR');
  });

  test('handles SCH transformation', () => {
    expect(nysiisModified('Schmidt')).toBe('SNAD');
    expect(nysiisModified('Schultz')).toBe('SCALT');
    expect(nysiisModified('Schneider')).toBe('SNADAR');
    expect(nysiisModified('Schwarzenegger')).toBe('SWARSANAGAR');
  });

  test('handles YW transformation', () => {
    expect(nysiisModified('Goodwyn')).toBe('GADWAN');
  });

  test('handles Y transformation (not first or last)', () => {
    expect(nysiisModified('Boyd')).toBe('BAD');
    expect(nysiisModified('Myers')).toBe('MAR');
    expect(nysiisModified('Taylor')).toBe('TALAR');
  });

  test('handles WR transformation', () => {
    expect(nysiisModified('Wright')).toBe('RAGT');
  });

  test('handles Z to S transformation (not first character)', () => {
    expect(nysiisModified('Zimmerman')).toBe('ZANARNAN');
    expect(nysiisModified('Zapata')).toBe('ZAPAT');
  });

  test('handles AY suffix transformation', () => {
    expect(nysiisModified('Taylor')).toBe('TALAR');
    expect(nysiisModified('Gray')).toBe('GRY');
    expect(nysiisModified('May')).toBe('MY');
  });

  test('removes trailing A', () => {
    expect(nysiisModified('Maria')).toBe('MAR');
    expect(nysiisModified('Anna')).toBe('AN');
    expect(nysiisModified('Diana')).toBe('DAN');
  });

  test('removes duplicate adjacent letters', () => {
    expect(nysiisModified('Mississippi')).toBe('MASASAP');
    expect(nysiisModified('Tennessee')).toBe('TANASY');
    expect(nysiisModified('Connecticut')).toBe('CANACTACAT');
  });

  test('handles case insensitivity', () => {
    expect(nysiisModified('smith')).toBe('SNATH');
    expect(nysiisModified('SMITH')).toBe('SNATH');
    expect(nysiisModified('SmItH')).toBe('SNATH');
  });

  test('handles names with apostrophes', () => {
    expect(nysiisModified("O'Brien")).toBe('OBRAN');
    expect(nysiisModified("D'Angelo")).toBe('DANGAL');
    expect(nysiisModified("O'Connor")).toBe('OCANAR');
  });

  test('handles whitespace', () => {
    expect(nysiisModified(' Smith ')).toBe('SNATH');
    expect(nysiisModified('  Johnson  ')).toBe('JANSAN');
  });

  test('handles empty whitespace', () => {
    expect(nysiisModified('   ')).toBe('');
    expect(nysiisModified('\t\n')).toBe('');
  });

  test('handles special characters', () => {
    expect(nysiisModified('Smith123')).toBe('SNATH');
    expect(nysiisModified('!@#')).toBe('');
    expect(nysiisModified('Brown-Smith')).toBe('BRANSNATH');
  });

  test('handles short names', () => {
    expect(nysiisModified('Li')).toBe('L');
    expect(nysiisModified('Wu')).toBe('W');
    expect(nysiisModified('Yu')).toBe('Y');
  });

  test('handles vowel-only names', () => {
    expect(nysiisModified('Aaa')).toBe('A');
    expect(nysiisModified('Eee')).toBe('EY');
    expect(nysiisModified('Iii')).toBe('I');
  });

  test('handles edge cases with single letters', () => {
    expect(nysiisModified('I')).toBe('I');
    expect(nysiisModified('E')).toBe('E');
    expect(nysiisModified('O')).toBe('O');
    expect(nysiisModified('U')).toBe('U');
  });

  test('handles names starting with vowels', () => {
    expect(nysiisModified('Adams')).toBe('ADAN');
    expect(nysiisModified('Evans')).toBe('EVAN');
    expect(nysiisModified('Irving')).toBe('IRVANG');
    expect(nysiisModified('Owen')).toBe('ON');
    expect(nysiisModified('Ulrich')).toBe('ULRACH');
  });

  test('handles compound transformations', () => {
    expect(nysiisModified('McPherson')).toBe('MCFARSAN');
    expect(nysiisModified('OKeeffe')).toBe('OCAF');
    expect(nysiisModified('DeAngelo')).toBe('DANGAL');
    expect(nysiisModified('VanZandt')).toBe('VANSAD');
  });

  test('handles names with repeated consonants', () => {
    expect(nysiisModified('Hoffman')).toBe('HAFNAN');
    expect(nysiisModified('Patterson')).toBe('PATARSAN');
    expect(nysiisModified('Williamson')).toBe('WALANSAN');
  });

  test('handles names ending with common suffixes', () => {
    expect(nysiisModified('Robertson')).toBe('RABARTSAN');
    expect(nysiisModified('Anderson')).toBe('ANDARSAN');
    expect(nysiisModified('Henderson')).toBe('HANDARSAN');
    expect(nysiisModified('Peterson')).toBe('PATARSAN');
  });

  test('handles unusual letter combinations', () => {
    expect(nysiisModified('Tschaikovsky')).toBe('TSCACAVSCY');
    expect(nysiisModified('Tchaikovsky')).toBe('TCACAVSCY');
    expect(nysiisModified('Djokovic')).toBe('DJACAVAC');
  });

  test('handles long names with multiple rules', () => {
    expect(nysiisModified('Konstantinopolous')).toBe('CANSTANTANAPAL');
    expect(nysiisModified('Wojciechowski')).toBe('WAJCACASC');
    expect(nysiisModified('Schwarzschild')).toBe('SWARSCALD');
  });

  test('handles trailing S and Z removal', () => {
    expect(nysiisModified('Davis')).toBe('DAV');
    expect(nysiisModified('Roberts')).toBe('RABAD');
    expect(nysiisModified('Sanchez')).toBe('SANC');
  });

  test('preserves first letter', () => {
    // First vowels should be preserved differently
    expect(nysiisModified('Adams')).toBe('ADAN');
    expect(nysiisModified('Edwards')).toBe('EDWAD');
    expect(nysiisModified('Irwin')).toBe('IRWAN');
  });

  test('handles multiple consecutive vowels', () => {
    expect(nysiisModified('Beaumont')).toBe('BANAD');
    expect(nysiisModified('Beau')).toBe('B');
    expect(nysiisModified('Queue')).toBe('Q');
  });

  test('handles specific real-world names', () => {
    expect(nysiisModified('Jackson')).toBe('JACSAN');
    expect(nysiisModified('Wilson')).toBe('WALSAN');
    expect(nysiisModified('Christopher')).toBe('CHRASTAFAR');
    expect(nysiisModified('Katherine')).toBe('CATARAN');
    expect(nysiisModified('Thompson')).toBe('TANPSAN');
    expect(nysiisModified('Hannah')).toBe('HAN');
    expect(nysiisModified('Parker')).toBe('PARCAR');
  });

  test('handles X transformations', () => {
    expect(nysiisModified('Xavier')).toBe('XAVAR');
    expect(nysiisModified('Maxwell')).toBe('MAXWAL');
    expect(nysiisModified('Alexander')).toBe('ALAXANDAR');
  });

  test('handles complex phonetic patterns', () => {
    expect(nysiisModified('Shakespeare')).toBe('SACASPAR');
    expect(nysiisModified('Churchill')).toBe('CARCAL');
    expect(nysiisModified('Roosevelt')).toBe('RASAFALT');
  });
});
