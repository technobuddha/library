import 'mocha';
import { expect }   from 'chai';
import getDayOfYear from '../src/getDayOfYear';
import { month }    from '../src/constants';

describe(
    'getDayOfYear',
    () => {
        it(
            'should convert to day of year',
            () => {
                expect(getDayOfYear(new Date('1 Mar 2004'))).to.equal(61);
                expect(getDayOfYear(new Date('1 Mar 2005'))).to.equal(60);
            }
        );

        it(
            'should convert to UTC day of year',
            () => {
                expect(getDayOfYear(new Date(Date.UTC(2004, month.march, 1)), { UTC: true })).to.equal(61);
                expect(getDayOfYear(new Date(Date.UTC(2005, month.march, 1)), { UTC: true })).to.equal(60);
            }
        );
    }
);
        
        
        
        
        



