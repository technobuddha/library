import 'mocha';
import { expect }        from 'chai';
import standardDeviation from '../src/standardDeviation';

describe(
    'standardDeviation',
    () => {
        it(
            'should compute standardDeviation',
            () => {
                expect(standardDeviation(0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10)).to.equal(Math.sqrt(11));
                expect(standardDeviation(0,   2,   4,   6,   8,  10,  12,  14,  16,  18,  20)).to.equal(Math.sqrt(44));
                expect(standardDeviation(-5,  -4,  -3,  -2,  -1,   0,   1,   2,   3,   4,   5)).to.equal(Math.sqrt(11));
                expect(standardDeviation(-10,  -8,  -6,  -4,  -2,   0,   2,   4,   6,   8,  10)).to.equal(Math.sqrt(44));
            }
        );

        it(
            'should handle edge cases',
            () => {
                expect(isNaN(standardDeviation())).to.equal(true);
                expect(isNaN(standardDeviation(1))).to.equal(true);
            }
        );
    }
);
