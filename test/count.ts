import expect from '@util/expect';
import count      from '../src/count';

describe(
    'count',
    () => {
        test(
            'should count substrings',
            () => {
                expect(count('foobar foobie-bletch foosball', 'foo')).toBe(3);
                expect(count('foofoofoofoofoo', 'foo')).toBe(5);
                expect(count('foofoofoofoofoo', 'foofoo')).toBe(2);
            }
        );

        test(
            'should support overlap mode',
            () => {
                expect(count('foofoofoofoofoo', 'foo', { overlap: true })).toBe(5);
                expect(count('foofoofoofoofoo', 'foofoo', { overlap: true })).toBe(4);
            }
        );
    }
);
