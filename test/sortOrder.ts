import expect from '../util/expect';
import sortOrder  from '../src/sortOrder';

describe(
    'sortOrder',
    () => {
        it(
            'should add select the proper sort order',
            () => {
                expect(sortOrder('pink floyd')).toBe('pink floyd');
                expect(sortOrder('the beatles')).toBe('beatles, the');
                expect(sortOrder('a perfect circle')).toBe('perfect circle, a');
            }
        );

        it(
            'should support the only moveArticles option',
            () => {
                expect(sortOrder('the beatles', { moveArticles: false })).toBe('the beatles');
            }
        );
    }
);
