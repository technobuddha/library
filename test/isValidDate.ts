import expect from '../util/expect';
import isValidDate from '../src/isValidDate';

describe(
    'isValidDate',
    () => {
        test(
            'should detect invalid dates',
            () => {
                expect(isValidDate(new Date())).toBe(true);
                expect(isValidDate(new Date('Jan 1 1970'))).toBe(true);
                expect(isValidDate(new Date('not a date'))).toBe(false);
                expect(isValidDate(new Date(Number.NaN))).toBe(false);
            }
        );
    }
);
