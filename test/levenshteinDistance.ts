import expect from '../util/expect';
import levenshteinDistance from '../src/levenshteinDistance';

describe(
    'levenshteinDistance',
    () => {
        it(
            'Detect difference between two strings',
            () => {
                expect(levenshteinDistance('Drink Coca Cola', 'Drink Pepsi Cola')).toBeCloseTo(0.6875);
            }
        );
    }
);
