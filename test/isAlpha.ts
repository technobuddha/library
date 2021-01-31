import 'mocha';
import { expect } from 'chai';
import isAlpha    from '../src/isAlpha';
import { empty }  from '../src/constants';

describe(
    'isAlpha',
    () => {
        it(
            'should detect alphabetic strings',
            () => {
                expect(isAlpha('AEIOU')).to.equal(true);
                expect(isAlpha('ÂÊîÔû')).to.equal(true);
                expect(isAlpha('A B')).to.equal(false);
                expect(isAlpha('A.B')).to.equal(false);
                expect(isAlpha(empty)).to.equal(false);
                expect(isAlpha('AB101')).to.equal(false);
                expect(isAlpha('01101001')).to.equal(false);
            }
        );
    }
);
