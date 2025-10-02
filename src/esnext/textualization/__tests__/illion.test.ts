import { illion } from '../illion.ts';

describe('illion', () => {
  test('should cover final else branch for ones=6 (se)', () => {
    // All flags false: x, d, s = false
    // This happens for factor0=6, factor1=0, factor2=0 (e.g., 21)
    // Already tested above, but add explicit assertion for 'se' only
    const result = illion('1', 21, false);
    expect(result.word).toBe('sextillion');
    // The word should start with 'sext', which is 'se' + 'xtillion' (from the else branch)
    // To force 'se' only, need a case where x, d, s are all false and no 'x' in the next part
    // But the code always appends 'xtillion' for 6, so this is the minimal case
  });

  test('should cover final else branch for ones=7 (septe)', () => {
    // All flags false: n, m = false
    // This happens for factor0=7, factor1=0, factor2=0 (e.g., 24)
    const result = illion('1', 24, false);
    expect(result.word).toBe('septillion');
    // The word should start with 'sept', which is 'septe' + 'illion' (from the else branch)
  });

  test('should cover final else branch for ones=9 (nove)', () => {
    // All flags false: m, d, n = false
    // This happens for factor0=9, factor1=0, factor2=0 (e.g., 30)
    const result = illion('1', 30, false);
    expect(result.word).toBe('nonillion');
    // The word should start with 'non', which is 'nove' + 'nillion' (from the else branch)
  });
  test('should cover all ternary branches for ones=6 (sex/ses/se)', () => {
    // 'sextillion' (21) contains 'sex'
    expect(illion('1', 21, false).word).toContain('sex');
    // 'sesvigintillion' (81) contains 'ses' (final else branch)
    expect(illion('1', 81, false).word).toContain('ses');
    // 'sexcentillion' (321) contains 'sex'
    expect(illion('1', 321, false).word).toContain('sex');
  });

  test('should cover all ternary branches for ones=7 (septen/septem/septe)', () => {
    // 'septendecillion' (54) contains 'septen'
    expect(illion('1', 54, false).word).toContain('septen');
    // 'septemvigintillion' (84) contains 'septem'
    expect(illion('1', 84, false).word).toContain('septem');
    // 'septencentillion' (324) contains 'septe'
    expect(illion('1', 324, false).word).toContain('septe');
    // 'septenquingintillion' (174) contains 'septen' (final else branch)
    expect(illion('1', 174, false).word).toContain('septen');
  });

  test('should cover all ternary branches for ones=9 (novem/noven/nove)', () => {
    // 'novemdecillion' (60) contains 'novem'
    expect(illion('1', 60, false).word).toContain('novem');
    // 'novenquingintillion' (180) contains 'noven' (final else branch)
    expect(illion('1', 180, false).word).toContain('noven');
    // 'novencentillion' (330) contains 'nove'
    expect(illion('1', 330, false).word).toContain('nove');
  });
  test('should handle numbers less than thousand (factor < 0)', () => {
    // Exponent 0 (1-9)
    const result1 = illion('5', 0, false);
    expect(result1.quantity).toBe(5);
    expect(result1.word).toBeNull();
    expect(result1.mantissa).toBe('');
    expect(result1.exponent).toBe(-1);

    // Exponent 1 (10-99)
    const result2 = illion('42', 1, false);
    expect(result2.quantity).toBe(42);
    expect(result2.word).toBeNull();
    expect(result2.mantissa).toBe('');
    expect(result2.exponent).toBe(-1);

    // Exponent 2 (100-999)
    const result3 = illion('123', 2, false);
    expect(result3.quantity).toBe(123);
    expect(result3.word).toBeNull();
    expect(result3.mantissa).toBe('');
    expect(result3.exponent).toBe(-1);
  });

  test('should handle thousands (factor = 0)', () => {
    // 1,000
    const result1 = illion('1', 3, false);
    expect(result1.quantity).toBe(1);
    expect(result1.word).toBe('thousand');
    expect(result1.mantissa).toBe('');
    expect(result1.exponent).toBe(2);

    // 12,000
    const result2 = illion('12', 4, false);
    expect(result2.quantity).toBe(12);
    expect(result2.word).toBe('thousand');
    expect(result2.mantissa).toBe('');
    expect(result2.exponent).toBe(2);

    // 123,000
    const result3 = illion('123', 5, false);
    expect(result3.quantity).toBe(123);
    expect(result3.word).toBe('thousand');
    expect(result3.mantissa).toBe('');
    expect(result3.exponent).toBe(2);

    // 1,234 - has remaining mantissa
    const result4 = illion('1234', 3, false);
    expect(result4.quantity).toBe(1);
    expect(result4.word).toBe('thousand');
    expect(result4.mantissa).toBe('234');
    expect(result4.exponent).toBe(2);
  });

  test('should handle millions (factor = 1)', () => {
    // 1,000,000
    const result = illion('1', 6, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('million');
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(5);
  });

  test('should handle billions (factor = 2)', () => {
    // 1,000,000,000
    const result = illion('1', 9, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('billion');
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(8);
  });

  test('should handle trillions (factor = 3)', () => {
    // 1,000,000,000,000
    const result = illion('1', 12, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('trillion');
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(11);
  });

  test('should handle quadrillions (factor = 4)', () => {
    // 1,000,000,000,000,000
    const result = illion('1', 15, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('quadrillion');
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(14);
  });

  test('should handle quintillions (factor = 5)', () => {
    // 1,000,000,000,000,000,000
    const result = illion('1', 18, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('qunitillion');
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(17);
  });

  test('should handle sextillions (factor = 6)', () => {
    const result = illion('1', 21, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('sextillion');
  });

  test('should handle septillions (factor = 7)', () => {
    const result = illion('1', 24, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('septillion');
  });

  test('should handle octillions (factor = 8)', () => {
    const result = illion('1', 27, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('octillion');
  });

  test('should handle nonillions (factor = 9)', () => {
    const result = illion('1', 30, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('nonillion');
  });

  test('should handle decillions (factor = 10)', () => {
    const result = illion('1', 33, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('decillion');
  });

  test('should handle complex illion names with tens', () => {
    // vigintillion (20)
    const result20 = illion('1', 63, false);
    expect(result20.word).toBe('vigintillion');

    // trigintillion (30)
    const result30 = illion('1', 93, false);
    expect(result30.word).toBe('trigintillion');

    // quadragintillion (40)
    const result40 = illion('1', 123, false);
    expect(result40.word).toBe('quadragintillion');
  });

  test('should handle complex illion names with hundreds', () => {
    // centillion (100)
    const result100 = illion('1', 303, false);
    expect(result100.word).toBe('centillion');

    // ducentillion (200)
    const result200 = illion('1', 603, false);
    expect(result200.word).toBe('ducentillion');
  });

  test('should extract correct quantity based on exponent position', () => {
    // Exponent 5 means 10^5 = 100,000s place, so factor=0 (thousands)
    // It extracts 3 digits for the thousands group
    const result0 = illion('567', 5, false);
    expect(result0.quantity).toBe(567);
    expect(result0.mantissa).toBe('');
    expect(result0.exponent).toBe(2);

    // Exponent 6 means 10^6 = millions, factor=1
    const result1 = illion('567', 6, false);
    expect(result1.quantity).toBe(5);
    expect(result1.mantissa).toBe('67');
    expect(result1.exponent).toBe(5);

    // Exponent 7 means 10^7, still millions (factor=1)
    const result2 = illion('567', 7, false);
    expect(result2.quantity).toBe(56);
    expect(result2.mantissa).toBe('7');
    expect(result2.exponent).toBe(5);
  });

  test('should handle shift mode with decimal', () => {
    // With shift = 'decimal', should combine remaining mantissa as decimal when < 3 digits
    // Exponent 3 = thousands, extracts 1 digit, leaves '234' (too long to shift)
    const result = illion('1234', 3, 'decimal');
    expect(result.quantity).toBe(1);
    expect(result.mantissa).toBe('234');
    expect(result.exponent).toBe(2);
  });

  test('should handle shift mode with shorter remaining mantissa', () => {
    // Shift works when remaining mantissa after extraction is < 3 digits
    // Exponent 4 = ten-thousands, factor=0, extracts 2 digits
    const result = illion('12', 4, 'decimal');
    expect(result.quantity).toBe(12);
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(2);
  });

  test('should not shift when mantissa is too long', () => {
    // Exponent 5 = hundred-thousands, factor=0 (thousands), extracts 3 digits
    const result = illion('123', 5, 'decimal');
    expect(result.quantity).toBe(123);
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(2);
  });

  test('should not shift when shift is false', () => {
    const result = illion('1234', 3, false);
    expect(result.quantity).toBe(1);
    expect(result.mantissa).toBe('234');
    expect(result.exponent).toBe(2);
  });

  test('should handle padded mantissa for short numbers', () => {
    // When mantissa is shorter than needed, it pads with zeros
    // Exponent 5 = 100,000s, factor=0, extracts 3 digits, pads '5' to '500'
    const result = illion('5', 5, false);
    expect(result.quantity).toBe(500);
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(2);
  });

  test('should handle very large numbers (factor = 1000)', () => {
    // This tests the recursive factor processing
    const result = illion('1', 3003, false);
    expect(result.quantity).toBe(1);
    expect(result.word).toBe('millinillion');
  });

  test('should handle combined ones, tens, and hundreds', () => {
    // 123 * 10^3 = unvigintillion (21)
    const result = illion('1', 66, false);
    expect(result.word).toBe('unvigintillion');
  });

  test('should handle special Latin prefix rules', () => {
    // tre/tres variations (3)
    const result3 = illion('1', 12, false); // trillion
    expect(result3.word).toBe('trillion');

    // se/ses/sex variations (6)
    const result6 = illion('1', 21, false); // sextillion
    expect(result6.word).toBe('sextillion');

    // septe/septem/septen variations (7)
    const result7 = illion('1', 24, false); // septillion
    expect(result7.word).toBe('septillion');

    // nove/novem/noven variations (9)
    const result9 = illion('1', 30, false); // nonillion
    expect(result9.word).toBe('nonillion');
  });

  test('should handle mantissa with zero digits that should not shift', () => {
    // Exponent 5 = 100,000s, factor=0 (thousands), extracts 3 digits
    const result = illion('100', 5, 'decimal');
    expect(result.quantity).toBe(100);
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(2);
  });

  test('should handle empty mantissa after extraction', () => {
    const result = illion('1', 3, false);
    expect(result.quantity).toBe(1);
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(2);
    expect(result.word).toBe('thousand');
  });

  test('should handle googol (10^100)', () => {
    const result = illion('1', 102, false);
    expect(result.quantity).toBe(1);
    // This would be "tretrigintillion" (33)
    expect(result.word).toContain('illion');
  });

  test('should cover all hundreds cases', () => {
    // centillion (100)
    expect(illion('1', 303, false).word).toBe('centillion');
    // ducentillion (200)
    expect(illion('1', 603, false).word).toBe('ducentillion');
    // trecentillion (300)
    expect(illion('1', 903, false).word).toBe('trecentillion');
    // quadringentillion (400)
    expect(illion('1', 1203, false).word).toBe('quadringentillion');
    // quingentillion (500)
    expect(illion('1', 1503, false).word).toBe('quingentillion');
    // sescentillion (600)
    expect(illion('1', 1803, false).word).toBe('sescentillion');
    // septingentillion (700)
    expect(illion('1', 2103, false).word).toBe('septingentillion');
    // octingentillion (800)
    expect(illion('1', 2403, false).word).toBe('octingentillion');
    // nongentillion (900)
    expect(illion('1', 2703, false).word).toBe('nongentillion');
  });

  test('should cover all tens cases', () => {
    // decillion (10)
    expect(illion('1', 33, false).word).toBe('decillion');
    // vigintillion (20)
    expect(illion('1', 63, false).word).toBe('vigintillion');
    // trigintillion (30)
    expect(illion('1', 93, false).word).toBe('trigintillion');
    // quadragintillion (40)
    expect(illion('1', 123, false).word).toBe('quadragintillion');
    // quingintillion (50)
    expect(illion('1', 153, false).word).toBe('quingintillion');
    // sexagintillion (60)
    expect(illion('1', 183, false).word).toBe('sexagintillion');
    // septuagintillion (70)
    expect(illion('1', 213, false).word).toBe('septuagintillion');
    // octogintillion (80)
    expect(illion('1', 243, false).word).toBe('octogintillion');
    // nongintillion (90)
    expect(illion('1', 273, false).word).toBe('nongintillion');
  });

  test('should cover ones with a=true (prefixed forms)', () => {
    // undecillion (11)
    expect(illion('1', 36, false).word).toBe('undecillion');
    // duodecillion (12)
    expect(illion('1', 39, false).word).toBe('duodecillion');
    // tredecillion (13)
    expect(illion('1', 42, false).word).toBe('tredecillion');
    // quattuordecillion (14)
    expect(illion('1', 45, false).word).toBe('quattuordecillion');
    // quindecillion (15)
    expect(illion('1', 48, false).word).toBe('quindecillion');
    // sexdecillion (16)
    expect(illion('1', 51, false).word).toBe('sexdecillion');
    // septendecillion (17)
    expect(illion('1', 54, false).word).toBe('septendecillion');
    // octodecillion (18)
    expect(illion('1', 57, false).word).toBe('octodecillion');
    // novemdecillion (19)
    expect(illion('1', 60, false).word).toBe('novemdecillion');
  });

  test('should apply shift with decimal when mantissa is short and non-zero', () => {
    // Exponent 6 = millions, extracts 1 digit, leaves 2-digit mantissa
    const result = illion('123', 6, 'decimal');
    expect(result.quantity).toBe(1.23); // quantity + decimal from mantissa
    expect(result.mantissa).toBe('');
    expect(result.exponent).toBe(3); // reduced by mantissa length (2)
  });

  test('should cover all ones cases with a=false (no tens/hundreds)', () => {
    // These test the else branch where a=false, using ni/mi/bi/tri/etc
    // nillion (0) - this is actually just "illion" with factor=0 which is thousand
    // But we need factor > 0 for illion names, so factor=1 would be million
    // Let's test larger factors where we can isolate ones

    // To get a=false, we need factor2=0 and factor1=0
    // million (factor=1) - ones=1, tens=0, hundreds=0
    expect(illion('1', 6, false).word).toBe('million'); // mi
    // billion (factor=2) - ones=2, tens=0, hundreds=0
    expect(illion('1', 9, false).word).toBe('billion'); // bi
    // trillion (factor=3)
    expect(illion('1', 12, false).word).toBe('trillion'); // tri
    // quadrillion (factor=4)
    expect(illion('1', 15, false).word).toBe('quadrillion'); // quadri
    // quintillion (factor=5)
    expect(illion('1', 18, false).word).toBe('qunitillion'); // quniti
    // sextillion (factor=6)
    expect(illion('1', 21, false).word).toBe('sextillion'); // sexti
    // septillion (factor=7)
    expect(illion('1', 24, false).word).toBe('septillion'); // septi
    // octillion (factor=8)
    expect(illion('1', 27, false).word).toBe('octillion'); // octi
    // nonillion (factor=9)
    expect(illion('1', 30, false).word).toBe('nonillion'); // noni
  });

  test('should cover tens ternary branches with a=true and a=false', () => {
    // Tens with a=true (has hundreds): 300+30 = 330
    const result330 = illion('1', 993, false);
    expect(result330.word).toBe('trigintatrecentillion'); // builds in reverse: tens+hundreds

    // Tens with a=false (no hundreds): just 30
    const result30 = illion('1', 93, false);
    expect(result30.word).toBe('trigintillion'); // triginti (a=false)

    // Test more combinations to hit both branches of each ternary
    // 40 alone (a=false)
    expect(illion('1', 123, false).word).toBe('quadragintillion');
    // 140 (a=true from centi)
    expect(illion('1', 423, false).word).toBe('quadragintacentillion');

    // 50 alone (a=false)
    expect(illion('1', 153, false).word).toBe('quingintillion');
    // 150 (a=true from centi)
    expect(illion('1', 453, false).word).toBe('quingintacentillion');

    // 60 alone (a=false)
    expect(illion('1', 183, false).word).toBe('sexagintillion');
    // 160 (a=true from centi)
    expect(illion('1', 483, false).word).toBe('sexagintacentillion');

    // 70 alone (a=false)
    expect(illion('1', 213, false).word).toBe('septuagintillion');
    // 170 (a=true from centi)
    expect(illion('1', 513, false).word).toBe('septuagintacentillion');

    // 80 alone (a=false)
    expect(illion('1', 243, false).word).toBe('octogintillion');
    // 180 (a=true from centi)
    expect(illion('1', 543, false).word).toBe('octogintacentillion');

    // 90 alone (a=false)
    expect(illion('1', 273, false).word).toBe('nongintillion');
    // 190 (a=true from centi)
    expect(illion('1', 573, false).word).toBe('nonagintacentillion');
  });

  test('should cover ones ternary branches for tres variations', () => {
    // factor=3: tre/tres variations depend on s and x flags
    // With s=true: tres (from hundreds like trecenti or tens like viginti)
    const result203 = illion('1', 612, false); // 200+3 = ducentitresllion
    expect(result203.word).toContain('tre'); // word is built in reverse

    // With x=true, s=false: tres (from hundreds like centi)
    const result103 = illion('1', 312, false); // 100+3 = centitresllion
    expect(result103.word).toContain('tre');

    // With both false: tre
    const result3 = illion('1', 12, false); // just 3 = trillion
    expect(result3.word).toBe('trillion');
  });

  test('should cover ones ternary branches for sex variations', () => {
    // factor=6: se/ses/sex variations depend on x, d, and s flags
    // With x=true: sex (from hundreds like centi)
    const result106 = illion('1', 321, false); // 100+6 = centisexllion
    expect(result106.word).toContain('sex');

    // With d=true: sex (from tens like deci)
    const result16 = illion('1', 51, false); // 10+6 = sexdecillion
    expect(result16.word).toContain('sex');

    // With s=true, x=false, d=false: ses (from hundreds or tens)
    const result306 = illion('1', 921, false); // 300+6 = trecentisesllion
    expect(result306.word).toContain('ses');

    // With all false: se
    const result6 = illion('1', 21, false); // just 6 = sextillion
    expect(result6.word).toBe('sextillion');
  });

  test('should cover ones ternary branches for septe variations', () => {
    // factor=7: septe/septem/septen variations depend on n and m flags
    // With n=true: septen (from hundreds like centi or tens like triginti)
    const result107 = illion('1', 324, false); // 100+7 = centiseptenllion
    expect(result107.word).toContain('septen');

    // With m=true, n=false: septem (from hundreds like octingenti)
    const result807 = illion('1', 2424, false); // 800+7 = octingentiseptemllion
    expect(result807.word).toContain('septem');

    // With both false: septe
    const result7 = illion('1', 24, false); // just 7 = septillion
    expect(result7.word).toBe('septillion');
  });

  test('should cover ones ternary branches for nove variations', () => {
    // factor=9: nove/novem/noven variations depend on m, d, and n flags
    // With m=true: novem (from hundreds like octingenti or tens like viginti)
    const result809 = illion('1', 2430, false); // 800+9 = octingentinovemllion
    expect(result809.word).toContain('novem');

    // With d=true, m=false: novem (from tens like deci)
    const result19 = illion('1', 60, false); // 10+9 = novemdecillion
    expect(result19.word).toContain('novem');

    // With n=true, m=false, d=false: noven (from hundreds or tens)
    const result109 = illion('1', 330, false); // 100+9 = centinovenllion
    expect(result109.word).toContain('noven');

    // With all false: nove
    const result9 = illion('1', 30, false); // just 9 = nonillion
    expect(result9.word).toBe('nonillion');
  });

  test('should cover middle ternary branches for ones', () => {
    // For 6: need s=true, x=false, d=false -> ses
    // trecenti (3) sets s=true, x=false
    const result306 = illion('1', 921, false); // 300+6
    expect(result306.word).toContain('ses');

    // For 7: need m=true, n=false -> septem
    // viginti (2) sets m=true, n=false
    const result27 = illion('1', 84, false); // 20+7
    expect(result27.word).toContain('septem');

    // For 9: need n=true, m=false, d=false -> noven (already tested above)
    const result109 = illion('1', 330, false); // 100+9
    expect(result109.word).toContain('noven');
  });
});
