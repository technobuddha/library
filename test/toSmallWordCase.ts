import 'mocha';
import { expect }        from 'chai';
import toSmallWordsCase  from '../toSmallWordsCase';

describe(
    'toSmallWordsCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toSmallWordsCase('NOW IS THE TIME FOR ALL GOOD MEN TO COME TO THE AID OF THEIR COUNTRY.'))
                .to.equal('nOW iS tHE tIME fOR aLL gOOD mEN tO cOME tO tHE aID oF tHEIR cOUNTRY.');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toSmallWordsCase('NOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.'))
                .to.equal('nOW iS tHE time fOR aLL good mEN tO cOME tO tHE aID oF tHEIR cOUNTRY.');
            }
        );

        it(
            'should not change to lower case',
            () => {
                expect(toSmallWordsCase('NOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.', { upperCase: true }))
                .to.equal('nOW iS tHE tIME fOR aLL gOOD mEN tO cOME tO tHE aID oF tHEIR cOUNTRY.');
            }
        )
    }
);

