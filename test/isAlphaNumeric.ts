import 'mocha';
import { expect }     from 'chai';
import isAlphaNumeric from '../isAlphaNumeric';
import { empty }      from '../constants';

describe(
    'isAlphaNumeric',
    () => {
        it(
            'should detect alphanumeric strings',
            () => {
                expect(isAlphaNumeric('AEIOU')).to.equal(true);
                expect(isAlphaNumeric('ÂÊîÔû')).to.equal(true);
                expect(isAlphaNumeric('A B')).to.equal(false);
                expect(isAlphaNumeric('A.B')).to.equal(false);
                expect(isAlphaNumeric(empty)).to.equal(false);
                expect(isAlphaNumeric('AB101')).to.equal(true);
                expect(isAlphaNumeric('01101001')).to.equal(true);
            }
        );
    }
);




