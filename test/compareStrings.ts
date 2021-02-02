import expect from '../util/expect';
import { compareStrings } from '../src/compareStrings';

describe(
    'compareStrings',
    () => {
        it(
            'should compare strings',
            () => {
                expect(compareStrings('a', 'a')).toBe(0);
                expect(compareStrings('a', 'b')).toBe(-1);
                expect(compareStrings('b', 'a')).toBe(1);
            }
        );

        it(
            'should compare strings',
            () => {
                expect(compareStrings(null, null)).toBe(0);
                expect(compareStrings(null, 'a')).toBe(-1);
                expect(compareStrings('a', null)).toBe(1);
            }
        );

        it(
            'should do case insensitive compares',
            () => {
                expect(compareStrings('A', 'a', { caseInsensitive: true })).toBe(0);
                expect(compareStrings('A', 'b', { caseInsensitive: true })).toBe(-1);
                expect(compareStrings('a', 'B', { caseInsensitive: true })).toBe(-1);
            }
        );

        it(
            'should do natural compares',
            () => {
                expect(compareStrings('Page 2', 'Page 2', { natural: true })).toBe(0);
                expect(compareStrings('Page 2', 'Page 10', { natural: true })).toBe(-1);
                expect(compareStrings('Page 10', 'Page 2', { natural: true })).toBe(1);
            }
        );

        it(
            'should compare versions',
            () => {
                expect(compareStrings('1.1', '1.1', { version: true })).toBe(0);
                expect(compareStrings('1.1', '1.2', { version: true })).toBe(-1);
                expect(compareStrings('1', '1.1', { version: true })).toBe(-1);
                expect(compareStrings('1.1', '1.1a', { version: true })).toBe(-1);
                expect(compareStrings('1.1.1.1', '1.1.1a', { version: true })).toBe(-1);

                expect(compareStrings('1-1', '1-1', { version: true })).toBe(0);
                expect(compareStrings('1-1', '1.1', { version: true })).toBe(0);
            }
        );
    }
);
