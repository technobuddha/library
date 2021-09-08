import expect from '@util/expect';
import type { Cartesian, Polar } from '../src/coordinates';

describe(
    'coordinates',
    () => {
        test(
            'Polar',
            () => {
                const polar: Polar = { angle: Math.PI / 4, radius: 100 };
                expect(polar).toEqual({ angle: Math.PI / 4, radius: 100 });
            }
        );

        test(
            'Cartesian',
            () => {
                const cartesian: Cartesian = { x: 100, y: 200 };
                expect(cartesian).toEqual({ x: 100, y: 200 });
            }
        );
    }
);
