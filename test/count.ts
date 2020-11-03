import 'mocha';
import { expect } from 'chai';
import count      from '../count';

describe(
    'count',
    () => {
        it(
            'should count substrings',
            () => {
                expect(count('foobar foobie-bletch foosball', 'foo')).to.equal(3);
                expect(count('foofoofoofoofoo', 'foo')).to.equal(5);
                expect(count('foofoofoofoofoo', 'foofoo')).to.equal(2);
                
            }
        );

        it(
            'should support overlap mode',
            () => {
                expect(count('foofoofoofoofoo', 'foo', { overlap: true })).to.equal(5);
                expect(count('foofoofoofoofoo', 'foofoo', { overlap: true })).to.equal(4);
            }
        );
    }
);

