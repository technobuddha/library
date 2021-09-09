import expect from '#util/expect';
import toCapitalWordCase from '../src/toCapitalWordCase';

describe(
    'toCapitalWordCase',
    () => {
        test(
            'should sentences',
            () => {
                expect(toCapitalWordCase('now is the time for all good men to come to the aid of their country.')).toBe('Now Is The Time For All Good Men To Come To The Aid Of Their Country.');
            }
        );

        test(
            'should not change remaining case',
            () => {
                expect(toCapitalWordCase('now IS the time for ALL good men to come to the AID of their country.')).toBe('Now IS The Time For ALL Good Men To Come To The AID Of Their Country.');
            }
        );

        test(
            'should change to lower case',
            () => {
                expect(toCapitalWordCase('now IS the time for ALL good men to come to the AID of their country.', { lowerCase: true })).toBe('Now Is The Time For All Good Men To Come To The Aid Of Their Country.');
            }
        );
    }
);
