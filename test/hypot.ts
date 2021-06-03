import expect from '../util/expect';
import hypot from '../src/hypot';

describe(
    'hypot',
    () => {
        test(
            'computes hypotenuse',
            () => {
                expect(hypot(3, 4)).toBe(5);
            }
        );

        test(
            'zero arguments',
            () => {
                expect(hypot()).toBe(0);
            }
        );

        test(
            'multiple dimensiona',
            () => {
                expect(hypot(1, 2, 3, 4, 5)).toBeCloseTo(7.416198487095663);
            }
        );
    }
);
