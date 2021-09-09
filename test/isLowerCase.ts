import expect from '#util/expect';
import isLowerCase      from '../src/isLowerCase';
import { space, empty } from '../src/constants';

describe(
    'isLowerCase',
    () => {
        test(
            'should detect lower case',
            () => {
                expect(isLowerCase('abcdef')).toBe(true);
                expect(isLowerCase('ABCdef')).toBe(false);
                expect(isLowerCase('ABCDEF')).toBe(false);
                expect(isLowerCase(space)).toBe(false);
                expect(isLowerCase(empty)).toBe(false);
                expect(isLowerCase('abc.def')).toBe(false);
                expect(isLowerCase('$')).toBe(false);
            }
        );
    }
);
