import expect from '@util/expect';
import numberToLetter from '../src/numberToLetter';

describe(
    'numberToLetter',
    () => {
        test(
            'should convert numbers',
            () => {
                expect(numberToLetter(1)).toBe('A');
                expect(numberToLetter(26)).toBe('Z');
                expect(numberToLetter(27)).toBe('AA');
                expect(numberToLetter(52)).toBe('AZ');
                expect(numberToLetter(286870)).toBe('PHIL');
            }
        );

        test(
            'should work with alternate alphabets',
            () => {
                // cspell:ignore ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ ΥΡΩΧ
                expect(numberToLetter(1, { alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ' })).toBe('Α');
                expect(numberToLetter(26, { alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ' })).toBe('ΑΒ');
                expect(numberToLetter(27, { alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ' })).toBe('ΑΓ');
                expect(numberToLetter(52, { alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ' })).toBe('ΒΔ');
                expect(numberToLetter(286870, { alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ' })).toBe('ΥΡΩΧ');
            }
        );
    }
);
