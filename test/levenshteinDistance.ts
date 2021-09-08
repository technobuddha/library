import expect from '@util/expect';
import levenshteinDistance from '../src/levenshteinDistance';

describe(
    'levenshteinDistance',
    () => {
        test(
            'Detect difference between two strings',
            () => {
                expect(levenshteinDistance('Drink Coca Cola', 'Drink Pepsi Cola')).toBe(5);
                expect(levenshteinDistance('Drink Coca Cola', 'DRINK PEPSI COLA')).toBe(5);
            }
        );

        test(
            'Support case sensitive option',
            () => {
                expect(levenshteinDistance('Drink Coca Cola', 'DRINK PEPSI COLA', { caseInsensitive: false })).toBe(11);
            }
        );

        test(
            'Detect letter transposition',
            () => {
                // cspell:ignore Cloa
                expect(levenshteinDistance('Drink Coca Cola', 'Drink Coca Cloa')).toBe(1);
            }
        );

        test(
            'Handle empty strings',
            () => {
                expect(levenshteinDistance('Drink Coca Cola', '')).toBe(15);
                expect(levenshteinDistance('', 'Drink Pepsi Cola')).toBe(16);
                expect(levenshteinDistance('', '')).toBe(0);
            }
        );
    }
);
