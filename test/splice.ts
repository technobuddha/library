import 'mocha';
import { expect } from 'chai';
import splice     from '../splice';


describe(
    'splice',
    () => {
        it(
            'should splice substrings',
            () => {
                expect(splice('abcdefghi', 0, 0, 'foo')).to.equal('fooabcdefghi');
                expect(splice('abcdefghi', 3, 0, 'foo')).to.equal('abcfoodefghi');
                expect(splice('abcdefghi', 3, 3, 'foo')).to.equal('abcfooghi');
                
            }
        );

        it(
            'should handle negative start',
            () => {
                expect(splice('abcdefghi', -1, 0, 'foo')).to.equal('abcdefghifoo');
                expect(splice('abcdefghi', -2, 0, 'foo')).to.equal('abcdefghfooi');
                
            }
        );

        it(
            'should handle negative deleteLength',
            () => {
                expect(splice('abcdefghi', 3, -3, 'foo')).to.equal('abcfoodefghi');
                
            }
        );

        it(
            'should handle start greater than length',
            () => {
                expect(splice('abcdefghi', 99, 0, 'foo')).to.equal('abcdefghifoo');
                
            }
        );

    }
);

