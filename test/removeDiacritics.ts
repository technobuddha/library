import expect from '../util/expect';
import removeDiacritics from '../src/removeDiacritics';

describe(
    'removeDiacritics',
    () => {
        it(
            'should bad characters to be replaces',
            () => {
                expect(removeDiacritics('crème brûlée')).toBe('creme brulee');
                expect(removeDiacritics('ＡＢＣＤ')).toBe('ＡＢＣＤ');
                expect(removeDiacritics('⒜⒝⒞⒟')).toBe('⒜⒝⒞⒟');
            }
        );
    }
);
