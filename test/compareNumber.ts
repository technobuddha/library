import 'mocha';
import { expect }    from 'chai';
import compareNumber from '../compareNumber';


describe(
    'compareNumber',
    () => {
        it(
            'should compare strings',
            () => {
                expect(compareNumber(1, 1)).to.equal(0);
                expect(compareNumber(1, 2)).to.equal(-1);
                expect(compareNumber(2, 1)).to.equal(1);
            }
        );

        it(
            'should handle nulls',
            () => {
                expect(compareNumber(null, null)).to.equal(0);
                expect(compareNumber(null, 1)).to.equal(-1);
                expect(compareNumber(1, null)).to.equal(1);
            }
        );
    }
);

