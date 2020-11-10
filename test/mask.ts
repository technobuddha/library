import 'mocha';
import { expect } from 'chai';
import mask       from '../mask';

describe(
    'mask',
    () => {
        it(
            'should mask strings',
            () => {
                expect(mask('123456789', '###-##-####')).to.equal('123-45-6789');
            }
        );

        it(
            'should allow for short strings',
            () => {
                expect(mask('1234567', '###-##-####')).to.equal('123-45-67  ');
                expect(mask('1234567', '###-##-####', { missing: '$' })).to.equal('123-45-67$$');
            }
        );

        it(
            'should allow escapes',
            () => {
                expect(mask('123456789', '###-\\#\\#-####')).to.equal('123-##-4567');
            }
        );

    }
);




