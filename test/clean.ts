import 'mocha';
import { expect } from 'chai';
import clean      from '../clean';
import {empty}    from '../constants';


describe(
    'clean',
    () => {
        it(
            'should trim whitespace',
            () => {
                expect(clean(empty)).to.equal(empty);
                expect(clean('a b c d')).to.equal('a b c d');
                expect(clean('   a b c d   ')).to.equal('a b c d');
            }
        );

        it(
            'should accept string characters',
            () => {
                expect(clean('***a b c d***', '*')).to.equal('a b c d');
                expect(clean('*#*a b c d#*#', '*#')).to.equal('a b c d');
            }
        );

        it(
            'should accept regular expressions',
            () => {
                expect(clean('@@@a b c d@@@', /@/)).to.equal('a b c d');
                expect(clean('xyza b c dxyzxyz', /xyz/)).to.equal('a b c d');
            }
        );

        it(
            'should accept arrays of strings',
            () => {
                expect(clean('@%!a b c d!%@', [ '@', '%!' ])).to.equal('a b c d');
            }
        );

        it(
            'should accept arrays of regular expressions',
            () => {
                expect(clean('@%!a b c d!%@', [ /@/, /%|!/ ])).to.equal('a b c d');
            }
        );

        it(
            'should accept mixed arrays of regular expressions',
            () => {
                expect(clean('@%!a b c d!%@', [ /@/, '%!' ])).to.equal('a b c d');
            }
        );
    }
);

