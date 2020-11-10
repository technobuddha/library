import 'mocha';
import { expect } from 'chai';
import cleanEnd   from '../cleanEnd';
import { empty }  from '../constants';

describe(
    'cleanEnd',
    () => {
        it(
            'should trim whitespace',
            () => {
                expect(cleanEnd(empty)).to.equal(empty);
                expect(cleanEnd('a b c d')).to.equal('a b c d');
                expect(cleanEnd('   a b c d   ')).to.equal('   a b c d');
            }
        );

        it(
            'should accept string characters',
            () => {
                expect(cleanEnd('***a b c d***', '*')).to.equal('***a b c d');
                expect(cleanEnd('*#*a b c d#*#', '*#')).to.equal('*#*a b c d');
            }
        );

        it(
            'should accept regular expressions',
            () => {
                expect(cleanEnd('@@@a b c d@@@', /@/)).to.equal('@@@a b c d');
                expect(cleanEnd('xyza b c dxyzxyz', /xyz/)).to.equal('xyza b c d');
            }
        );

        it(
            'should accept arrays of strings',
            () => {
                expect(cleanEnd('@%!a b c d!%@', [ '@', '%!' ])).to.equal('@%!a b c d');
            }
        );

        it(
            'should accept arrays of regular expressions',
            () => {
                expect(cleanEnd('@%!a b c d!%@', [ /@/, /%|!/ ])).to.equal('@%!a b c d');
            }
        );

        it(
            'should accept mixed arrays of regular expressions',
            () => {
                expect(cleanEnd('@%!a b c d!%@', [ /@/, '%!' ])).to.equal('@%!a b c d');
            }
        );
    }
);

