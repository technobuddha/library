import expect from '../util/expect';
import normalizeAngle from '../src/normalizeAngle';

describe(
    'normalizeAngle',
    () => {
        it(
            'converts positive angles',
            () => {
                expect(normalizeAngle(0 * Math.PI / 2)).toBe(0 * Math.PI / 2);
                expect(normalizeAngle(1 * Math.PI / 2)).toBe(1 * Math.PI / 2);
                expect(normalizeAngle(2 * Math.PI / 2)).toBe(2 * Math.PI / 2);
                expect(normalizeAngle(3 * Math.PI / 2)).toBe(3 * Math.PI / 2);
                expect(normalizeAngle(4 * Math.PI / 2)).toBe(0 * Math.PI / 2);
                expect(normalizeAngle(5 * Math.PI / 2)).toBe(1 * Math.PI / 2);
                expect(normalizeAngle(6 * Math.PI / 2)).toBe(2 * Math.PI / 2);
                expect(normalizeAngle(7 * Math.PI / 2)).toBe(3 * Math.PI / 2);
                expect(normalizeAngle(8 * Math.PI / 2)).toBe(0 * Math.PI / 2);
            }
        );

        it(
            'converts negative angles',
            () => {
                expect(normalizeAngle(-0 * Math.PI / 2)).toBe(-0 * Math.PI / 2);
                expect(normalizeAngle(-1 * Math.PI / 2)).toBe( 3 * Math.PI / 2);
                expect(normalizeAngle(-2 * Math.PI / 2)).toBe( 2 * Math.PI / 2);
                expect(normalizeAngle(-3 * Math.PI / 2)).toBe( 1 * Math.PI / 2);
                expect(normalizeAngle(-4 * Math.PI / 2)).toBe(-0 * Math.PI / 2);
                expect(normalizeAngle(-5 * Math.PI / 2)).toBe( 3 * Math.PI / 2);
                expect(normalizeAngle(-6 * Math.PI / 2)).toBe( 2 * Math.PI / 2);
                expect(normalizeAngle(-7 * Math.PI / 2)).toBe( 1 * Math.PI / 2);
                expect(normalizeAngle(-8 * Math.PI / 2)).toBe(-0 * Math.PI / 2);
            }
        );
    }
);
