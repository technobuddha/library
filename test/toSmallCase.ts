import 'mocha';
import { expect }  from 'chai';
import toSmallCase from '../src/toSmallCase';

describe(
    'toSmallCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toSmallCase('NOW IS THE TiME FOR ALL GOOD MEN TO COME TO THE AID OF THEIR COUNTRY.'))
                .to.equal('nOW IS THE TiME FOR ALL GOOD MEN TO COME TO THE AID OF THEIR COUNTRY.');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toSmallCase('NOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.'))
                .to.equal('nOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.');
            }
        );

        it(
            'should not change to lower case',
            () => {
                expect(toSmallCase('NOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.', { upperCase: true }))
                .to.equal('nOW IS THE TIME FOR ALL GOOD MEN TO COME TO THE AID OF THEIR COUNTRY.');
            }
        );
    }
);
