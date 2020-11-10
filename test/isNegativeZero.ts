import 'mocha';
import { expect }       from 'chai';
import isNegativeZero   from '../isNegativeZero';
import { negativeZero } from '../constants';

describe(
    'isNegativeZero',
    () => {
        it(
            'should handle testing for negative zero',
            () => {
                expect(isNegativeZero(-3)).to.equal(false);
                expect(isNegativeZero(-2)).to.equal(false);
                expect(isNegativeZero(-1)).to.equal(false);
                expect(isNegativeZero(negativeZero)).to.equal(true);
                expect(isNegativeZero(0)).to.equal(false);
                expect(isNegativeZero(1)).to.equal(false);
                expect(isNegativeZero(2)).to.equal(false);
                expect(isNegativeZero(3)).to.equal(false);
                expect(isNegativeZero(Number.MAX_VALUE)).to.equal(false);
                expect(isNegativeZero(Number.MIN_VALUE)).to.equal(false);
                expect(isNegativeZero(NaN)).to.equal(false);
                expect(isNegativeZero(Infinity)).to.equal(false);
                expect(isNegativeZero(-Infinity)).to.equal(false);
            }
        );
    }
);

