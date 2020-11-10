import 'mocha';
import { expect } from 'chai';
import safeFloor  from '../safeFloor';


describe(
    'safeFloor',
    () => {
        it(
            'should handle positive numbers',
            () => {
                expect(safeFloor( 1 - Number.EPSILON)).to.equal( 1);
                expect(safeFloor( 2 - Number.EPSILON)).to.equal( 2);
                expect(safeFloor( 3 - Number.EPSILON)).to.equal( 3);
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(safeFloor(-1 - Number.EPSILON)).to.equal(-1);
                expect(safeFloor(-2 - Number.EPSILON)).to.equal(-2);
                expect(safeFloor(-3 - Number.EPSILON)).to.equal(-3);

            }
        );

        it(
            'should handle precision',
            () => {
                expect(safeFloor( 6.01 - Number.EPSILON, { precision:  2 })).to.equal( 6.01);
                expect(safeFloor( 6100 - Number.EPSILON, { precision: -2 })).to.equal( 6100);
                expect(safeFloor(-6.01 - Number.EPSILON, { precision:  2 })).to.equal(-6.01);
                expect(safeFloor(-6100 - Number.EPSILON, { precision: -2 })).to.equal(-6100);
            }
        );
    }
);

