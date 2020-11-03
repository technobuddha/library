import 'mocha';
import { expect }   from 'chai';
import toBasicLatin from '../toBasicLatin';


describe(
    'toBasicLatin',
    () => {
        it(
            'should bad characters to be replaces',
            () => {
                expect(toBasicLatin('crème brûlée')).to.equal('creme brulee');
                expect(toBasicLatin('ＡＢＣＤ')).to.equal('ABCD');
                expect(toBasicLatin('⒜⒝⒞⒟')).to.equal('(a)(b)(c)(d)');
            }
        );
    }
);

