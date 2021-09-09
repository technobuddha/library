import expect from '#util/expect';
import fuzzyMatch from '../src/fuzzyMatch';

describe(
    'levenshteinDistance',
    () => {
        test(
            'Detect difference between two strings',
            () => {
                expect(fuzzyMatch('Drink Coca Cola', 'Drink Pepsi Cola')).toBe(0.6049568965517242);
                expect(fuzzyMatch('Drink Coca Cola', 'DRINK PEPSI COLA')).toBe(0.6049568965517242);
            }
        );

        test(
            'Support case sensitive option',
            () => {
                expect(fuzzyMatch('Drink Coca Cola', 'DRINK PEPSI COLA', { caseInsensitive: false })).toBeCloseTo(0.2019396551724138);
            }
        );

        test(
            'use weighs',
            () => {
                expect(fuzzyMatch('Drink Coca Cola', 'Drink Pepsi Cola', { weightLevenshteinDistance: 10 })).toBe(0.6324712643678161);
                expect(fuzzyMatch('Drink Coca Cola', 'Drink Pepsi Cola', { weightDiceCoefficient: 10 })).toBe(0.6114350912778905);
                expect(fuzzyMatch('Drink Coca Cola', 'Drink Pepsi Cola', { weightLongestCommonSubstring: 10 })).toBe(0.5027538314176245);
                expect(fuzzyMatch(
                    'Drink Coca Cola',
                    'Drink Pepsi Cola',
                    {
                        weightLevenshteinDistance: 0,
                        weightDiceCoefficient: 0,
                        weightLongestCommonSubstring: 0,
                    }
                )).toBe(0);
            }
        );

        test(
            'Handle empty strings',
            () => {
                expect(fuzzyMatch('Drink Coca Cola', '')).toBe(0);
                expect(fuzzyMatch('', 'Drink Pepsi Cola')).toBe(0);
                expect(fuzzyMatch('', '')).toBe(0);
            }
        );
    }
);
