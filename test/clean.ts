import 'mocha';
import { expect } from 'chai';
import {clean, cleanEnd, cleanStart} from '../clean';
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

