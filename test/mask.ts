import expect from '../util/expect';
import mask       from '../src/mask';

describe(
    'mask',
    () => {
        it(
            'should mask strings',
            () => {
                expect(mask('123456789', '###-##-####')).toBe('123-45-6789');
            }
        );

        it(
            'should allow for short strings',
            () => {
                expect(mask('1234567', '###-##-####')).toBe('123-45-67  ');
                expect(mask('1234567', '###-##-####', { missing: '$' })).toBe('123-45-67$$');
            }
        );

        it(
            'should allow escapes',
            () => {
                expect(mask('123456789', '###-\\#\\#-####')).toBe('123-##-4567');
            }
        );
    }
);
