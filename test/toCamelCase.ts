import 'mocha';
import { expect }  from 'chai';
import toCamelCase from '../toCamelCase';

describe(
    'toCamelCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toCamelCase('now is the time for all good men to come to the aid of their country'))
                .to.equal('nowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toCamelCase('now IS the time for ALL good men to come to the AID of their country'))
                .to.equal('nowISTheTimeForALLGoodMenToComeToTheAIDOfTheirCountry');
            }
        );
    }
);

