import 'mocha';
import { expect }          from 'chai';
import getBeginningOfMonth from '../getBeginningOfMonth';
import { month }           from '../constants';

describe(
    'getBeginningOfMonth',
    () => {
        it(
            'should compute beginning of the month',
            () => {
                expect(getBeginningOfMonth(new Date('20 Jul 1969 20:18')).toString()).to.equal(new Date('1 Jul 1969').toString());
            }
        );

        it(
            'should compute UTC beginning of the month',
            () => {
                expect(getBeginningOfMonth(new Date(Date.UTC(1969, month.july, 20, 20, 18)), { UTC: true}).toString()).to.equal(new Date(Date.UTC(1969, month.july, 1)).toString());
            }
        );
    }
);









