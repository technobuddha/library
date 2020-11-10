import 'mocha';
import { expect } from 'chai';
import safeCeil   from '../safeCeil';


describe(
    'safeCeil',
    () => {
        it(
            'should handle positive numbers',
            () => {
                expect(safeCeil( 1 + Number.EPSILON)).to.equal( 1);
                expect(safeCeil( 2 + Number.EPSILON)).to.equal( 2);
                expect(safeCeil( 3 + Number.EPSILON)).to.equal( 3);
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(safeCeil(-1 + Number.EPSILON)).to.equal(-1);
                expect(safeCeil(-2 + Number.EPSILON)).to.equal(-2);
                expect(safeCeil(-3 + Number.EPSILON)).to.equal(-3);

            }
        );

        it(
            'should handle precision',
            () => {
                expect(safeCeil( 6.01 + Number.EPSILON, { precision: 2 })).to.equal( 6.01);
                expect(safeCeil( 6100 + Number.EPSILON, { precision:-2 })).to.equal( 6100);
                expect(safeCeil(-6.01 + Number.EPSILON, { precision: 2 })).to.equal(-6.01);
                expect(safeCeil(-6100 + Number.EPSILON, { precision:-2 })).to.equal(-6100);
            }
        );
    }
);

