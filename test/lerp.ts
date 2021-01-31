import 'mocha';
import { expect, use }     from 'chai';
import chaiAlmost          from 'chai-almost';
import lerp from '../src/lerp';

use(chaiAlmost());

describe(
    'lerp',
    () => {
        it(
            'converts left to right range',
            () => {
                expect(lerp(0, 10, 0.0)).to.almost.equal(0);
                expect(lerp(0, 10, 0.1)).to.almost.equal(1);
                expect(lerp(0, 10, 0.2)).to.almost.equal(2);
                expect(lerp(0, 10, 0.3)).to.almost.equal(3);
                expect(lerp(0, 10, 0.4)).to.almost.equal(4);
                expect(lerp(0, 10, 0.5)).to.almost.equal(5);
                expect(lerp(0, 10, 0.6)).to.almost.equal(6);
                expect(lerp(0, 10, 0.7)).to.almost.equal(7);
                expect(lerp(0, 10, 0.8)).to.almost.equal(8);
                expect(lerp(0, 10, 0.9)).to.almost.equal(9);
                expect(lerp(0, 10, 1.0)).to.almost.equal(10);
            }
        );

        it(
            'converts right to left range',
            () => {
                expect(lerp(0, -10, 0.0)).to.almost.equal(-0);
                expect(lerp(0, -10, 0.1)).to.almost.equal(-1);
                expect(lerp(0, -10, 0.2)).to.almost.equal(-2);
                expect(lerp(0, -10, 0.3)).to.almost.equal(-3);
                expect(lerp(0, -10, 0.4)).to.almost.equal(-4);
                expect(lerp(0, -10, 0.5)).to.almost.equal(-5);
                expect(lerp(0, -10, 0.6)).to.almost.equal(-6);
                expect(lerp(0, -10, 0.7)).to.almost.equal(-7);
                expect(lerp(0, -10, 0.8)).to.almost.equal(-8);
                expect(lerp(0, -10, 0.9)).to.almost.equal(-9);
                expect(lerp(0, -10, 1.0)).to.almost.equal(-10);
            }
        );

        it(
            'converts negative portion',
            () => {
                expect(lerp(0, 10, -0.0)).to.almost.equal(-0);
                expect(lerp(0, 10, -0.1)).to.almost.equal(-1);
                expect(lerp(0, 10, -0.2)).to.almost.equal(-2);
                expect(lerp(0, 10, -0.3)).to.almost.equal(-3);
                expect(lerp(0, 10, -0.4)).to.almost.equal(-4);
                expect(lerp(0, 10, -0.5)).to.almost.equal(-5);
                expect(lerp(0, 10, -0.6)).to.almost.equal(-6);
                expect(lerp(0, 10, -0.7)).to.almost.equal(-7);
                expect(lerp(0, 10, -0.8)).to.almost.equal(-8);
                expect(lerp(0, 10, -0.9)).to.almost.equal(-9);
                expect(lerp(0, 10, -1.0)).to.almost.equal(-10);
            }
        );

        it(
            'zero width range',
            () => {
                expect(lerp(0, 0, 0.0)).to.almost.equal(0);
                expect(lerp(0, 0, 0.1)).to.almost.equal(0);
                expect(lerp(0, 0, 0.2)).to.almost.equal(0);
                expect(lerp(0, 0, 0.3)).to.almost.equal(0);
                expect(lerp(0, 0, 0.4)).to.almost.equal(0);
                expect(lerp(0, 0, 0.5)).to.almost.equal(0);
                expect(lerp(0, 0, 0.6)).to.almost.equal(0);
                expect(lerp(0, 0, 0.7)).to.almost.equal(0);
                expect(lerp(0, 0, 0.8)).to.almost.equal(0);
                expect(lerp(0, 0, 0.9)).to.almost.equal(0);
                expect(lerp(0, 0, 1.0)).to.almost.equal(0);
            }
        );
    }
);
