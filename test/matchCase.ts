import 'mocha';
import { expect } from 'chai';
import matchCase  from '../src/matchCase';

describe(
    'isUpperCase',
    () => {
        it(
            'should match case',
            () => {
                expect(matchCase('abc', 'xyz')).to.equal('abc');
                expect(matchCase('abc', 'XYZ')).to.equal('ABC');
                expect(matchCase('abc', 'Xyz')).to.equal('Abc');
                expect(matchCase('abc', 'xYZ')).to.equal('aBC');
                expect(matchCase('ABC', 'xyz')).to.equal('abc');
                expect(matchCase('ABC', 'XYZ')).to.equal('ABC');
                expect(matchCase('ABC', 'Xyz')).to.equal('Abc');
                expect(matchCase('ABC', 'xYZ')).to.equal('aBC');
            }
        );
    }
);

