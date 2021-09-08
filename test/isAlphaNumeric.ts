import expect from '@util/expect';
import isAlphaNumeric from '../src/isAlphaNumeric';
import { empty }      from '../src/constants';

// cspell:ignore AEIOU
describe(
    'isAlphaNumeric',
    () => {
        test(
            'should detect alphanumeric strings',
            () => {
                expect(isAlphaNumeric('AEIOU')).toBe(true);
                expect(isAlphaNumeric('ÂÊîÔû')).toBe(true);
                expect(isAlphaNumeric('A B')).toBe(false);
                expect(isAlphaNumeric('A.B')).toBe(false);
                expect(isAlphaNumeric(empty)).toBe(false);
                expect(isAlphaNumeric('AB101')).toBe(true);
                expect(isAlphaNumeric('01101001')).toBe(true);
            }
        );
    }
);
