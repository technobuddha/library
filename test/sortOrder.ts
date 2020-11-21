import 'mocha';
import { expect } from 'chai';
import sortOrder  from '../sortOrder';


describe(
    'sortOrder',
    () => {
        it(
            'should add select the proper sort order',
            () => {
                expect(sortOrder('pink floyd')).to.equal('pink floyd');
                expect(sortOrder('the beatles')).to.equal('beatles, the');
                expect(sortOrder('a perfect circle')).to.equal('perfect circle, a');
            }
        );

        it(
            'should support the only moveArticles option',
            () => {
                expect(sortOrder('the beatles', { moveArticles: false })).to.equal('the beatles');
            }
        );
    }
);

