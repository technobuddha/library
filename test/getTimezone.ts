import expect from '../util/expect';
import getTimezone     from '../src/getTimezone';

//use(require('chai-match'));

describe(
    'getTimezone',
    () => {
        it(
            'should output something resembling a timezone',
            () => {
                expect(getTimezone(new Date(2018, 6, 4))).toMatch(/^Z|[+-]([0][0-9]|[1][0-2]):([0-5][0-9])$/u);
            }
        );
    }
);
