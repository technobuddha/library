import 'mocha';
import { expect }        from 'chai';
import toCapitalWordCase from '../toCapitalWordCase';

describe(
    'toCapitalWordCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toCapitalWordCase('now is the time for all good men to come to the aid of their country.'))
                .to.equal('Now Is The Time For All Good Men To Come To The Aid Of Their Country.');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toCapitalWordCase('now IS the time for ALL good men to come to the AID of their country.'))
                .to.equal('Now IS The Time For ALL Good Men To Come To The AID Of Their Country.');
            }
        );

        it(
            'should change to lower case',
            () => {
                expect(toCapitalWordCase('now IS the time for ALL good men to come to the AID of their country.', { lowerCase: true }))
                .to.equal('Now Is The Time For All Good Men To Come To The Aid Of Their Country.');
            }
        )
    }
);

