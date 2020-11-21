import 'mocha';
import { expect } from 'chai';
import toASCII    from '../toASCII';


describe(
    'toASCII',
    () => {
        it(
            'should bad characters to be replaces',
            () => {
                expect(toASCII('crème brûlée')).to.equal('creme brulee');
                expect(toASCII('ＡＢＣＤ')).to.equal('ABCD');
                expect(toASCII('⒜⒝⒞⒟')).to.equal('(a)(b)(c)(d)');
            }
        );
    }
);

