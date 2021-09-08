import expect from '@util/expect';
import diceCoefficient from '../src/diceCoefficient';

describe(
    'diceCoefficient',
    () => {
        test(
            'Detect difference between two strings',
            () => {
                expect(diceCoefficient('Drink Coca Cola', 'Drink Pepsi Cola')).toBeCloseTo(0.6206896551724138);
            }
        );

        test(
            'Handle short strings',
            () => {
                expect(diceCoefficient('D', 'D')).toBe(1);
                expect(diceCoefficient('D', 'X')).toBe(0);
                expect(diceCoefficient('', 'X')).toBe(0);
                expect(diceCoefficient('', '')).toBe(1);
            }
        );

        test(
            'Accept case insensitive option',
            () => {
                expect(diceCoefficient('Drink Coca Cola', 'DRINK PEPSI COLA', { caseInsensitive: true })).toBeCloseTo(0.6206896551724138);
                expect(diceCoefficient('D', 'd', { caseInsensitive: true })).toBe(1);
            }
        );
    }
);
