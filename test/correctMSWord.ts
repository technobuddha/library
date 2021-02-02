import expect from '../util/expect';
import correctMSWord from '../src/correctMSWord';

describe(
    'correctMSWord',
    () => {
        it(
            'should handle whole numbers than 1',
            () => {
                expect(correctMSWord('\u00A0')).toBe(' ');
                expect(correctMSWord('–—')).toBe('--');
                expect(correctMSWord('‘’')).toBe("''");
                expect(correctMSWord('‹›')).toBe('<>');
                expect(correctMSWord('“”')).toBe('""');
                expect(correctMSWord('«»')).toBe('<<>>');
                expect(correctMSWord('©')).toBe('(c)');
                expect(correctMSWord('®')).toBe('(r)');
                expect(correctMSWord('¼')).toBe('1/4');
                expect(correctMSWord('½')).toBe('1/2');
                expect(correctMSWord('¾')).toBe('3/4');
                expect(correctMSWord('…')).toBe('...');
                expect(correctMSWord('€')).toBe('(e)');
                expect(correctMSWord('←')).toBe('<--');
                expect(correctMSWord('→')).toBe('-->');
                expect(correctMSWord('⇐')).toBe('<==');
                expect(correctMSWord('⇒')).toBe('==>');
                expect(correctMSWord('⇔')).toBe('<=>');
                expect(correctMSWord('☹')).toBe(':(');
                expect(correctMSWord('☺')).toBe(':)');
            }
        );
    }
);
