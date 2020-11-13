import 'mocha';
import { expect } from 'chai';
import {compare, compareNumbers, compareStrings} from '../compare';

describe(
    'compare',
    () => {
        it(
            'should compare strings',
            () => {
                expect(compare('a', 'a')).to.equal(0);
                expect(compare('a', 'b')).to.equal(-1);
                expect(compare('b', 'a')).to.equal(1);
            }
        );

        it(
            'should compare numbers',
            () => {
                expect(compare(0, 0)).to.equal(0);
                expect(compare(0, 1)).to.equal(-1);
                expect(compare(1, 0)).to.equal(1);
            }
        );

        it(
            'should corece boolean to number',
            () => {
                expect(compare(false, false)).to.equal(0);
                expect(compare(false, true)).to.equal(-1);
                expect(compare(true, false)).to.equal(1);

                expect(compare(false, 0)).to.equal(0);
                expect(compare(0, true)).to.equal(-1);
                expect(compare(true, 0)).to.equal(1);
            }
        );

        it(
            'should corece object to number',
            () => {
                expect(compare(new Date(1900, 1, 0), new Date(1900, 1, 0))).to.equal(0);
                expect(compare(new Date(1900, 1, 0), new Date(1999, 1, 0))).to.equal(-1);
                expect(compare(new Date(1999, 1, 0), new Date(1900, 1, 0))).to.equal(1);

                expect(compare(new Date(1900, 1, 0), -2206378800000)).to.equal(0);
                expect(compare(-2206378800000, new Date(1999, 1, 0))).to.equal(-1);
                expect(compare(new Date(1999, 1, 0), -2206378800000)).to.equal(1);
            }
        );
    }
);

describe(
    'compareNumbers',
    () => {
        it(
            'should compare strings',
            () => {
                expect(compareNumbers(1, 1)).to.equal(0);
                expect(compareNumbers(1, 2)).to.equal(-1);
                expect(compareNumbers(2, 1)).to.equal(1);
            }
        );

        it(
            'should handle nulls',
            () => {
                expect(compareNumbers(null, null)).to.equal(0);
                expect(compareNumbers(null, 1)).to.equal(-1);
                expect(compareNumbers(1, null)).to.equal(1);
            }
        );
    }
);

describe(
    'compareStrings',
    () => {
        it(
            'should compare strings',
            () => {
                expect(compareStrings('a', 'a')).to.equal(0);
                expect(compareStrings('a', 'b')).to.equal(-1);
                expect(compareStrings('b', 'a')).to.equal(1);
            }
        );

        it(
            'should compare strings',
            () => {
                expect(compareStrings(null, null)).to.equal(0);
                expect(compareStrings(null, 'a')).to.equal(-1);
                expect(compareStrings('a', null)).to.equal(1);
            }
        );

        it(
            'should do case insensitive compares',
            () => {
                expect(compareStrings('A', 'a', { caseInsensitive: true })).to.equal(0);
                expect(compareStrings('A', 'b', { caseInsensitive: true })).to.equal(-1);
                expect(compareStrings('a', 'B', { caseInsensitive: true })).to.equal(-1);
            }
        );

        it(
            'should do natural compares',
            () => {
                expect(compareStrings('Page 2', 'Page 2', { natural: true })).to.equal(0);
                expect(compareStrings('Page 2', 'Page 10', { natural: true })).to.equal(-1);
                expect(compareStrings('Page 10', 'Page 2', { natural: true }) ).to.equal(1);
            }
        );

        it(
            'should do compares versions',
            () => {
                expect(compareStrings('1.1', '1.1', { version: true })).to.equal(0);
                expect(compareStrings('1.1', '1.2', { natural: true })).to.equal(-1);
                expect(compareStrings('1.1', '1.1a', { natural: true })).to.equal(-1);
                expect(compareStrings('1.1.1.1', '1.1.1a', { natural: true })).to.equal(-1);
            }
        );
    }
);
