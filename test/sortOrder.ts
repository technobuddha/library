import expect from '../util/expect';
import sortOrder  from '../src/sortOrder';

describe(
    'sortOrder',
    () => {
        test(
            'should add select the proper sort order',
            () => {
                expect(sortOrder('pink floyd')).toBe('pink floyd');
                expect(sortOrder('the beatles')).toBe('beatles, the');
                expect(sortOrder('a perfect circle')).toBe('perfect circle, a');
                expect(sortOrder('an elephant ate my homework')).toBe('elephant ate my homework, an');
                expect(sortOrder('"Weird" Al')).toBe('Weird Al');
                expect(sortOrder('"Weird Al')).toBe('Weird Al');
            }
        );

        test(
            'should support the only moveArticles option',
            () => {
                expect(sortOrder('the beatles', { moveArticles: false })).toBe('the beatles');
            }
        );

        test(
            'should support the ignore quotes option',
            () => {
                expect(sortOrder('"Weird" Al', { ignoreQuotes: false })).toBe('"Weird" Al');
            }
        );
    }
);
