import expect from '#util/expect';
import toSmallCase from '../src/toSmallCase';

describe(
    'toSmallCase',
    () => {
        test(
            'should sentences',
            () => {
                expect(toSmallCase('NOW IS THE TiME FOR ALL GOOD MEN TO COME TO THE AID OF THEIR COUNTRY.')).toBe('nOW IS THE TiME FOR ALL GOOD MEN TO COME TO THE AID OF THEIR COUNTRY.');
            }
        );

        test(
            'should not change remaining case',
            () => {
                expect(toSmallCase('NOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.')).toBe('nOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.');
            }
        );

        test(
            'should not change to lower case',
            () => {
                expect(toSmallCase('NOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.', { upperCase: true })).toBe('nOW IS THE TIME FOR ALL GOOD MEN TO COME TO THE AID OF THEIR COUNTRY.');
            }
        );
    }
);
