import expect from '@util/expect';
import angleDifference from '../src/angleDifference';

describe(
    'angleDifference',
    () => {
        test(
            'should compute positive angles',
            () => {
                expect(angleDifference(0 * Math.PI / 4, 0 * Math.PI / 4)).toBe(0 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, 1 * Math.PI / 4)).toBe(1 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, 2 * Math.PI / 4)).toBe(2 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, 3 * Math.PI / 4)).toBe(3 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, 4 * Math.PI / 4)).toBe(4 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, 5 * Math.PI / 4)).toBe(-3 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, 6 * Math.PI / 4)).toBe(-2 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, 7 * Math.PI / 4)).toBe(-1 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, 8 * Math.PI / 4)).toBe(0 * Math.PI / 4);
            }
        );

        test(
            'should compute negative angles',
            () => {
                expect(angleDifference(0 * Math.PI / 4, -0 * Math.PI / 4)).toBe(-0 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, -1 * Math.PI / 4)).toBe(-1 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, -2 * Math.PI / 4)).toBe(-2 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, -3 * Math.PI / 4)).toBe(-3 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, -4 * Math.PI / 4)).toBe(4 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, -5 * Math.PI / 4)).toBe(3 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, -6 * Math.PI / 4)).toBe(2 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, -7 * Math.PI / 4)).toBe(1 * Math.PI / 4);
                expect(angleDifference(0 * Math.PI / 4, -8 * Math.PI / 4)).toBe(-0 * Math.PI / 4);
            }
        );
    }
);
