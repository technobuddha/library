import expect from '../util/expect';
import toRadians from '../src/toRadians';

describe(
    'toRadians',
    () => {
        it(
            'converts positive angles',
            () => {
                expect(toRadians(0)).toBe(0 * Math.PI / 2);
                expect(toRadians(90)).toBe(Number(Math.PI) / 2);
                expect(toRadians(180)).toBe(2 * Math.PI / 2);
                expect(toRadians(270)).toBe(3 * Math.PI / 2);
                expect(toRadians(360)).toBe(4 * Math.PI / 2);
                expect(toRadians(450)).toBe(5 * Math.PI / 2);
                expect(toRadians(540)).toBe(6 * Math.PI / 2);
                expect(toRadians(630)).toBe(7 * Math.PI / 2);
                expect(toRadians(720)).toBe(8 * Math.PI / 2);
            }
        );

        it(
            'converts negative angles',
            () => {
                expect(toRadians(-0)).toBe(-0 * Math.PI / 2);
                expect(toRadians(-90)).toBe(-1 * Math.PI / 2);
                expect(toRadians(-180)).toBe(-2 * Math.PI / 2);
                expect(toRadians(-270)).toBe(-3 * Math.PI / 2);
                expect(toRadians(-360)).toBe(-4 * Math.PI / 2);
                expect(toRadians(-450)).toBe(-5 * Math.PI / 2);
                expect(toRadians(-540)).toBe(-6 * Math.PI / 2);
                expect(toRadians(-630)).toBe(-7 * Math.PI / 2);
                expect(toRadians(-720)).toBe(-8 * Math.PI / 2);
            }
        );
    }
);
