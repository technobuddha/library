import expect from '../util/expect';
import delimited  from '../src/delimited';
import { empty }  from '../src/constants';

describe(
    'delimited',
    () => {
        it(
            'should extract from delimited string',
            () => {
                expect(delimited('a*b*c*d', '*', 0)).toBe('a');
                expect(delimited('a*b*c*d', '*', 1)).toBe('b');
                expect(delimited('a*b*c*d', '*', 2)).toBe('c');
                expect(delimited('a*b*c*d', '*', 3)).toBe('d');
            }
        );

        it(
            'should handle index <= 0',
            () => {
                expect(delimited('a*b*c*d', '*', -1)).toBe('d');
                expect(delimited('a*b*c*d', '*', -2)).toBe('c');
                expect(delimited('a*b*c*d', '*', -3)).toBe('b');
                expect(delimited('a*b*c*d', '*', -4)).toBe('a');
            }
        );

        it(
            'should use counts',
            () => {
                expect(delimited('a*b*c*d', '*', 0, 1)).toBe('a');
                expect(delimited('a*b*c*d', '*', 0, 2)).toBe('a*b');
                expect(delimited('a*b*c*d', '*', 0, 3)).toBe('a*b*c');
                expect(delimited('a*b*c*d', '*', 0, 4)).toBe('a*b*c*d');
            }
        );

        it(
            'should handle counts with index < 0',
            () => {
                expect(delimited('a*b*c*d', '*', -4, 1)).toBe('a');
                expect(delimited('a*b*c*d', '*', -4, 2)).toBe('a*b');
                expect(delimited('a*b*c*d', '*', -4, 3)).toBe('a*b*c');
                expect(delimited('a*b*c*d', '*', -4, 4)).toBe('a*b*c*d');
            }
        );

        it(
            'should handle index out of bounds',
            () => {
                expect(delimited('a*b*c*d', '*', 4)).toBe(empty);
                expect(delimited('a*b*c*d', '*', -5)).toBe(empty);
            }
        );

        it(
            'should handle counts out of range',
            () => {
                expect(delimited('a*b*c*d', '*', 0, 5)).toBe('a*b*c*d');
                expect(delimited('a*b*c*d', '*', -4, 5)).toBe('a*b*c*d');
                expect(delimited('a*b*c*d', '*', 0, 0)).toBe(empty);
                expect(delimited('a*b*c*d', '*', 0, -1)).toBe(empty);
            }
        );
    }
);
