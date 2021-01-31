import 'mocha';
import { expect }    from 'chai';
import correctMSWord from '../src/correctMSWord';

describe(
    'correctMSWord',
    () => {
        it(
            'should handle whole numbers than 1',
            () => {
                expect(correctMSWord('\u00A0')).to.equal(' ');
                expect(correctMSWord('–—')).to.equal('--');
                expect(correctMSWord('‘’')).to.equal("''");
                expect(correctMSWord('‹›')).to.equal('<>');
                expect(correctMSWord('“”')).to.equal('""');
                expect(correctMSWord('«»')).to.equal('<<>>');
                expect(correctMSWord('©')).to.equal('(c)');
                expect(correctMSWord('®')).to.equal('(r)');
                expect(correctMSWord('¼')).to.equal('1/4');
                expect(correctMSWord('½')).to.equal('1/2');
                expect(correctMSWord('¾')).to.equal('3/4');
                expect(correctMSWord('…')).to.equal('...');
                expect(correctMSWord('€')).to.equal('(e)');
                expect(correctMSWord('←')).to.equal('<--');
                expect(correctMSWord('→')).to.equal('-->');
                expect(correctMSWord('⇐')).to.equal('<==');
                expect(correctMSWord('⇒')).to.equal('==>');
                expect(correctMSWord('⇔')).to.equal('<=>');
                expect(correctMSWord('☹')).to.equal(':(');
                expect(correctMSWord('☺')).to.equal(':)');
            }
        );
    }
);
