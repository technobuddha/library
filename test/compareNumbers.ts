import 'mocha';
import { expect }    from 'chai';
import compareNumbers from '../compareNumbers';


describe(
    'compareNumbers',
    () => {
        it(
            'should compare strings',
            () => {
                expect(compareNumbers(1, 1)).to.equal(0);
                expect(compareNumbers(1, 2)).to.equal(-1);
                expect(compareNumbers(2, 1)).to.equal(1);
            }
        );

        it(
            'should handle nulls',
            () => {
                expect(compareNumbers(null, null)).to.equal(0);
                expect(compareNumbers(null, 1)).to.equal(-1);
                expect(compareNumbers(1, null)).to.equal(1);
            }
        );
    }
);

