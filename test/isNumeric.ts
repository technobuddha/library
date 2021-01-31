import 'mocha';
import { expect }                     from 'chai';
import isNumeric                      from '../src/isNumeric';
import { empty, space, negativeZero } from '../src/constants';

describe(
    'isNumeric',
    () => {
        it(
            'should handle numbers',
            () => {
                expect(isNumeric(-1)).to.equal(true);
                expect(isNumeric(0)).to.equal(true);
                expect(isNumeric(1)).to.equal(true);
            }
        );

        it(
            'should handle special numbers',
            () => {
                expect(isNumeric(negativeZero)).to.equal(true);
                expect(isNumeric(NaN)).to.equal(false);
                expect(isNumeric(Infinity)).to.equal(true);
                expect(isNumeric(-Infinity)).to.equal(true);
            }
        );

        it(
            'should handle numeric strings',
            () => {
                expect(isNumeric('0')).to.equal(true);
                expect(isNumeric('-0')).to.equal(true);
                expect(isNumeric('+0')).to.equal(true);
                expect(isNumeric('1')).to.equal(true);
                expect(isNumeric('-1')).to.equal(true);
                expect(isNumeric('+1')).to.equal(true);
                expect(isNumeric('1e100')).to.equal(true);
                expect(isNumeric('-1e100')).to.equal(true);
                expect(isNumeric('+1e100')).to.equal(true);
                expect(isNumeric('1e-100')).to.equal(true);
                expect(isNumeric('-1e-100')).to.equal(true);
                expect(isNumeric('+1e-100')).to.equal(true);
                expect(isNumeric('1e+100')).to.equal(true);
                expect(isNumeric('-1e+100')).to.equal(true);
                expect(isNumeric('+1e+100')).to.equal(true);
                expect(isNumeric('Infinity')).to.equal(true);
                expect(isNumeric('-Infinity')).to.equal(true);
                expect(isNumeric('+Infinity')).to.equal(true);
                expect(isNumeric('NaN')).to.equal(false);
            }
        );

        it(
            'should handle non-numbers',
            () => {
                expect(isNumeric(empty)).to.equal(false);
                expect(isNumeric(space)).to.equal(false);
                expect(isNumeric('abcdef')).to.equal(false);
                expect(isNumeric(null)).to.equal(false);
                expect(isNumeric(undefined)).to.equal(false);
                expect(isNumeric([])).to.equal(false);
                expect(isNumeric({})).to.equal(false);
            }
        );
    }
);
