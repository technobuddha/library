import expect from '../util/expect';
import ensurePrefix from '../src/ensurePrefix';

describe(
    'ensurePrefix',
    () => {
        test(
            'should add prefixes when needed',
            () => {
                expect(ensurePrefix('bletch', 'foobie-')).toBe('foobie-bletch');
                expect(ensurePrefix('foobie-bletch', 'foobie-')).toBe('foobie-bletch');
                expect(ensurePrefix('foobiebletch', 'foobie-')).toBe('foobie-foobiebletch');
            }
        );
    }
);
