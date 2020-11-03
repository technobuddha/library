import 'mocha';
import { expect }   from 'chai';
import toPascalCase from '../toPascalCase';

describe(
    'toPascalCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toPascalCase('now is the time for all good men to come to the aid of their country'))
                .to.equal('NowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toPascalCase('now IS the time for ALL good men to come to the AID of their country'))
                .to.equal('NowISTheTimeForALLGoodMenToComeToTheAIDOfTheirCountry');
            }
        );
    }
);

