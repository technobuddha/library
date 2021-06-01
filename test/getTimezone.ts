import expect from '../util/expect';
import getTimezone     from '../src/getTimezone';

//use(require('chai-match'));

describe(
    'getTimezone',
    () => {
        test(
            'should output something resembling a timezone',
            () => {
                expect(getTimezone(new Date(2018, 6, 4))).toMatch(/^(Z|[+-]([0][0-9]|[1][0-2]):([0-5][0-9]))$/u);
            }
        );

        test(
            'should accept GMT option',
            () => {
                expect(getTimezone(new Date(2018, 6, 4), { GMT: true })).toMatch(/^(GMT[+-]([0][0-9]|[1][0-2]):([0-5][0-9]))$/u);
            }
        );

        test(
            'should accept number',
            () => {
                expect(getTimezone(0)).toBe('Z');
                expect(getTimezone(-1)).toBe('+00:01');
                expect(getTimezone(1)).toBe('-00:01');
                expect(getTimezone(0, { GMT: true })).toBe('GMT');
                expect(getTimezone(-1, { GMT: true })).toBe('GMT+00:01');
                expect(getTimezone(1, { GMT: true })).toBe('GMT-00:01');
                expect(getTimezone(0, { Z: false })).toBe('+00:00');
                expect(getTimezone(-1, { Z: false })).toBe('+00:01');
                expect(getTimezone(1, { Z: false })).toBe('-00:01');
            }
        );
    }
);
