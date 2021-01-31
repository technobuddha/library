import 'mocha';
import { expect }       from 'chai';
import isEven           from '../src/isEven';
import { negativeZero } from '../src/constants';

describe(
    'isEven',
    () => {
        it(
            'should work with numbers',
            () => {
                expect(isEven(-3)).to.equal(false);
                expect(isEven(-2)).to.equal(true);
                expect(isEven(-1)).to.equal(false);
                expect(isEven(0)).to.equal(true);
                expect(isEven(1)).to.equal(false);
                expect(isEven(2)).to.equal(true);
                expect(isEven(3)).to.equal(false);
                expect(isEven(negativeZero)).to.equal(true);
                expect(isEven(NaN)).to.equal(false);
                expect(isEven(Infinity)).to.equal(false);
                expect(isEven(-Infinity)).to.equal(false);
            }
        );

        it(
            'should work with special numbers',
            () => {
                expect(isEven(negativeZero)).to.equal(true);
                expect(isEven(NaN)).to.equal(false);
                expect(isEven(Infinity)).to.equal(false);
                expect(isEven(-Infinity)).to.equal(false);
            }
        );
    }
);
