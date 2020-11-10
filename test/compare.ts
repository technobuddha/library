import 'mocha';
import { expect } from 'chai';
import compare    from '../compare';

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

