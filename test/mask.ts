import expect from '@util/expect';
import mask       from '../src/mask';

describe(
    'mask',
    () => {
        test(
            'should mask strings',
            () => {
                expect(mask('123456789', '###-##-####')).toBe('123-45-6789');
            }
        );

        test(
            'should allow for short strings',
            () => {
                expect(mask('1234567', '###-##-####')).toBe('123-45-67  ');
                expect(mask('1234567', '###-##-####', { missing: '$' })).toBe('123-45-67$$');
            }
        );

        test(
            'should allow escapes',
            () => {
                expect(mask('123456789', '###-\\#\\#-####')).toBe('123-##-4567');
            }
        );
    }
);
