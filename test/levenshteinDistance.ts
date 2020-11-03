import 'mocha';
import { expect, use }     from 'chai';
import chaiAlmost          from 'chai-almost';
import levenshteinDistance from '../levenshteinDistance';

use(chaiAlmost());

describe(
    'levenshteinDistance',
    () => {
        it(
            'Detect difference between two strings',
            () => {
                expect(levenshteinDistance('Drink Coca Cola', 'Drink Pepsi Cola')).to.almost.equal(0.6875);
            }
        );
    }
);

