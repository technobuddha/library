import expect from '../util/expect';
import { clean, cleanEnd, cleanStart } from '../src/clean';
import { empty }    from '../src/constants';

describe(
    'clean',
    () => {
        it(
            'should trim whitespace',
            () => {
                expect(clean(empty)).toBe(empty);
                expect(clean('a b c d')).toBe('a b c d');
                expect(clean('   a b c d   ')).toBe('a b c d');
            }
        );

        it(
            'should accept string characters',
            () => {
                expect(clean('***a b c d***', '*')).toBe('a b c d');
                expect(clean('*#*a b c d#*#', '*#')).toBe('a b c d');
            }
        );

        it(
            'should accept regular expressions',
            () => {
                expect(clean('@@@a b c d@@@', /@/u)).toBe('a b c d');
                expect(clean('xyza b c dxyzxyz', /xyz/u)).toBe('a b c d');
            }
        );

        it(
            'should accept arrays of strings',
            () => {
                expect(clean('@%!a b c d!%@', [ '@', '%!' ])).toBe('a b c d');
            }
        );

        it(
            'should accept arrays of regular expressions',
            () => {
                expect(clean('@%!a b c d!%@', [ /@/u, /%|!/u ])).toBe('a b c d');
            }
        );

        it(
            'should accept mixed arrays of regular expressions',
            () => {
                expect(clean('@%!a b c d!%@', [ /@/u, '%!' ])).toBe('a b c d');
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
                expect(cleanEnd(empty)).toBe(empty);
                expect(cleanEnd('a b c d')).toBe('a b c d');
                expect(cleanEnd('   a b c d   ')).toBe('   a b c d');
            }
        );

        it(
            'should accept string characters',
            () => {
                expect(cleanEnd('***a b c d***', '*')).toBe('***a b c d');
                expect(cleanEnd('*#*a b c d#*#', '*#')).toBe('*#*a b c d');
            }
        );

        it(
            'should accept regular expressions',
            () => {
                expect(cleanEnd('@@@a b c d@@@', /@/u)).toBe('@@@a b c d');
                expect(cleanEnd('xyza b c dxyzxyz', /xyz/u)).toBe('xyza b c d');
            }
        );

        it(
            'should accept arrays of strings',
            () => {
                expect(cleanEnd('@%!a b c d!%@', [ '@', '%!' ])).toBe('@%!a b c d');
            }
        );

        it(
            'should accept arrays of regular expressions',
            () => {
                expect(cleanEnd('@%!a b c d!%@', [ /@/u, /%|!/u ])).toBe('@%!a b c d');
            }
        );

        it(
            'should accept mixed arrays of regular expressions',
            () => {
                expect(cleanEnd('@%!a b c d!%@', [ /@/u, '%!' ])).toBe('@%!a b c d');
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
                expect(cleanStart(empty)).toBe(empty);
                expect(cleanStart('a b c d')).toBe('a b c d');
                expect(cleanStart('   a b c d   ')).toBe('a b c d   ');
            }
        );

        it(
            'should accept string characters',
            () => {
                expect(cleanStart('***a b c d***', '*')).toBe('a b c d***');
                expect(cleanStart('*#*a b c d#*#', '*#')).toBe('a b c d#*#');
            }
        );

        it(
            'should accept regular expressions',
            () => {
                expect(cleanStart('@@@a b c d@@@', /@/u)).toBe('a b c d@@@');
                expect(cleanStart('xyza b c dxyzxyz', /xyz/u)).toBe('a b c dxyzxyz');
            }
        );

        it(
            'should accept arrays of strings',
            () => {
                expect(cleanStart('@%!a b c d!%@', [ '@', '%!' ])).toBe('a b c d!%@');
            }
        );

        it(
            'should accept arrays of regular expressions',
            () => {
                expect(cleanStart('@%!a b c d!%@', [ /@/u, /%|!/u ])).toBe('a b c d!%@');
            }
        );

        it(
            'should accept mixed arrays of regular expressions',
            () => {
                expect(cleanStart('@%!a b c d!%@', [ /@/u, '%!' ])).toBe('a b c d!%@');
            }
        );
    }
);
