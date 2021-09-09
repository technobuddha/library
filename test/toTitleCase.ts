import expect from '#util/expect';
import toTitleCase  from '../src/toTitleCase';

describe(
    'toTitleCase',
    () => {
        test(
            'should handle sentences',
            () => {
                expect(toTitleCase('now is the time for all good men to come to the aid of their country.')).toBe('Now Is the Time for All Good Men to Come to the Aid of Their Country.');
            }
        );

        test(
            'should handle compound hyphenated words',
            () => {
                expect(toTitleCase('mother-in-law')).toBe('Mother-in-Law');
            }
        );

        test(
            'should handle acronyms',
            () => {
                expect(toTitleCase('AT&T')).toBe('AT&T');
            }
        );
    }
);
