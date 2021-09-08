import expect from '@util/expect';
import toCamelCase from '../src/toCamelCase';

describe(
    'toCamelCase',
    () => {
        test(
            'should sentences',
            () => {
                expect(toCamelCase('now is the time for all good men to come to the aid of their country')).toBe('nowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry');
            }
        );

        test(
            'should not change remaining case',
            () => {
                expect(toCamelCase('now IS the time for ALL good men to come to the AID of their country')).toBe('nowISTheTimeForALLGoodMenToComeToTheAIDOfTheirCountry');
            }
        );
    }
);
