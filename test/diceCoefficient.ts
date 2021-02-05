import expect from '../util/expect';
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
    }
);
