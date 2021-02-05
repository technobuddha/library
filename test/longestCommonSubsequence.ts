import expect from '../util/expect';
import longestCommonSubsequence from '../src/longestCommonSubsequence';

describe(
    'longestCommonSubsequence',
    () => {
        test(
            'should handle basic functionality',
            () => {
                expect(longestCommonSubsequence([ 'a', 'b', 'c', ' ', 'd', 'e', 'f' ], [ 'a', 'c', ' ', 'd', 'e', 'c' ])).toEqual([ 'a', 'c', ' ', 'd', 'e' ]);

                expect(longestCommonSubsequence('0123456789', 'x012x456x1234x56x789')).toEqual([ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]);
            }
        );
    }
);
