import expect from '../util/expect';
import cardinal, { orderOfMagnitude, summarize }   from '../src/cardinal';

describe(
    'cardinal',
    () => {
        test(
            'should handle simple numbers',
            () => {
                expect(cardinal(0)).toBe('zero');
                expect(cardinal(1)).toBe('one');
                expect(cardinal(10)).toBe('ten');
                expect(cardinal(11)).toBe('eleven');
                expect(cardinal(100)).toBe('one hundred');
                expect(cardinal(101)).toBe('one hundred one');
                expect(cardinal(123)).toBe('one hundred twenty three');
                expect(cardinal(1000)).toBe('one thousand');
                expect(cardinal(1001)).toBe('one thousand one');
                expect(cardinal(1234)).toBe('one thousand two hundred thirty four');
                expect(cardinal(12345)).toBe('twelve thousand three hundred forty five');
                expect(cardinal(123456)).toBe('one hundred twenty three thousand four hundred fifty six');
                expect(cardinal(1000000)).toBe('one million');
                expect(cardinal(1000001)).toBe('one million one');
                expect(cardinal(12345678)).toBe(
                    'twelve million three hundred forty five thousand six hundred seventy eight'
                );
                expect(cardinal(123456789)).toBe(
                    'one hundred twenty three million four hundred fifty six thousand seven hundred eighty nine'
                );
                expect(cardinal(1234567890)).toBe(
                    'one billion two hundred thirty four million five hundred sixty seven thousand eight hundred ninety'
                );
                expect(cardinal(12345678901)).toBe(
                    'twelve billion three hundred forty five million six hundred seventy eight thousand nine hundred one'
                );
            }
        );

        test(
            'should handle unusual numbers',
            () => {
                expect(cardinal(Infinity)).toBe('infinity');
                expect(cardinal(NaN)).toBe('not a number');
            }
        );

        test(
            'should handle negative numbers',
            () => {
                expect(cardinal(-123)).toBe('negative one hundred twenty three');
                expect(cardinal(-Infinity)).toBe('negative infinity');
            }
        );

        test(
            'should handle large numbers',
            () => {
                expect(cardinal(1e100)).toBe('ten duotrigintillion');
                expect(cardinal(1e200)).toBe('one hundred quinquasexagintillion');
                expect(cardinal(1e300)).toBe('one novenongintillion');
                expect(cardinal(1e303)).toBe('one centillion');
                expect(
                    cardinal(Number.MAX_SAFE_INTEGER)
                ).toBe(
                    'nine quadrillion seven trillion one hundred ninety nine billion two hundred fifty four million seven hundred forty thousand nine hundred ninety one'
                );

                expect(
                    cardinal(Number.MAX_VALUE)
                ).toBe(
                    'one hundred seventy nine uncentillion seven hundred sixty nine centillion three hundred thirteen novenongintillion four hundred eighty six octonongintillion two hundred thirty one septenongintillion six senongintillion'
                );
                //Avogadro's Number
                expect(cardinal(6.02214e23)).toBe('six hundred two sextillion two hundred fourteen qunitillion');
                //Angstroms in a parsec
                expect(cardinal(3.08567782e+26)).toBe(
                    'three hundred eight septillion five hundred sixty seven sextillion seven hundred eighty two qunitillion'
                );
            }
        );

        test(
            'should process the "and" and "hyphen" options',
            () => {
                expect(cardinal(100)).toBe('one hundred');
                expect(cardinal(101)).toBe('one hundred one');
                expect(cardinal(100, { and: 'and' })).toBe('one hundred');
                expect(cardinal(101, { and: 'and' })).toBe('one hundred and one');

                expect(cardinal(20)).toBe('twenty');
                expect(cardinal(21)).toBe('twenty one');
                expect(cardinal(20, { hyphen: '-' })).toBe('twenty');
                expect(cardinal(21, { hyphen: '-' })).toBe('twenty-one');
            }
        );

        test(
            'should honor the digits option',
            () => {
                expect(cardinal(1e6, { digits: true })).toBe('1 million');
                expect(cardinal(1.23456789e45, { digits: true })).toBe('1 quattuordecillion 234 tredecillion 567 duodecillion 890 undecillion');
            }
        );

        test(
            'should limit groups',
            () => {
                expect(cardinal(1, { groups: 1 })).toBe('one');
                expect(cardinal(11, { groups: 1 })).toBe('eleven');
                expect(cardinal(111, { groups: 1 })).toBe('one hundred eleven');
                expect(cardinal(1111, { groups: 1 })).toBe('one thousand');
                expect(cardinal(11111, { groups: 1 })).toBe('eleven thousand');
                expect(cardinal(111111, { groups: 1 })).toBe('one hundred eleven thousand');
                expect(cardinal(1111111, { groups: 1 })).toBe('one million');

                expect(cardinal(1, { groups: 2 })).toBe('one');
                expect(cardinal(11, { groups: 2 })).toBe('eleven');
                expect(cardinal(111, { groups: 2 })).toBe('one hundred eleven');
                expect(cardinal(1111, { groups: 2 })).toBe('one thousand one hundred eleven');
                expect(cardinal(11111, { groups: 2 })).toBe('eleven thousand one hundred eleven');
                expect(cardinal(111111, { groups: 2 })).toBe('one hundred eleven thousand one hundred eleven');
                expect(cardinal(1111111, { groups: 2 })).toBe('one million one hundred eleven thousand');
            }
        );

        test(
            'should round groups',
            () => {
                expect(cardinal(9, { groups: 1 })).toBe('nine');
                expect(cardinal(99, { groups: 1 })).toBe('ninety nine');
                expect(cardinal(999, { groups: 1 })).toBe('nine hundred ninety nine');
                expect(cardinal(9999, { groups: 1 })).toBe('ten thousand');
                expect(cardinal(99999, { groups: 1 })).toBe('one hundred thousand');
                expect(cardinal(999999, { groups: 1 })).toBe('one million');
                expect(cardinal(9999999, { groups: 1 })).toBe('ten million');
                expect(cardinal(99999999, { groups: 1 })).toBe('one hundred million');
                expect(cardinal(999999999, { groups: 1 })).toBe('one billion');

                expect(cardinal(9, { groups: 2 })).toBe('nine');
                expect(cardinal(99, { groups: 2 })).toBe('ninety nine');
                expect(cardinal(999, { groups: 2 })).toBe('nine hundred ninety nine');
                expect(cardinal(9999, { groups: 2 })).toBe('nine thousand nine hundred ninety nine');
                expect(cardinal(99999, { groups: 2 })).toBe('ninety nine thousand nine hundred ninety nine');
                expect(cardinal(999999, { groups: 2 })).toBe('nine hundred ninety nine thousand nine hundred ninety nine');
                expect(cardinal(9999999, { groups: 2 })).toBe('ten million');
                expect(cardinal(99999999, { groups: 2 })).toBe('one hundred million');
                expect(cardinal(999999999, { groups: 2 })).toBe('one billion');
            }
        );

        test(
            'should handle illions',
            () => {
                expect(cardinal(9)).toBe('nine');
                expect(cardinal(99, { groups: 2 })).toBe('ninety nine');
                expect(cardinal(999, { groups: 2 })).toBe('nine hundred ninety nine');
                expect(cardinal(9999, { groups: 2 })).toBe('nine thousand nine hundred ninety nine');
                expect(cardinal(99999, { groups: 2 })).toBe('ninety nine thousand nine hundred ninety nine');
                expect(cardinal(999999, { groups: 2 })).toBe('nine hundred ninety nine thousand nine hundred ninety nine');
                expect(cardinal(9999999, { groups: 2 })).toBe('ten million');
                expect(cardinal(99999999, { groups: 2 })).toBe('one hundred million');
                expect(cardinal(999999999, { groups: 2 })).toBe('one billion');
            }
        );
    }
);

