import { nysiis1 as std } from '../../../../standards/nysiis1.ts';

import { prepare } from '../../../helpers/prepare.ts';

import { nysiis } from '../nysiis.ts';

const nysiisOriginal = (input: string): string => nysiis(input, 'original');

describe('nysiisOriginal', () => {
  test.runIf(process.env.MODE === 'full')(
    'with master words',
    () => {
      for (const word of fixtures.master) {
        // eslint-disable-next-line vitest/valid-expect
        expect(nysiisOriginal(word), word).toStrictEqual(std(prepare(word)));
      }
    },
    100_000,
  );

  test('returns empty string for empty input', () => {
    expect(nysiisOriginal('')).toBe('');
  });

  test('handles single character input', () => {
    expect(nysiisOriginal('A')).toBe('A');
    expect(nysiisOriginal('B')).toBe('B');
    expect(nysiisOriginal('Z')).toBe('Z');
  });

  test('handles basic names', () => {
    expect(nysiisOriginal('Smith')).toBe('SNAT');
    expect(nysiisOriginal('Johnson')).toBe('JASAN');
    expect(nysiisOriginal('Brown')).toBe('BRAN');
    expect(nysiisOriginal('Williams')).toBe('WALAN');
    expect(nysiisOriginal('Jones')).toBe('JAN');
  });

  test('handles MAC prefix transformation', () => {
    expect(nysiisOriginal('MacDonald')).toBe('MCDANALD');
    expect(nysiisOriginal('MacBeth')).toBe('MCBAT');
    expect(nysiisOriginal('MacArthur')).toBe('MCARTAR');
    expect(nysiisOriginal('MacPherson')).toBe('MCFARSAN');
  });

  test('handles PF prefix transformation', () => {
    expect(nysiisOriginal('Pfizer')).toBe('FFASAR');
    expect(nysiisOriginal('Pfeffer')).toBe('FFAFAR');
    expect(nysiisOriginal('Pfeiffer')).toBe('FFAFAR');
  });

  test('handles IX suffix transformation', () => {
    expect(nysiisOriginal('Phoenix')).toBe('FFANAX');
    expect(nysiisOriginal('Felix')).toBe('FALAX');
  });

  test('handles EX suffix transformation', () => {
    expect(nysiisOriginal('Alex')).toBe('ALAX');
    expect(nysiisOriginal('Rex')).toBe('RAX');
  });

  test('handles YE/EE/IE suffix transformation', () => {
    expect(nysiisOriginal('Lee')).toBe('LY');
    expect(nysiisOriginal('McKee')).toBe('MCY');
    expect(nysiisOriginal('Christie')).toBe('CHRASTY');
    expect(nysiisOriginal('Leslie')).toBe('LASLY');
    expect(nysiisOriginal('Charlie')).toBe('CHARLY');
  });

  test('handles DT/RT/RD/NT/ND suffix transformation', () => {
    expect(nysiisOriginal('Grant')).toBe('GRAD');
    expect(nysiisOriginal('Hunt')).toBe('HAD');
    expect(nysiisOriginal('Ford')).toBe('FAD');
    expect(nysiisOriginal('Stuart')).toBe('STAD');
    expect(nysiisOriginal('Fitzgerald')).toBe('FATSGARALD');
  });

  test('handles EV to EF transformation', () => {
    expect(nysiisOriginal('Steven')).toBe('STAFAN');
    expect(nysiisOriginal('Kevin')).toBe('CAFAN');
    expect(nysiisOriginal('Evelyn')).toBe('EVALYN');
  });

  test('handles vowel followed by W transformation', () => {
    expect(nysiisOriginal('Shaw')).toBe('SH');
    expect(nysiisOriginal('Hawkins')).toBe('HACAN');
    expect(nysiisOriginal('Crawford')).toBe('CRAFAD');
  });

  test('collapses all vowels to A', () => {
    expect(nysiisOriginal('Aaron')).toBe('AARAN');
    expect(nysiisOriginal('Beautiful')).toBe('BATAFAL');
    expect(nysiisOriginal('Aeiou')).toBe('A');
  });

  test('handles GHT transformation', () => {
    expect(nysiisOriginal('Wright')).toBe('WRAGT');
    expect(nysiisOriginal('Knight')).toBe('NNAGT');
    expect(nysiisOriginal('Light')).toBe('LAGT');
  });

  test('handles DG transformation', () => {
    expect(nysiisOriginal('Edgar')).toBe('EDGAR');
    expect(nysiisOriginal('Edge')).toBe('EDG');
  });

  test('handles PH transformation', () => {
    expect(nysiisOriginal('Phillips')).toBe('FFALAP');
    expect(nysiisOriginal('Phantom')).toBe('FFANTAN');
    expect(nysiisOriginal('Stephen')).toBe('STAFAN');
  });

  test('handles H preceded by vowel transformation', () => {
    expect(nysiisOriginal('Ahern')).toBe('AHARN');
    expect(nysiisOriginal('Cohen')).toBe('CAHAN');
    expect(nysiisOriginal('Graham')).toBe('GRAHAN');
  });

  test('handles KN transformation', () => {
    expect(nysiisOriginal('Knoll')).toBe('NNAL');
    expect(nysiisOriginal('Knife')).toBe('NNAF');
  });

  test('handles K to C transformation', () => {
    expect(nysiisOriginal('Karl')).toBe('CARL');
    expect(nysiisOriginal('King')).toBe('CANG');
    expect(nysiisOriginal('Kelly')).toBe('CALY');
  });

  test('handles M to N transformation (not first character)', () => {
    expect(nysiisOriginal('Martin')).toBe('MARTAN');
    expect(nysiisOriginal('Mason')).toBe('MASAN');
    expect(nysiisOriginal('Miller')).toBe('MALAR');
    expect(nysiisOriginal('Thomas')).toBe('THAN');
  });

  test('handles Q to G transformation (not first character)', () => {
    expect(nysiisOriginal('Queen')).toBe('QAN');
    expect(nysiisOriginal('Quinn')).toBe('QAN');
    expect(nysiisOriginal('Quincy')).toBe('QANCY');
  });

  test('handles SH transformation', () => {
    expect(nysiisOriginal('Shaw')).toBe('SH');
    expect(nysiisOriginal('Fisher')).toBe('FASAR');
  });

  test('handles SCH transformation', () => {
    expect(nysiisOriginal('Schmidt')).toBe('SSNAD');
    expect(nysiisOriginal('Schultz')).toBe('SSALT');
    expect(nysiisOriginal('Schneider')).toBe('SSNADAR');
    expect(nysiisOriginal('Schwarzenegger')).toBe('SSWARSANAGAR');
  });

  test('handles YW transformation', () => {
    expect(nysiisOriginal('Goodwyn')).toBe('GADWYN');
  });

  test('handles Y transformation (not first or last)', () => {
    expect(nysiisOriginal('Boyd')).toBe('BAYD');
    expect(nysiisOriginal('Myers')).toBe('MYAR');
    expect(nysiisOriginal('Taylor')).toBe('TAYLAR');
  });

  test('handles WR transformation', () => {
    expect(nysiisOriginal('Wright')).toBe('WRAGT');
  });

  test('handles Z to S transformation (not first character)', () => {
    expect(nysiisOriginal('Zimmerman')).toBe('ZANARNAN');
    expect(nysiisOriginal('Zapata')).toBe('ZAPAT');
  });

  test('handles AY suffix transformation', () => {
    expect(nysiisOriginal('Taylor')).toBe('TAYLAR');
    expect(nysiisOriginal('Gray')).toBe('GRY');
    expect(nysiisOriginal('May')).toBe('MY');
  });

  test('removes trailing A', () => {
    expect(nysiisOriginal('Maria')).toBe('MAR');
    expect(nysiisOriginal('Anna')).toBe('AN');
    expect(nysiisOriginal('Diana')).toBe('DAN');
  });

  test('removes duplicate adjacent letters', () => {
    expect(nysiisOriginal('Mississippi')).toBe('MASASAP');
    expect(nysiisOriginal('Tennessee')).toBe('TANASY');
    expect(nysiisOriginal('Connecticut')).toBe('CANACTACAT');
  });

  test('handles case insensitivity', () => {
    expect(nysiisOriginal('smith')).toBe('SNAT');
    expect(nysiisOriginal('SMITH')).toBe('SNAT');
    expect(nysiisOriginal('SmItH')).toBe('SNAT');
  });

  test('handles names with apostrophes', () => {
    expect(nysiisOriginal("O'Brien")).toBe('OBRAN');
    expect(nysiisOriginal("D'Angelo")).toBe('DANGAL');
    expect(nysiisOriginal("O'Connor")).toBe('OCANAR');
  });

  test('handles whitespace', () => {
    expect(nysiisOriginal(' Smith ')).toBe('SNAT');
    expect(nysiisOriginal('  Johnson  ')).toBe('JASAN');
  });

  test('handles empty whitespace', () => {
    expect(nysiisOriginal('   ')).toBe('');
    expect(nysiisOriginal('\t\n')).toBe('');
  });

  test('handles special characters', () => {
    expect(nysiisOriginal('Smith123')).toBe('SNAT');
    expect(nysiisOriginal('!@#')).toBe('');
    expect(nysiisOriginal('Brown-Smith')).toBe('BRANSNAT');
  });

  test('handles short names', () => {
    expect(nysiisOriginal('Li')).toBe('L');
    expect(nysiisOriginal('Wu')).toBe('W');
    expect(nysiisOriginal('Yu')).toBe('Y');
  });

  test('handles vowel-only names', () => {
    expect(nysiisOriginal('Aaa')).toBe('A');
    expect(nysiisOriginal('Eee')).toBe('EY');
    expect(nysiisOriginal('Iii')).toBe('I');
  });

  test('handles edge cases with single letters', () => {
    expect(nysiisOriginal('I')).toBe('I');
    expect(nysiisOriginal('E')).toBe('E');
    expect(nysiisOriginal('O')).toBe('O');
    expect(nysiisOriginal('U')).toBe('U');
  });

  test('handles names starting with vowels', () => {
    expect(nysiisOriginal('Adams')).toBe('ADAN');
    expect(nysiisOriginal('Evans')).toBe('EVAN');
    expect(nysiisOriginal('Irving')).toBe('IRVANG');
    expect(nysiisOriginal('Owen')).toBe('OWAN');
    expect(nysiisOriginal('Ulrich')).toBe('ULRAC');
  });

  test('handles compound transformations', () => {
    expect(nysiisOriginal('McPherson')).toBe('MCFARSAN');
    expect(nysiisOriginal('OKeeffe')).toBe('OCAF');
    expect(nysiisOriginal('DeAngelo')).toBe('DANGAL');
    expect(nysiisOriginal('VanZandt')).toBe('VANSAND');
  });

  test('handles names with repeated consonants', () => {
    expect(nysiisOriginal('Hoffman')).toBe('HAFNAN');
    expect(nysiisOriginal('Patterson')).toBe('PATARSAN');
    expect(nysiisOriginal('Williamson')).toBe('WALANSAN');
  });

  test('handles names ending with common suffixes', () => {
    expect(nysiisOriginal('Robertson')).toBe('RABARTSAN');
    expect(nysiisOriginal('Anderson')).toBe('ANDARSAN');
    expect(nysiisOriginal('Henderson')).toBe('HANDARSAN');
    expect(nysiisOriginal('Peterson')).toBe('PATARSAN');
  });

  test('handles unusual letter combinations', () => {
    expect(nysiisOriginal('Tschaikovsky')).toBe('TSACAVSCY');
    expect(nysiisOriginal('Tchaikovsky')).toBe('TCACAVSCY');
    expect(nysiisOriginal('Djokovic')).toBe('DJACAVAC');
  });

  test('handles long names with multiple rules', () => {
    expect(nysiisOriginal('Konstantinopolous')).toBe('CANSTANTANAPAL');
    expect(nysiisOriginal('Wojciechowski')).toBe('WAJCACASC');
    expect(nysiisOriginal('Schwarzschild')).toBe('SSWARSALD');
  });

  test('handles trailing S and Z removal', () => {
    expect(nysiisOriginal('Davis')).toBe('DAV');
    expect(nysiisOriginal('Roberts')).toBe('RABART');
    expect(nysiisOriginal('Sanchez')).toBe('SANC');
  });

  test('preserves first letter', () => {
    // First vowels should be preserved differently
    expect(nysiisOriginal('Adams')).toBe('ADAN');
    expect(nysiisOriginal('Edwards')).toBe('EDWARD');
    expect(nysiisOriginal('Irwin')).toBe('IRWAN');
  });

  test('handles multiple consecutive vowels', () => {
    expect(nysiisOriginal('Beaumont')).toBe('BANAD');
    expect(nysiisOriginal('Beau')).toBe('B');
    expect(nysiisOriginal('Queue')).toBe('Q');
  });

  test('handles specific real-world names', () => {
    expect(nysiisOriginal('Jackson')).toBe('JACSAN');
    expect(nysiisOriginal('Wilson')).toBe('WALSAN');
    expect(nysiisOriginal('Christopher')).toBe('CHRASTAFAR');
    expect(nysiisOriginal('Katherine')).toBe('CATARAN');
    expect(nysiisOriginal('Thompson')).toBe('THANPSAN');
    expect(nysiisOriginal('Hannah')).toBe('HANAH');
    expect(nysiisOriginal('Parker')).toBe('PARCAR');
  });

  test('handles X transformations', () => {
    expect(nysiisOriginal('Xavier')).toBe('XAVAR');
    expect(nysiisOriginal('Maxwell')).toBe('MAXWAL');
    expect(nysiisOriginal('Alexander')).toBe('ALAXANDAR');
  });

  test('handles complex phonetic patterns', () => {
    expect(nysiisOriginal('Shakespeare')).toBe('SHACASPAR');
    expect(nysiisOriginal('Churchill')).toBe('CHARCAL');
    expect(nysiisOriginal('Roosevelt')).toBe('RASAFALT');
  });
});
