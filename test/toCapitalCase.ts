import 'mocha';
import { expect }    from 'chai';
import toCapitalCase from '../src/toCapitalCase';


describe(
    'toCapitalCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toCapitalCase('now is the time for all good men to come to the aid of their country.'))
                .to.equal('Now is the time for all good men to come to the aid of their country.');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toCapitalCase('now IS the time for ALL good men to come to the AID of their country.'))
                .to.equal('Now IS the time for ALL good men to come to the AID of their country.');
            }
        );

        it(
            'should not change to lower case',
            () => {
                expect(toCapitalCase('now IS the time for ALL good men to come to the AID of their country.', { lowerCase: true }))
                .to.equal('Now is the time for all good men to come to the aid of their country.');
            }
        )
    }
);

