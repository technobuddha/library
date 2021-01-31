import 'mocha';
import { expect } from 'chai';
import ceil       from '../src/ceil';

describe(
    'safeCeil',
    () => {
        it(
            'should handle positive numbers',
            () => {
                expect(ceil(1 + Number.EPSILON)).to.equal(1);
                expect(ceil(2 + Number.EPSILON)).to.equal(2);
                expect(ceil(3 + Number.EPSILON)).to.equal(3);
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(ceil(-1 + Number.EPSILON)).to.equal(-1);
                expect(ceil(-2 + Number.EPSILON)).to.equal(-2);
                expect(ceil(-3 + Number.EPSILON)).to.equal(-3);
            }
        );

        it(
            'should handle tolerance',
            () => {
                expect(ceil(6.1, { tolerance: 0.1 })).to.equal(6);
                expect(ceil(-6.1, { tolerance: 0.1 })).to.equal(-6);
            }
        );

        it(
            'should handle precision',
            () => {
                expect(ceil(6.01 + Number.EPSILON, { precision: 2 })).to.equal(6.01);
                expect(ceil(6100 + Number.EPSILON, { precision: -2 })).to.equal(6100);
                expect(ceil(-6.01 + Number.EPSILON, { precision: 2 })).to.equal(-6.01);
                expect(ceil(-6100 + Number.EPSILON, { precision: -2 })).to.equal(-6100);
            }
        );
    }
);
