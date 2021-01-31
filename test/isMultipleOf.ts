import 'mocha';
import { expect }       from 'chai';
import isMultipleOf     from '../src/isMultipleOf';
import { negativeZero } from '../src/constants';

describe(
    'isMultipleOf',
    () => {
        it(
            'should work with numbers',
            () => {
                expect(isMultipleOf(-6, 3)).to.equal(true);
                expect(isMultipleOf(-3, 3)).to.equal(true);
                expect(isMultipleOf(0, 3)).to.equal(true);
                expect(isMultipleOf(3, 3)).to.equal(true);
                expect(isMultipleOf(6, 3)).to.equal(true);

                expect(isMultipleOf(-6, 2)).to.equal(true);
                expect(isMultipleOf(-3, 2)).to.equal(false);
                expect(isMultipleOf(0, 2)).to.equal(true);
                expect(isMultipleOf(3, 2)).to.equal(false);
                expect(isMultipleOf(6, 2)).to.equal(true);

                expect(isMultipleOf(-6, -3)).to.equal(true);
                expect(isMultipleOf(-3, -3)).to.equal(true);
                expect(isMultipleOf(0, -3)).to.equal(true);
                expect(isMultipleOf(3, -3)).to.equal(true);
                expect(isMultipleOf(6, -3)).to.equal(true);

                expect(isMultipleOf(-6, -2)).to.equal(true);
                expect(isMultipleOf(-3, -2)).to.equal(false);
                expect(isMultipleOf(0, -2)).to.equal(true);
                expect(isMultipleOf(3, -2)).to.equal(false);
                expect(isMultipleOf(6, -2)).to.equal(true);

                expect(isMultipleOf(-6, 0)).to.equal(false);
                expect(isMultipleOf(-3, 0)).to.equal(false);
                expect(isMultipleOf(0, 0)).to.equal(true);
                expect(isMultipleOf(3, 0)).to.equal(false);
                expect(isMultipleOf(6, 0)).to.equal(false);
            }
        );

        it(
            'should work with special numbers',
            () => {
                expect(isMultipleOf(negativeZero, 1)).to.equal(true);
                expect(isMultipleOf(1, negativeZero)).to.equal(false);
                expect(isMultipleOf(negativeZero, negativeZero)).to.equal(true);
                expect(isMultipleOf(NaN, 1)).to.equal(false);
                expect(isMultipleOf(1, NaN)).to.equal(false);
                expect(isMultipleOf(NaN, NaN)).to.equal(false);
                expect(isMultipleOf(Infinity, 1)).to.equal(false);
                expect(isMultipleOf(1, Infinity)).to.equal(false);
                expect(isMultipleOf(Infinity, Infinity)).to.equal(false);
                expect(isMultipleOf(-Infinity, 1)).to.equal(false);
                expect(isMultipleOf(1, -Infinity)).to.equal(false);
                expect(isMultipleOf(-Infinity, -Infinity)).to.equal(false);
            }
        );
    }
);
