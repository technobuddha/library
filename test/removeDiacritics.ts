import 'mocha';
import { expect }       from 'chai';
import removeDiacritics from '../removeDiacritics';


describe(
    'removeDiacritics',
    () => {
        it(
            'should bad characters to be replaces',
            () => {
                expect(removeDiacritics('crème brûlée')).to.equal('creme brulee');
                expect(removeDiacritics('ＡＢＣＤ')).to.equal('ＡＢＣＤ');
                expect(removeDiacritics('⒜⒝⒞⒟')).to.equal('⒜⒝⒞⒟');
            }
        );
    }
);

