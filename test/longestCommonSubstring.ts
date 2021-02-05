import expect from '../util/expect';
import longestCommonSubstring from '../src/longestCommonSubstring';

describe(
    'longestCommonSubstring',
    () => {
        test(
            'should handle basic functionality',
            () => {
                expect(longestCommonSubstring("Phil Hill's Greatest Hits", "The Hill's Greatest Hits (1959-2018)")).toBe(" Hill's Greatest Hits");

                expect(longestCommonSubstring('0123456789', 'x012x456x1234x56x789')).toBe('1234');
            }
        );
    }
);
