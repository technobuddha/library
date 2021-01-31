import 'mocha';
import { expect } from 'chai';
import isOdd      from '../src/isOdd';

describe(
    'isOdd',
    () => {
        it(
            'should handle testing for odd numbers',
            () => {
                expect(isOdd(-3)).to.equal(true);
                expect(isOdd(-2)).to.equal(false);
                expect(isOdd(-1)).to.equal(true);
                expect(isOdd(0)).to.equal(false);
                expect(isOdd(1)).to.equal(true);
                expect(isOdd(2)).to.equal(false);
                expect(isOdd(3)).to.equal(true);
                expect(isOdd(NaN)).to.equal(false);
                expect(isOdd(Infinity)).to.equal(false);
                expect(isOdd(-Infinity)).to.equal(false);
            }
        );
    }
);
