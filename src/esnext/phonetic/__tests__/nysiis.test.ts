import { space } from '../../unicode/unicode.ts';

import { nysiis } from '../nysiis.ts';

describe('nysiis', () => {
  test('returns empty string for empty input', () => {
    expect(nysiis('')).toBe('');
  });

  test('handles single character input', () => {
    expect(nysiis('A')).toBe('A');
    expect(nysiis('B')).toBe('B');
  });

  test('handles basic names', () => {
    expect(nysiis('Smith')).toBe('SNAT');
    expect(nysiis('Johnson')).toBe('JASAN');
    expect(nysiis('Brown')).toBe('BRAN');
  });

  test('handles MAC prefix', () => {
    expect(nysiis('MacDonald')).toBe('MCDANALD');
    expect(nysiis('MacBeth')).toBe('MCBAT');
    expect(nysiis('MacArthur')).toBe('MCARTAR');
  });

  test('handles KN prefix', () => {
    expect(nysiis('Knight')).toBe('NNAGT');
    expect(nysiis('Knoll')).toBe('NNAL');
    expect(nysiis('Knife')).toBe('NNAF');
  });

  test('handles K prefix', () => {
    expect(nysiis('Karl')).toBe('CARL');
    expect(nysiis('King')).toBe('CANG');
    expect(nysiis('Kelly')).toBe('CALY');
  });

  test('handles PH prefix', () => {
    expect(nysiis('Phillips')).toBe('FFALAP');
    expect(nysiis('Phoenix')).toBe('FFANAX');
    expect(nysiis('Phantom')).toBe('FFANTAN');
  });

  test('handles PF prefix', () => {
    expect(nysiis('Pfizer')).toBe('FFASAR');
    expect(nysiis('Pfeffer')).toBe('FFAFAR');
  });

  test('handles SCH prefix', () => {
    expect(nysiis('Schmidt')).toBe('SSNAD');
    expect(nysiis('Schultz')).toBe('SSALT');
    expect(nysiis('Schneider')).toBe('SSNADAR');
  });

  test('handles EE suffix', () => {
    expect(nysiis('Lee')).toBe('LY');
    expect(nysiis('McKee')).toBe('MCY');
    expect(nysiis('Spree')).toBe('SPRY');
  });

  test('handles IE suffix', () => {
    expect(nysiis('Christie')).toBe('CHRASTY');
    expect(nysiis('Leslie')).toBe('LASLY');
    expect(nysiis('Charlie')).toBe('CHARLY');
  });

  test('handles DT/RT/RD/NT/ND suffix', () => {
    expect(nysiis('Grant')).toBe('GRAD');
    expect(nysiis('Hunt')).toBe('HAD');
    expect(nysiis('Ford')).toBe('FAD');
    expect(nysiis('Stuart')).toBe('STAD');
  });

  test('handles case insensitivity', () => {
    expect(nysiis('smith')).toBe('SNAT');
    expect(nysiis('SMITH')).toBe('SNAT');
    expect(nysiis('SmItH')).toBe('SNAT');
  });

  test('handles names with apostrophes', () => {
    expect(nysiis("O'Brien")).toBe('OBRAN');
    expect(nysiis("D'Angelo")).toBe('DANGAL');
    expect(nysiis("O'Connor")).toBe('OCANAR');
  });

  test('handles whitespace', () => {
    expect(nysiis(' Smith ')).toBe('SNAT');
    expect(nysiis('  Johnson  ')).toBe('JASAN');
  });

  test('handles empty whitespace', () => {
    expect(nysiis(space.repeat(3))).toBe('');
    expect(nysiis('\t\n')).toBe('');
  });

  test('handles special characters', () => {
    expect(nysiis('Smith123')).toBe('SNAT');
    expect(nysiis('!@#')).toBe('');
    expect(nysiis('Brown-Smith')).toBe('BRANSNAT');
  });

  test('handles short names', () => {
    expect(nysiis('Li')).toBe('L');
    expect(nysiis('Wu')).toBe('W');
    expect(nysiis('Yu')).toBe('Y');
  });

  test('handles vowel-only names', () => {
    expect(nysiis('Aaa')).toBe('A');
    expect(nysiis('Eee')).toBe('EY');
    expect(nysiis('Iii')).toBe('I');
  });

  test('similar names produce same codes', () => {
    // Note: Some similar names may produce different codes in this implementation
    expect(nysiis('Brown')).toBe(nysiis('Braun'));
  });

  test('handles H removal rules', () => {
    expect(nysiis('Ahern')).toBe('AHARN');
    expect(nysiis('Cohen')).toBe('CAHAN');
    expect(nysiis('Graham')).toBe('GRAHAN');
  });

  test('handles Q to G transformation', () => {
    expect(nysiis('Queen')).toBe('QAN');
    expect(nysiis('Quinn')).toBe('QAN');
    expect(nysiis('Quincy')).toBe('QANCY');
  });

  test('handles Z to S transformation', () => {
    expect(nysiis('Zimmerman')).toBe('ZANARNAN');
    expect(nysiis('Zapata')).toBe('ZAPAT');
  });

  test('handles M to N transformation', () => {
    expect(nysiis('Martin')).toBe('MARTAN');
    expect(nysiis('Mason')).toBe('MASAN');
  });

  test('handles consecutive duplicate removal', () => {
    expect(nysiis('Mississippi')).toBe('MASASAP');
    expect(nysiis('Illinois')).toBe('ILAN');
  });

  test('handles trailing S removal', () => {
    expect(nysiis('Williams')).toBe('WALAN');
    expect(nysiis('Jones')).toBe('JAN');
    expect(nysiis('Davis')).toBe('DAV');
  });

  test('handles AY to Y and A removal', () => {
    expect(nysiis('Taylor')).toBe('TAYLAR');
    expect(nysiis('Maria')).toBe('MAR');
    expect(nysiis('Garcia')).toBe('GARC');
  });

  test('specific name tests', () => {
    expect(nysiis('Jackson')).toBe('JACSAN');
    expect(nysiis('Wilson')).toBe('WALSAN');
    expect(nysiis('Anderson')).toBe('ANDARSAN');
    expect(nysiis('Miller')).toBe('MALAR');
    expect(nysiis('Christopher')).toBe('CHRASTAFAR');
    expect(nysiis('Katherine')).toBe('CATARAN');
    expect(nysiis('Thompson')).toBe('THANPSAN');
    expect(nysiis('Hannah')).toBe('HANAH');
    expect(nysiis('Parker')).toBe('PARCAR');
  });

  test('handles EV to AF transformation', () => {
    expect(nysiis('Steven')).toBe('STAFAN');
    expect(nysiis('Kevin')).toBe('CAFAN');
    expect(nysiis('Evelyn')).toBe('EVALYN');
  });

  test('handles vowel consolidation', () => {
    expect(nysiis('Aaron')).toBe('AARAN');
    expect(nysiis('Beautiful')).toBe('BATAFAL');
    expect(nysiis('Aeiou')).toBe('A');
  });

  test('handles AW to A transformation', () => {
    expect(nysiis('Shaw')).toBe('SH');
    expect(nysiis('Hawkins')).toBe('HACAN');
    expect(nysiis('Crawford')).toBe('CRAFAD');
  });

  test('complex names with multiple transformations', () => {
    expect(nysiis('Schwarzenegger')).toBe('SSWARSANAGAR');
    expect(nysiis('Kowalkowski')).toBe('CALCASC');
    expect(nysiis('MacPherson')).toBe('MCFARSAN');
  });

  test('edge cases with single letters', () => {
    expect(nysiis('I')).toBe('I');
    expect(nysiis('E')).toBe('E');
    expect(nysiis('O')).toBe('O');
    expect(nysiis('U')).toBe('U');
  });

  test('handles names starting with vowels', () => {
    expect(nysiis('Adams')).toBe('ADAN');
    expect(nysiis('Evans')).toBe('EVAN');
    expect(nysiis('Irving')).toBe('IRVANG');
    expect(nysiis('Owen')).toBe('OWAN');
    expect(nysiis('Ulrich')).toBe('ULRAC');
  });

  test('handles compound transformations', () => {
    expect(nysiis('McPherson')).toBe('MCFARSAN');
    expect(nysiis('OKeeffe')).toBe('OCAF');
    expect(nysiis('DeAngelo')).toBe('DANGAL');
    expect(nysiis('VanZandt')).toBe('VANSAND');
  });

  test('handles X transformations', () => {
    expect(nysiis('Xavier')).toBe('XAVAR');
    expect(nysiis('Maxwell')).toBe('MAXWAL');
    expect(nysiis('Alexander')).toBe('ALAXANDAR');
  });

  test('handles Y transformations', () => {
    expect(nysiis('Young')).toBe('YANG');
    expect(nysiis('Myers')).toBe('MYAR');
    expect(nysiis('Boyd')).toBe('BAYD');
  });

  test('handles W transformations', () => {
    expect(nysiis('Williams')).toBe('WALAN');
    expect(nysiis('Watson')).toBe('WATSAN');
    expect(nysiis('Wright')).toBe('WRAGT');
  });

  test('handles long names with multiple rules', () => {
    expect(nysiis('Konstantinopolous')).toBe('CANSTANTANAPAL');
    expect(nysiis('Wojciechowski')).toBe('WAJCACASC');
    expect(nysiis('Schwarzschild')).toBe('SSWARSALD');
  });

  test('handles names with repeated consonants', () => {
    expect(nysiis('Hoffman')).toBe('HAFNAN');
    expect(nysiis('Patterson')).toBe('PATARSAN');
    expect(nysiis('Williamson')).toBe('WALANSAN');
  });

  test('handles names ending with common suffixes', () => {
    expect(nysiis('Robertson')).toBe('RABARTSAN');
    expect(nysiis('Anderson')).toBe('ANDARSAN');
    expect(nysiis('Henderson')).toBe('HANDARSAN');
    expect(nysiis('Peterson')).toBe('PATARSAN');
  });

  test('handles unusual letter combinations', () => {
    expect(nysiis('Tschaikovsky')).toBe('TSACAVSCY');
    expect(nysiis('Tchaikovsky')).toBe('TCACAVSCY');
    expect(nysiis('Djokovic')).toBe('DJACAVAC');
  });

  test('handles very short inputs', () => {
    expect(nysiis('X')).toBe('X');
    expect(nysiis('Q')).toBe('Q');
    expect(nysiis('Z')).toBe('Z');
  });

  test('handles multiple consecutive vowels', () => {
    expect(nysiis('Beaumont')).toBe('BANAD');
    expect(nysiis('Beau')).toBe('B');
    expect(nysiis('Queue')).toBe('Q');
  });
});
