import expect from '#util/expect';
import getBeginningOfDay from '../src/getBeginningOfDay';

describe(
    'getBeginningOfDay',
    () => {
        test(
            'should calculate the beginning of the day',
            () => {
                expect(getBeginningOfDay(new Date('20 Jul 1969 20:18')).toString()).toBe(new Date('20 Jul 1969').toString());
            }
        );

        test(
            'should calculate the beginning of the UTC day',
            () => {
                expect(getBeginningOfDay(new Date('20 Jul 1969 20:18 GMT-04:00'), { UTC: true }).toString()).toBe(new Date('20 Jul 1969 20:00').toString());
            }
        );
    }
);
