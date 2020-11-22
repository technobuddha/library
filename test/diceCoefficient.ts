import 'mocha';
import { expect, use } from 'chai';
import chaiAlmost      from 'chai-almost';
import diceCoefficient from '../src/diceCoefficient';

use(chaiAlmost());

describe(
    'diceCoefficient',
    () => {
        it(
            'Detect difference between two strings',
            () => {
                expect(diceCoefficient('Drink Coca Cola', 'Drink Pepsi Cola')).to.almost.equal(0.6206896551724138);
            }
        );
    }
);

