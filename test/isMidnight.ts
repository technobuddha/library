import 'mocha';
import { expect } from 'chai';
import isMidnight from '../src/isMidnight';

describe(
    'isMidnight',
    () => {
        it(
            'should detect midnight',
            () => {
                expect(isMidnight(new Date('2018 Jul 4'))).to.equal(true);
                expect(isMidnight(new Date('2018 Jul 4 00:00:00.001'))).to.equal(false);
            }
        );

        it(
            'should detect midnight UTC',
            () => {
                expect(isMidnight(new Date('2018 Jul 3 20:00 GMT-04:00'), {UTC: true})).to.equal(true);
                expect(isMidnight(new Date('2018 Jul 3 20:00:00.001 GMT-04:00'), {UTC: true})).to.equal(false);
            }
        );
    }
);




