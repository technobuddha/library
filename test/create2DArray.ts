import 'mocha';
import { expect } from 'chai';
import create2DArray from '../create2DArray';

describe(
    'create2DArray',
    () => {
        it(
            'should fill from value',
            () => {
                expect(create2DArray(3, 4, 0)).to.deep.equal([[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
            }
        );

        it(
            'should fill from function',
            () => {
                expect(create2DArray(3, 4, (x,y) => x*10+y)).to.deep.equal([[0,1,2,3],[10,11,12,13],[20,21,22,23]]);
            }
        );
    }
);
