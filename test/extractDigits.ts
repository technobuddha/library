import expect from '../util/expect';
import extractDigits from '../src/extractDigits';
import { empty }     from '../src/constants';

describe(
    'extractDigits',
    () => {
        it(
            'should add Suffixes when needed',
            () => {
                expect(extractDigits('abcdef')).toBe(empty);
                expect(extractDigits('a0b1c2d3e4')).toBe('01234');
                expect(extractDigits('123')).toBe('123');
                expect(extractDigits(empty)).toBe(empty);
            }
        );
    }
);
