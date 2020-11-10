import 'mocha';
import { expect } from 'chai';
import splitChars from '../splitChars';
import { empty }   from '../constants';

describe(
    'splitChars',
    () => {
        it(
            'should split strings',
            () => {
                expect(splitChars('abcdefghi')).to.deep.equal([ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ]);
                expect(splitChars(empty)).to.deep.equal([]);
                expect(splitChars('⒜⒝⒞⒟')).to.deep.equal(['⒜','⒝','⒞','⒟']);
            }
        );
    }
);

