import 'mocha';
import { expect }   from 'chai';
import ensurePrefix from '../src/ensurePrefix';

describe(
    'ensurePrefix',
    () => {
        it(
            'should add prefixes when needed',
            () => {
                expect(ensurePrefix('bletch', 'foobie-')).to.equal('foobie-bletch');
                expect(ensurePrefix('foobie-bletch', 'foobie-')).to.equal('foobie-bletch');
                expect(ensurePrefix('foobiebletch', 'foobie-')).to.equal('foobie-foobiebletch');
            }
        );
    }
);
