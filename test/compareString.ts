import 'mocha';
import { expect }    from 'chai';
import compareString from '../compareString';

describe(
    'compareString',
    () => {
        it(
            'should compare strings',
            () => {
                expect(compareString('a', 'a')).to.equal(0);
                expect(compareString('a', 'b')).to.equal(-1);
                expect(compareString('b', 'a')).to.equal(1);
            }
        );

        it(
            'should compare strings',
            () => {
                expect(compareString(null, null)).to.equal(0);
                expect(compareString(null, 'a')).to.equal(-1);
                expect(compareString('a', null)).to.equal(1);
            }
        );

        it(
            'should do case insensitive compares',
            () => {
                expect(compareString('A', 'a', { caseInsensitive: true })).to.equal(0);
                expect(compareString('A', 'b', { caseInsensitive: true })).to.equal(-1);
                expect(compareString('a', 'B', { caseInsensitive: true })).to.equal(-1);
            }
        );

        it(
            'should do natural compares',
            () => {
                expect(compareString('Page 2', 'Page 2', { natural: true })).to.equal(0);
                expect(compareString('Page 2', 'Page 10', { natural: true })).to.equal(-1);
                expect(compareString('Page 10', 'Page 2', { natural: true }) ).to.equal(1);
            }
        );

        it(
            'should do compares versions',
            () => {
                expect(compareString('1.1', '1.1', { version: true })).to.equal(0);
                expect(compareString('1.1', '1.2', { natural: true })).to.equal(-1);
                expect(compareString('1.1', '1.1a', { natural: true })).to.equal(-1);
                expect(compareString('1.1.1.1', '1.1.1a', { natural: true })).to.equal(-1);
            }
        );
    }
);

