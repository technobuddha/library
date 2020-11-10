import 'mocha';
import { expect } from 'chai';
import variance   from '../variance';

describe(
    'variance',
    () => {
        it(
            'should compute variance',
            () => {
                expect(variance(  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10)).to.equal(11);
                expect(variance(  0,   2,   4,   6,   8,  10,  12,  14,  16,  18,  20)).to.equal(44);
                expect(variance( -5,  -4,  -3,  -2,  -1,   0,   1,   2,   3,   4,   5)).to.equal(11);
                expect(variance(-10,  -8,  -6,  -4,  -2,   0,   2,   4,   6,   8,  10)).to.equal(44);
            }
        );

        it(
            'should handle edge cases',
            () => {
                expect(variance()).to.be.NaN;
                expect(variance(1)).to.be.NaN;
            }
        );
    }
);

