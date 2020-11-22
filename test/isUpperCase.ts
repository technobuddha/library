import 'mocha';
import { expect }       from 'chai';
import isUpperCase      from '../src/isUpperCase';
import { empty, space } from '../src/constants';


describe(
    'isUpperCase',
    () => {
        it(
            'should detect lower case',
            () => {
                expect(isUpperCase('ABCDEF')).to.equal(true);
                expect(isUpperCase('ABCdef')).to.equal(false);
                expect(isUpperCase('abcdef')).to.equal(false);
                expect(isUpperCase(space)).to.equal(false);
                expect(isUpperCase(empty)).to.equal(false);
                expect(isUpperCase('ABC.DEF')).to.equal(false);
                expect(isUpperCase('$')).to.equal(false);
            }
        );
    }
);

