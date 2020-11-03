import 'mocha';
import { expect } from 'chai';
import chop       from '../chop';


describe(
    'chop',
    () => {
        it(
            'should chop string in to blocks',
            () => {
                expect(chop('abc', 1)).to.deep.equal([ 'a', 'b', 'c' ]);
                expect(chop('abc', 2)).to.deep.equal([ 'ab', 'c' ]);
            }
        );

        it(
            'should handle lengths <= 0',
            () => {
                expect(chop('abc', 0)).to.deep.equal([ 'abc' ]);
                expect(chop('abc', -1)).to.deep.equal([ 'abc' ]);
            }
        );

        it(
            'should respect the truncate option',
            () => {
                expect(chop('abcdefg', 2)).to.deep.equal([ 'ab', 'cd', 'ef', 'g' ]);
                expect(chop('abcdefg', 2, { truncate: true })).to.deep.equal([ 'ab', 'cd', 'ef' ]);
            }
        );
    }
);

