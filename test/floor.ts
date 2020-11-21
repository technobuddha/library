import 'mocha';
import { expect } from 'chai';
import floor  from '../floor';


describe(
    'floor',
    () => {
        it(
            'should handle positive numbers',
            () => {
                expect(floor( 1 - Number.EPSILON)).to.equal( 1);
                expect(floor( 2 - Number.EPSILON)).to.equal( 2);
                expect(floor( 3 - Number.EPSILON)).to.equal( 3);
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(floor(-1 - Number.EPSILON)).to.equal(-1);
                expect(floor(-2 - Number.EPSILON)).to.equal(-2);
                expect(floor(-3 - Number.EPSILON)).to.equal(-3);

            }
        );

        it(
            'should handle tolerance',
            () => {
                expect(floor( 5.9, {tolerance: 0.1})).to.equal(6);
                expect(floor(-5.9, {tolerance: 0.1})).to.equal(-6);
            }
        )

        it(
            'should handle precision',
            () => {
                expect(floor( 6.01 - Number.EPSILON, { precision:  2 })).to.equal( 6.01);
                expect(floor( 6100 - Number.EPSILON, { precision: -2 })).to.equal( 6100);
                expect(floor(-6.01 - Number.EPSILON, { precision:  2 })).to.equal(-6.01);
                expect(floor(-6100 - Number.EPSILON, { precision: -2 })).to.equal(-6100);
            }
        );
    }
);
