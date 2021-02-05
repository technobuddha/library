import expect from '../util/expect';
import toSmallWordsCase  from '../src/toSmallWordsCase';

describe(
    'toSmallWordsCase',
    () => {
        test(
            'should sentences',
            () => {
                expect(toSmallWordsCase('NOW IS THE TIME FOR ALL GOOD MEN TO COME TO THE AID OF THEIR COUNTRY.')).toBe('nOW iS tHE tIME fOR aLL gOOD mEN tO cOME tO tHE aID oF tHEIR cOUNTRY.');
            }
        );

        test(
            'should not change remaining case',
            () => {
                expect(toSmallWordsCase('NOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.')).toBe('nOW iS tHE time fOR aLL good mEN tO cOME tO tHE aID oF tHEIR cOUNTRY.');
            }
        );

        test(
            'should not change to lower case',
            () => {
                expect(toSmallWordsCase('NOW IS THE time FOR ALL good MEN TO COME TO THE AID OF THEIR COUNTRY.', { upperCase: true })).toBe('nOW iS tHE tIME fOR aLL gOOD mEN tO cOME tO tHE aID oF tHEIR cOUNTRY.');
            }
        );
    }
);
