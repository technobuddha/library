import 'mocha';
import { expect } from 'chai';
import cleanStart from '../cleanStart';
import { empty }  from '../constants';

describe(
    'cleanStart',
    () => {
        it(
            'should trim whitespace',
            () => {
                expect(cleanStart(empty)).to.equal(empty);
                expect(cleanStart('a b c d')).to.equal('a b c d');
                expect(cleanStart('   a b c d   ')).to.equal('a b c d   ');
            }
        );

        it(
            'should accept string characters',
            () => {
                expect(cleanStart('***a b c d***', '*')).to.equal('a b c d***');
                expect(cleanStart('*#*a b c d#*#', '*#')).to.equal('a b c d#*#');
            }
        );

        it(
            'should accept regular expressions',
            () => {
                expect(cleanStart('@@@a b c d@@@', /@/)).to.equal('a b c d@@@');
                expect(cleanStart('xyza b c dxyzxyz', /xyz/)).to.equal('a b c dxyzxyz');
            }
        );

        it(
            'should accept arrays of strings',
            () => {
                expect(cleanStart('@%!a b c d!%@', [ '@', '%!' ])).to.equal('a b c d!%@');
            }
        );

        it(
            'should accept arrays of regular expressions',
            () => {
                expect(cleanStart('@%!a b c d!%@', [ /@/, /%|!/ ])).to.equal('a b c d!%@');
            }
        );

        it(
            'should accept mixed arrays of regular expressions',
            () => {
                expect(cleanStart('@%!a b c d!%@', [ /@/, '%!' ])).to.equal('a b c d!%@');
            }
        );
    }
);

