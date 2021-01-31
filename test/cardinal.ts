import 'mocha';
import { expect }   from 'chai';
import cardinal, { orderOfMagnitude, summarize }   from '../src/cardinal';

describe(
    'cardinal',
    () => {
        it(
            'should handle simple numbers',
            () => {
                expect(cardinal(0)).to.equal('zero');
                expect(cardinal(1)).to.equal('one');
                expect(cardinal(10)).to.equal('ten');
                expect(cardinal(11)).to.equal('eleven');
                expect(cardinal(123)).to.equal('one hundred twenty three');
                expect(cardinal(1234)).to.equal('one thousand two hundred thirty four');
                expect(cardinal(12345)).to.equal('twelve thousand three hundred forty five');
                expect(cardinal(123456)).to.equal('one hundred twenty three thousand four hundred fifty six');
                expect(cardinal(12345678)).to.equal('twelve million three hundred forty five thousand six hundred seventy eight');
                expect(cardinal(123456789)).to.equal('one hundred twenty three million four hundred fifty six thousand seven hundred eighty nine');
                expect(cardinal(1234567890)).to.equal('one billion two hundred thirty four million five hundred sixty seven thousand eight hundred ninety');
                expect(cardinal(12345678901)).to.equal('twelve billion three hundred forty five million six hundred seventy eight thousand nine hundred one');
            }
        );

        it(
            'should handle unusual numbers',
            () => {
                expect(cardinal(Infinity)).to.equal('infinity');
                expect(cardinal(NaN)).to.equal('not a number');
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(cardinal(-123)).to.equal('negative one hundred twenty three');
                expect(cardinal(-Infinity)).to.equal('negative infinity');
            }
        );

        it(
            'should handle large numbers',
            () => {
                expect(cardinal(1e100)).to.equal('ten duotrigintillion');
                expect(cardinal(1e200)).to.equal('one hundred quinquasexagintillion');
                expect(cardinal(1e300)).to.equal('one novenongintillion');
                expect(cardinal(1e303)).to.equal('one centillion');
                expect(
                    cardinal(Number.MAX_SAFE_INTEGER)
                // eslint-disable-next-line max-len
                ).to.equal('nine quadrillion seven trillion one hundred ninety nine billion two hundred fifty four million seven hundred forty thousand nine hundred ninety one');

                expect(
                    cardinal(Number.MAX_VALUE)
                // eslint-disable-next-line max-len
                ).to.equal('one hundred seventy nine uncentillion seven hundred sixty nine centillion three hundred thirteen novenongintillion four hundred eighty six octonongintillion two hundred thirty one septenongintillion six senongintillion');
                //Avogadro's Number
                expect(cardinal(6.02214e23)).to.equal('six hundred two sextillion two hundred fourteen qunitillion');
                //Angstroms in a parsec
                expect(cardinal(3.08567782e+26)).to.equal('three hundred eight septillion five hundred sixty seven sextillion seven hundred eighty two qunitillion');
            }
        );

        it(
            'should process the "and" and "hyphen" options',
            () => {
                expect(cardinal(100)).to.equal('one hundred');
                expect(cardinal(101)).to.equal('one hundred one');
                expect(cardinal(100, { and: 'and' })).to.equal('one hundred');
                expect(cardinal(101, { and: 'and' })).to.equal('one hundred and one');

                expect(cardinal(20)).to.equal('twenty');
                expect(cardinal(21)).to.equal('twenty one');
                expect(cardinal(20, { hyphen: '-' })).to.equal('twenty');
                expect(cardinal(21, { hyphen: '-' })).to.equal('twenty-one');
            }
        );

        it(
            'should honor the digits option',
            () => {
                expect(cardinal(1e6, { digits: true })).to.equal('1 million');
                expect(cardinal(1.23456789e45, { digits: true })).to.equal('1 quattuordecillion 234 tredecillion 567 duodecillion 890 undecillion');
            }
        );

        it(
            'should limit groups',
            () => {
                expect(cardinal(1, { groups: 1 })).to.equal('one');
                expect(cardinal(11, { groups: 1 })).to.equal('eleven');
                expect(cardinal(111, { groups: 1 })).to.equal('one hundred eleven');
                expect(cardinal(1111, { groups: 1 })).to.equal('one thousand');
                expect(cardinal(11111, { groups: 1 })).to.equal('eleven thousand');
                expect(cardinal(111111, { groups: 1 })).to.equal('one hundred eleven thousand');
                expect(cardinal(1111111, { groups: 1 })).to.equal('one million');

                expect(cardinal(1, { groups: 2 })).to.equal('one');
                expect(cardinal(11, { groups: 2 })).to.equal('eleven');
                expect(cardinal(111, { groups: 2 })).to.equal('one hundred eleven');
                expect(cardinal(1111, { groups: 2 })).to.equal('one thousand one hundred eleven');
                expect(cardinal(11111, { groups: 2 })).to.equal('eleven thousand one hundred eleven');
                expect(cardinal(111111, { groups: 2 })).to.equal('one hundred eleven thousand one hundred eleven');
                expect(cardinal(1111111, { groups: 2 })).to.equal('one million one hundred eleven thousand');
            }
        );

        it(
            'should round groups',
            () => {
                expect(cardinal(9, { groups: 1 })).to.equal('nine');
                expect(cardinal(99, { groups: 1 })).to.equal('ninety nine');
                expect(cardinal(999, { groups: 1 })).to.equal('nine hundred ninety nine');
                expect(cardinal(9999, { groups: 1 })).to.equal('ten thousand');
                expect(cardinal(99999, { groups: 1 })).to.equal('one hundred thousand');
                expect(cardinal(999999, { groups: 1 })).to.equal('one million');
                expect(cardinal(9999999, { groups: 1 })).to.equal('ten million');
                expect(cardinal(99999999, { groups: 1 })).to.equal('one hundred million');
                expect(cardinal(999999999, { groups: 1 })).to.equal('one billion');

                expect(cardinal(9, { groups: 2 })).to.equal('nine');
                expect(cardinal(99, { groups: 2 })).to.equal('ninety nine');
                expect(cardinal(999, { groups: 2 })).to.equal('nine hundred ninety nine');
                expect(cardinal(9999, { groups: 2 })).to.equal('nine thousand nine hundred ninety nine');
                expect(cardinal(99999, { groups: 2 })).to.equal('ninety nine thousand nine hundred ninety nine');
                expect(cardinal(999999, { groups: 2 })).to.equal('nine hundred ninety nine thousand nine hundred ninety nine');
                expect(cardinal(9999999, { groups: 2 })).to.equal('ten million');
                expect(cardinal(99999999, { groups: 2 })).to.equal('one hundred million');
                expect(cardinal(999999999, { groups: 2 })).to.equal('one billion');
            }
        );
    }
);

describe(
    'orderOfMagnitude',
    () => {
        it(
            'should describe orders of magnitude',
            () => {
                expect(orderOfMagnitude(0)).to.equal(null);
                expect(orderOfMagnitude(3)).to.equal('thousand');
                expect(orderOfMagnitude(6)).to.equal('million');
                expect(orderOfMagnitude(303)).to.equal('centillion');
                expect(orderOfMagnitude(Number.MAX_SAFE_INTEGER)).to.equal('trillibillinovenonagintatrecentilliunquinquagintaseptingentillioctogintaquingentillinovemvigintitrecentillion');
            }
        );
    }
);

describe(
    'summarize',
    () => {
        it(
            'should generate a short numeric description',
            () => {
                expect(summarize(Number.MAX_SAFE_INTEGER)).to.equal('9 quadrillion');
            }
        );
    }
);
