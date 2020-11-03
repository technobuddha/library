import 'mocha';
import { expect }  from 'chai';
import isValidDate from '../isValidDate';


describe(
    'isValidDate',
    () => {
        it(
            'should detect invalid dates',
            () => {
                expect(isValidDate(new Date())).to.equal(true);
                expect(isValidDate(new Date('Jan 1 1970'))).to.equal(true);
                expect(isValidDate(new Date('not a date'))).to.equal(false);
                expect(isValidDate(new Date(NaN))).to.equal(false);
            }
        );
    }
);




