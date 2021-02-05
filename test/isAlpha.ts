import expect from '../util/expect';
import isAlpha    from '../src/isAlpha';
import { empty }  from '../src/constants';

describe(
    'isAlpha',
    () => {
        test(
            'should detect alphabetic strings',
            () => {
                expect(isAlpha('AEIOU')).toBe(true);
                expect(isAlpha('ÂÊîÔû')).toBe(true);
                expect(isAlpha('A B')).toBe(false);
                expect(isAlpha('A.B')).toBe(false);
                expect(isAlpha(empty)).toBe(false);
                expect(isAlpha('AB101')).toBe(false);
                expect(isAlpha('01101001')).toBe(false);
            }
        );
    }
);
