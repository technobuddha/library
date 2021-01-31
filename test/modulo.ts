import 'mocha';
import { expect } from 'chai';
import modulo     from '../src/modulo';

describe(
    'modulo',
    () => {
        it(
            'should handle positive dividend and divisors',
            () => {
                expect(modulo(1,  3)).to.equal(1);
                expect(modulo(2,  3)).to.equal(2);
                expect(modulo(3,  3)).to.equal(0);
            }
        );

        it(
            'should handle negative dividend and positive divisor',
            () => {
                expect(modulo(-1, 3)).to.equal(2);
                expect(modulo(-2, 3)).to.equal(1);
                expect(modulo(-3, 3)).to.equal(0);
            }
        );

        it(
            'should handle positive dividend and negative divisor',
            () => {
                expect(modulo(1, -3)).to.equal(-2);
                expect(modulo(2, -3)).to.equal(-1);
                expect(modulo(3, -3)).to.equal(0);
            }
        );

        it(
            'should handle negative dividend and negative divisor',
            () => {
                expect(modulo(-1, -3)).to.equal(-1);
                expect(modulo(-2, -3)).to.equal(-2);
                expect(modulo(-3, -3)).to.equal(0);
            }
        );

        it(
            'should handle zero divisor',
            () => {
                expect(isNaN(modulo(1,  0))).to.equal(true);
                expect(isNaN(modulo(2,  0))).to.equal(true);
                expect(isNaN(modulo(3,  0))).to.equal(true);
            }
        );
    }
);
