import 'mocha';
import { expect }        from 'chai';
import getBeginningOfDay from '../getBeginningOfDay';

describe(
    'getBeginningOfDay',
    () => {
        it(
            'should calculate the beginning of the day',
            () => {
                expect(getBeginningOfDay(new Date('20 Jul 1969 20:18')).toString()).to.equal(new Date('20 Jul 1969').toString());
            }
        );

        it(
            'should calculate the beginning of the UTC day',
            () => {
                expect(getBeginningOfDay(new Date('20 Jul 1969 20:18 GMT-04:00'), { UTC: true }).toString()).to.equal(new Date('20 Jul 1969 20:00').toString());
            }
        );
    }
);




