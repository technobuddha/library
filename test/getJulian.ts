import 'mocha';
import { expect, use } from 'chai';
import chaiAlmost      from 'chai-almost';
import getJulian       from '../src/getJulian';

use(chaiAlmost());

describe(
    'getJulian',
    () => {
        it(
            'should convert to Julian dates',
            () => {
                expect(getJulian(new Date('13 September 1999 00:00 UTC'))).to.almost.equal(2451434.5);
                expect(getJulian(new Date('20 July 1969 20:18 UTC'))).to.almost.equal(2440423.345833);
            }
        );
    }
);
