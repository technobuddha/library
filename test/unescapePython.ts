import 'mocha';
import { expect }     from 'chai';
import unescapePython from '../unescapePython';
import { space }      from '../constants';


describe(
    'unescapePython',
    () => {
        it(
            'should unescape standard sequences',
            () => {
                expect(unescapePython('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"')).to.equal('\x07\b\f\n\r\t\v\\\'"');
            }
        );

        it(
            'should upport non-standard sequenes',
            () => {
                expect(unescapePython('\\j\\q\\z')).to.equal('\\j\\q\\z');
            }
        );

        it(
            'should unescape octal',
            () => {
                expect(unescapePython('\\0')).to.equal('\0');
                expect(unescapePython('\\00')).to.equal('\0');
                expect(unescapePython('\\000')).to.equal('\0');
                expect(unescapePython('\\0000')).to.equal('\x000');
            }
        );

        it(
            'should unescape hex',
            () => {
                expect(unescapePython('\\x0')).to.equal('\0');
                expect(unescapePython('\\x00')).to.equal('\0');
                expect(unescapePython('\\x000')).to.equal('\0');
                expect(unescapePython('\\x0000')).to.equal('\0');
                expect(unescapePython('\\x00000')).to.equal('\0');
                expect(unescapePython('\\x000000')).to.equal('\0');
                expect(unescapePython('\\x0000000')).to.equal('\0');
                expect(unescapePython('\\x00000000')).to.equal('\0');
                expect(unescapePython('\\x000000000')).to.equal('\0');
                expect(unescapePython('\\x0X')).to.equal('\0X');
                expect(unescapePython('\\x00X')).to.equal('\0X');
                expect(unescapePython('\\x000X')).to.equal('\0X');
                expect(unescapePython('\\x0000X')).to.equal('\0X');
                expect(unescapePython('\\x00000X')).to.equal('\0X');
                expect(unescapePython('\\x000000X')).to.equal('\0X');
                expect(unescapePython('\\x0000000X')).to.equal('\0X');
                expect(unescapePython('\\x00000000X')).to.equal('\0X');
                expect(unescapePython('\\x000000000X')).to.equal('\0X');
            }
        );

        it(
            'should unescape unicode',
            () => {
                expect(unescapePython('\\u0000')).to.equal('\0');
                expect(unescapePython('\\u00000')).to.equal('\x000');
                expect(unescapePython('\\u0000X')).to.equal('\0X');
            }
        );

        it(
            'should unescape exended unicode',
            () => {
                expect(unescapePython('\\U00000000')).to.equal('\0');
                expect(unescapePython('\\U000000000')).to.equal('\x000');
                expect(unescapePython('\\U00000000X')).to.equal('\0X');
            }
        );

        it(
            'should return ASCII, Latin1, BMP and ASTRAL as-is',
            () => {
                expect(unescapePython(space)).to.equal(space);
                expect(unescapePython('ABCabc[~]')).to.equal('ABCabc[~]');
                expect(unescapePython('abcdef')).to.equal('abcdef');
                expect(unescapePython('¡¢£ýþÿ')).to.equal('¡¢£ýþÿ');
                expect(unescapePython('ΑΒΓΔΕΖ')).to.equal('ΑΒΓΔΕΖ');
                expect(unescapePython('😀😁😂😺😸😹')).to.equal('😀😁😂😺😸😹');
            }
        );
    }
);

