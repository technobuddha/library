import 'mocha';
import { expect }   from 'chai';
import ensureSuffix from '../src/ensureSuffix';

describe(
    'ensureSuffix',
    () => {
        it(
            'should add Suffixes when needed',
            () => {
                expect(ensureSuffix('bletch', '-foobie')).to.equal('bletch-foobie');
                expect(ensureSuffix('bletch-foobie', '-foobie')).to.equal('bletch-foobie');
                expect(ensureSuffix('bletchfoobie', '-foobie')).to.equal('bletchfoobie-foobie');
            }
        );
    }
);
