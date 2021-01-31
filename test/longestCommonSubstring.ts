import 'mocha';
import { expect }             from 'chai';
import longestCommonSubstring from '../src/longestCommonSubstring';

describe(
    'longestCommonSubstring',
    () => {
        it(
            'should handle basic functionality',
            () => {
                expect(longestCommonSubstring("Phil Hill's Greatest Hits", "The Hill's Greatest Hits (1959-2018)"))
                .to.equal(" Hill's Greatest Hits");

                expect(longestCommonSubstring('0123456789', 'x012x456x1234x56x789'))
                .to.equal('1234');
            }
        );
    }
);
