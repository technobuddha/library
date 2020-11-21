import 'mocha';
import { expect }     from 'chai';
import numberToLetter from '../numberToLetter';

describe(
    'numberToLetter',
    () => {
        it(
            'should convert numbers',
            () => {
                expect(numberToLetter(1)).to.equal('A');
                expect(numberToLetter(26)).to.equal('Z');
                expect(numberToLetter(27)).to.equal('AA');
                expect(numberToLetter(52)).to.equal('AZ');
                expect(numberToLetter(286870)).to.equal('PHIL');
            }
        );

        it(
            'should work with alternate alphbets',
            () => {
                expect(numberToLetter(1, {alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'})).to.equal('Α');
                expect(numberToLetter(26, {alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'})).to.equal('ΑΒ');
                expect(numberToLetter(27, {alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'})).to.equal('ΑΓ');
                expect(numberToLetter(52, {alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'})).to.equal('ΒΔ');
                expect(numberToLetter(286870, {alphabet: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'})).to.equal('ΥΡΩΧ');
            }
        );
    }
);




