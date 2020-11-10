import 'mocha';
import { expect, use } from 'chai';
import chaiAlmost      from 'chai-almost';
import toPolar         from '../toPolar';

use(chaiAlmost());

describe(
    'toPolar',
    () => {
        it(
            'converts positive angles',
            () => {
                expect(toPolar({ x:  10,              y:   0              })).to.deep.almost.equal({ radius: 10, angle:  0 * Math.PI / 4 });
                expect(toPolar({ x:  10 / Math.SQRT2, y:  10 / Math.SQRT2 })).to.deep.almost.equal({ radius: 10, angle:  1 * Math.PI / 4 });
                expect(toPolar({ x:   0             , y:  10              })).to.deep.almost.equal({ radius: 10, angle:  2 * Math.PI / 4 });
                expect(toPolar({ x: -10 / Math.SQRT2, y:  10 / Math.SQRT2 })).to.deep.almost.equal({ radius: 10, angle:  3 * Math.PI / 4 });
                expect(toPolar({ x: -10             , y:   0              })).to.deep.almost.equal({ radius: 10, angle:  4 * Math.PI / 4 });
                expect(toPolar({ x: -10 / Math.SQRT2, y: -10 / Math.SQRT2 })).to.deep.almost.equal({ radius: 10, angle:  5 * Math.PI / 4 });
                expect(toPolar({ x:   0             , y: -10              })).to.deep.almost.equal({ radius: 10, angle:  6 * Math.PI / 4 });
                expect(toPolar({ x:  10 / Math.SQRT2, y: -10 / Math.SQRT2 })).to.deep.almost.equal({ radius: 10, angle:  7 * Math.PI / 4 });
            }
        );
    }
);

