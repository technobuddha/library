import 'mocha';
import { expect }       from 'chai';
import isLowerCase      from '../isLowerCase';
import { space, empty } from '../constants';

describe(
    'isLowerCase',
    () => {
        it(
            'should detect lower case',
            () => {
                expect(isLowerCase('abcdef')).to.equal(true);
                expect(isLowerCase('ABCdef')).to.equal(false);
                expect(isLowerCase('ABCDEF')).to.equal(false);
                expect(isLowerCase(space)).to.equal(false);
                expect(isLowerCase(empty)).to.equal(false);
                expect(isLowerCase('abc.def')).to.equal(false);
                expect(isLowerCase('$')).to.equal(false);
            }
        );
    }
);

