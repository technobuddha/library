import expect from '../util/expect';
import toDegrees from '../src/toDegrees';

describe(
    'toDegrees',
    () => {
        test(
            'converts positive angles',
            () => {
                expect(toDegrees(0 * Math.PI / 4)).toBeCloseTo(0.0);
                expect(toDegrees(Number(Math.PI) / 4)).toBeCloseTo(45.0);
                expect(toDegrees(2 * Math.PI / 4)).toBeCloseTo(90.0);
                expect(toDegrees(3 * Math.PI / 4)).toBeCloseTo(135.0);
                expect(toDegrees(4 * Math.PI / 4)).toBeCloseTo(180.0);
                expect(toDegrees(5 * Math.PI / 4)).toBeCloseTo(225.0);
                expect(toDegrees(6 * Math.PI / 4)).toBeCloseTo(270.0);
                expect(toDegrees(7 * Math.PI / 4)).toBeCloseTo(315.0);
            }
        );

        test(
            'converts negative angles',
            () => {
                expect(toDegrees(-0 * Math.PI / 4)).toBeCloseTo(-0.0);
                expect(toDegrees(-1 * Math.PI / 4)).toBeCloseTo(-45.0);
                expect(toDegrees(-2 * Math.PI / 4)).toBeCloseTo(-90.0);
                expect(toDegrees(-3 * Math.PI / 4)).toBeCloseTo(-135.0);
                expect(toDegrees(-4 * Math.PI / 4)).toBeCloseTo(-180.0);
                expect(toDegrees(-5 * Math.PI / 4)).toBeCloseTo(-225.0);
                expect(toDegrees(-6 * Math.PI / 4)).toBeCloseTo(-270.0);
                expect(toDegrees(-7 * Math.PI / 4)).toBeCloseTo(-315.0);
            }
        );

        test(
            'converts positive angles greater than full',
            () => {
                expect(toDegrees(8 * Math.PI / 4)).toBeCloseTo(360.0);
                expect(toDegrees(9 * Math.PI / 4)).toBeCloseTo(405.0);
                expect(toDegrees(10 * Math.PI / 4)).toBeCloseTo(450.0);
                expect(toDegrees(11 * Math.PI / 4)).toBeCloseTo(495.0);
                expect(toDegrees(12 * Math.PI / 4)).toBeCloseTo(540.0);
                expect(toDegrees(13 * Math.PI / 4)).toBeCloseTo(585.0);
                expect(toDegrees(14 * Math.PI / 4)).toBeCloseTo(630.0);
                expect(toDegrees(15 * Math.PI / 4)).toBeCloseTo(675.0);
            }
        );
    }
);
