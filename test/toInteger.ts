import expect from '../util/expect';
import toInteger  from '../src/toInteger';

describe(
    'toInteger',
    () => {
        test(
            'should return numbers',
            () => {
                expect(toInteger(123456.789)).toEqual(123456);
            }
        );

        test(
            'should convert strings',
            () => {
                expect(toInteger('123456.789')).toBe(123456);
            }
        );

        test(
            'should convert booleans',
            () => {
                expect(toInteger(false)).toBe(0);
                expect(toInteger(true)).toBe(1);
            }
        );

        test(
            'convert other types are NaN',
            () => {
                expect(toInteger({})).toBeNaN();
            }
        );
    }
);
