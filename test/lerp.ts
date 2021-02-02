import expect from '../util/expect';
import lerp from '../src/lerp';

describe(
    'lerp',
    () => {
        it(
            'converts left to right range',
            () => {
                expect(lerp(0, 10, 0.0)).toBeCloseTo(0);
                expect(lerp(0, 10, 0.1)).toBeCloseTo(1);
                expect(lerp(0, 10, 0.2)).toBeCloseTo(2);
                expect(lerp(0, 10, 0.3)).toBeCloseTo(3);
                expect(lerp(0, 10, 0.4)).toBeCloseTo(4);
                expect(lerp(0, 10, 0.5)).toBeCloseTo(5);
                expect(lerp(0, 10, 0.6)).toBeCloseTo(6);
                expect(lerp(0, 10, 0.7)).toBeCloseTo(7);
                expect(lerp(0, 10, 0.8)).toBeCloseTo(8);
                expect(lerp(0, 10, 0.9)).toBeCloseTo(9);
                expect(lerp(0, 10, 1.0)).toBeCloseTo(10);
            }
        );

        it(
            'converts right to left range',
            () => {
                expect(lerp(0, -10, 0.0)).toBeCloseTo(-0);
                expect(lerp(0, -10, 0.1)).toBeCloseTo(-1);
                expect(lerp(0, -10, 0.2)).toBeCloseTo(-2);
                expect(lerp(0, -10, 0.3)).toBeCloseTo(-3);
                expect(lerp(0, -10, 0.4)).toBeCloseTo(-4);
                expect(lerp(0, -10, 0.5)).toBeCloseTo(-5);
                expect(lerp(0, -10, 0.6)).toBeCloseTo(-6);
                expect(lerp(0, -10, 0.7)).toBeCloseTo(-7);
                expect(lerp(0, -10, 0.8)).toBeCloseTo(-8);
                expect(lerp(0, -10, 0.9)).toBeCloseTo(-9);
                expect(lerp(0, -10, 1.0)).toBeCloseTo(-10);
            }
        );

        it(
            'converts negative portion',
            () => {
                expect(lerp(0, 10, -0.0)).toBeCloseTo(-0);
                expect(lerp(0, 10, -0.1)).toBeCloseTo(-1);
                expect(lerp(0, 10, -0.2)).toBeCloseTo(-2);
                expect(lerp(0, 10, -0.3)).toBeCloseTo(-3);
                expect(lerp(0, 10, -0.4)).toBeCloseTo(-4);
                expect(lerp(0, 10, -0.5)).toBeCloseTo(-5);
                expect(lerp(0, 10, -0.6)).toBeCloseTo(-6);
                expect(lerp(0, 10, -0.7)).toBeCloseTo(-7);
                expect(lerp(0, 10, -0.8)).toBeCloseTo(-8);
                expect(lerp(0, 10, -0.9)).toBeCloseTo(-9);
                expect(lerp(0, 10, -1.0)).toBeCloseTo(-10);
            }
        );

        it(
            'zero width range',
            () => {
                expect(lerp(0, 0, 0.0)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.1)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.2)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.3)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.4)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.5)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.6)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.7)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.8)).toBeCloseTo(0);
                expect(lerp(0, 0, 0.9)).toBeCloseTo(0);
                expect(lerp(0, 0, 1.0)).toBeCloseTo(0);
            }
        );
    }
);