describe(
    'orderOfMagnitude',
    () => {
        test(
            'should describe orders of magnitude',
            () => {
                expect(orderOfMagnitude(0)).toBe(null);
                expect(orderOfMagnitude(3)).toBe('thousand');
                expect(orderOfMagnitude(6)).toBe('million');
                expect(orderOfMagnitude(9)).toBe('billion');
                expect(orderOfMagnitude(12)).toBe('trillion');
                expect(orderOfMagnitude(15)).toBe('quadrillion');
                expect(orderOfMagnitude(18)).toBe('qunitillion');
                expect(orderOfMagnitude(21)).toBe('sextillion');
                expect(orderOfMagnitude(24)).toBe('septillion');
                expect(orderOfMagnitude(27)).toBe('octillion');
                expect(orderOfMagnitude(30)).toBe('nonillion');
                expect(orderOfMagnitude(33)).toBe('decillion');
                expect(orderOfMagnitude(63)).toBe('vigintillion');
                expect(orderOfMagnitude(66)).toBe('unvigintillion');
                expect(orderOfMagnitude(69)).toBe('duovigintillion');
                expect(orderOfMagnitude(72)).toBe('tresvigintillion');
                expect(orderOfMagnitude(75)).toBe('quattuorvigintillion');
                expect(orderOfMagnitude(78)).toBe('quinquavigintillion');
                expect(orderOfMagnitude(81)).toBe('sesvigintillion');
                expect(orderOfMagnitude(84)).toBe('septemvigintillion');
                expect(orderOfMagnitude(87)).toBe('octovigintillion');
                expect(orderOfMagnitude(90)).toBe('novemvigintillion');
                expect(orderOfMagnitude(93)).toBe('trigintillion');
                expect(orderOfMagnitude(123)).toBe('quadragintillion');
                expect(orderOfMagnitude(153)).toBe('quinquagintillion');
                expect(orderOfMagnitude(183)).toBe('sexagintillion');
                expect(orderOfMagnitude(213)).toBe('septuagintillion');
                expect(orderOfMagnitude(243)).toBe('octogintillion');
                expect(orderOfMagnitude(273)).toBe('nongintillion');
                expect(orderOfMagnitude(303)).toBe('centillion');
                expect(orderOfMagnitude(306)).toBe('uncentillion');
                expect(orderOfMagnitude(309)).toBe('duocentillion');
                expect(orderOfMagnitude(312)).toBe('trescentillion');
                expect(orderOfMagnitude(315)).toBe('quattuorcentillion');
                expect(orderOfMagnitude(318)).toBe('quinquacentillion');
                expect(orderOfMagnitude(321)).toBe('sexcentillion');
                expect(orderOfMagnitude(324)).toBe('septencentillion');
                expect(orderOfMagnitude(327)).toBe('octocentillion');
                expect(orderOfMagnitude(330)).toBe('novencentillion');
                expect(orderOfMagnitude(333)).toBe('decicentillion');
                expect(orderOfMagnitude(363)).toBe('viginticentillion');
                expect(orderOfMagnitude(393)).toBe('trigintacentillion');
                expect(orderOfMagnitude(423)).toBe('quadragintacentillion');
                expect(orderOfMagnitude(453)).toBe('quinquagintacentillion');
                expect(orderOfMagnitude(483)).toBe('sexagintacentillion');
                expect(orderOfMagnitude(513)).toBe('septuagintacentillion');
                expect(orderOfMagnitude(543)).toBe('octogintacentillion');
                expect(orderOfMagnitude(573)).toBe('nonagintacentillion');
                expect(orderOfMagnitude(603)).toBe('ducentillion');
                expect(orderOfMagnitude(903)).toBe('trecentillion');
                expect(orderOfMagnitude(1203)).toBe('quadringentillion');
                expect(orderOfMagnitude(1503)).toBe('quingentillion');
                expect(orderOfMagnitude(1803)).toBe('sescentillion');
                expect(orderOfMagnitude(2103)).toBe('septingentillion');
                expect(orderOfMagnitude(2403)).toBe('octingentillion');
                expect(orderOfMagnitude(2703)).toBe('nongentillion');
                expect(orderOfMagnitude(3003)).toBe('millinillion');
                expect(orderOfMagnitude(Number.MAX_SAFE_INTEGER)).toBe(
                    'trillibillinovenonagintatrecentilliunquinquagintaseptingentillioctogintaquingentillinovemvigintitrecentillion'
                );
            }
        );
    }
);

describe(
    'summarize',
    () => {
        test(
            'should generate a short numeric description',
            () => {
                expect(summarize(Number.MAX_SAFE_INTEGER)).toBe('9 quadrillion');
            }
        );
    }
);
