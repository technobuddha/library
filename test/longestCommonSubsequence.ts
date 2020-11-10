import 'mocha';
import { expect }               from 'chai';
import longestCommonSubsequence from '../longestCommonSubsequence';


describe(
    'longestCommonSubsequence',
    () => {
        it(
            'should handle basic functionality',
            () => {
                expect(longestCommonSubsequence(['a','b','c',' ','d','e','f'], ['a','c',' ','d','e','c']))
                .to.deep.equal(['a','c',' ','d','e']);

                expect(longestCommonSubsequence("0123456789", "x012x456x1234x56x789"))
                .to.deep.equal(['0','1','2','3','4','5','6','7','8','9']);
            }
        );
    }
);

