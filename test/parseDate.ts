import 'mocha';
import { expect } from 'chai';
import parseDate  from '../src/parseDate';

describe(
    'parseDate',
    () => {
        it(
            'should find the last occurance of a day in a month',
            () => {
                expect(parseDate('07012018').toString()).to.equal(new Date('1 Jul 2018').toString());
            }
        );
    }
);
