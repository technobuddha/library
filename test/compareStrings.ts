import 'mocha';
import { expect } from 'chai';
import { compareStrings } from '../src/compareStrings';

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
                expect(compareStrings('Page 10', 'Page 2', { natural: true })).to.equal(1);
            }
        );

        it(
            'should compare versions',
            () => {
                expect(compareStrings('1.1', '1.1', { version: true })).to.equal(0);
                expect(compareStrings('1.1', '1.2', { version: true })).to.equal(-1);
                expect(compareStrings('1', '1.1', { version: true })).to.equal(-1);
                expect(compareStrings('1.1', '1.1a', { version: true })).to.equal(-1);
                expect(compareStrings('1.1.1.1', '1.1.1a', { version: true })).to.equal(-1);

                expect(compareStrings('1-1', '1-1', { version: true })).to.equal(0);
                expect(compareStrings('1-1', '1.1', { version: true })).to.equal(0);
            }
        );
    }
);
