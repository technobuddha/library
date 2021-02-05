import expect from '../util/expect';
import root       from '../src/root';

describe(
    'root',
    () => {
        test(
            'should extract root word',
            () => {
                expect(root('abc')).toBe('abc');
                expect(root('pre-abc', { prefix: 'pre-' })).toBe('abc');
                expect(root('abc-post', { suffix: '-post' })).toBe('abc');
                expect(root('pre-abc-post', { prefix: 'pre-', suffix: '-post' })).toBe('abc');
            }
        );
    }
);
