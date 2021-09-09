import expect from '#util/expect';
import possessive from '../src/possessive';

describe(
    'possessive',
    () => {
        test(
            'should handle simple possessives',
            () => {
                expect(possessive('Phil')).toBe("Phil's");
                expect(possessive('Chris')).toBe("Chris'");
            }
        );
    }
);
