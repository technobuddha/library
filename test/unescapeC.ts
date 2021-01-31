import 'mocha';
import { expect } from 'chai';
import unescapeC  from '../src/unescapeC';
import { space }  from '../src/constants';

describe(
    'unescapeC',
    () => {
        it(
            'should unescape standard sequences',
            () => {
                expect(unescapeC('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"\\?\\e')).to.equal('\x07\b\f\n\r\t\v\\\'"?\x1b');
            }
        );

        it(
            'should upport non-standard sequenes',
            () => {
                expect(unescapeC('\\j\\q\\z')).to.equal('jqz');
            }
        );

        it(
            'should unescape octal',
            () => {
                expect(unescapeC('\\0')).to.equal('\0');
                expect(unescapeC('\\00')).to.equal('\0');
                expect(unescapeC('\\000')).to.equal('\0');
                expect(unescapeC('\\0000')).to.equal('\x000');
            }
        );

        it(
            'should unescape hex',
            () => {
                expect(unescapeC('\\x0')).to.equal('\0');
                expect(unescapeC('\\x00')).to.equal('\0');
                expect(unescapeC('\\x000')).to.equal('\0');
                expect(unescapeC('\\x0000')).to.equal('\0');
                expect(unescapeC('\\x00000')).to.equal('\0');
                expect(unescapeC('\\x000000')).to.equal('\0');
                expect(unescapeC('\\x0000000')).to.equal('\0');
                expect(unescapeC('\\x00000000')).to.equal('\0');
                expect(unescapeC('\\x000000000')).to.equal('\0');
                expect(unescapeC('\\x0X')).to.equal('\0X');
                expect(unescapeC('\\x00X')).to.equal('\0X');
                expect(unescapeC('\\x000X')).to.equal('\0X');
                expect(unescapeC('\\x0000X')).to.equal('\0X');
                expect(unescapeC('\\x00000X')).to.equal('\0X');
                expect(unescapeC('\\x000000X')).to.equal('\0X');
                expect(unescapeC('\\x0000000X')).to.equal('\0X');
                expect(unescapeC('\\x00000000X')).to.equal('\0X');
                expect(unescapeC('\\x000000000X')).to.equal('\0X');
            }
        );

        it(
            'should unescape unicode',
            () => {
                expect(unescapeC('\\u0000')).to.equal('\0');
                expect(unescapeC('\\u00000')).to.equal('\x000');
                expect(unescapeC('\\u0000X')).to.equal('\0X');
            }
        );

        it(
            'should unescape exended unicode',
            () => {
                expect(unescapeC('\\U00000000')).to.equal('\0');
                expect(unescapeC('\\U000000000')).to.equal('\x000');
                expect(unescapeC('\\U00000000X')).to.equal('\0X');
            }
        );

        it(
            'should return ASCII, Latin1, BMP and ASTRAL as-is',
            () => {
                expect(unescapeC(space)).to.equal(space);
                expect(unescapeC('ABCabc[~]')).to.equal('ABCabc[~]');
                expect(unescapeC('abcdef')).to.equal('abcdef');
                expect(unescapeC('¡¢£ýþÿ')).to.equal('¡¢£ýþÿ');
                expect(unescapeC('ΑΒΓΔΕΖ')).to.equal('ΑΒΓΔΕΖ');
                expect(unescapeC('😀😁😂😺😸😹')).to.equal('😀😁😂😺😸😹');
            }
        );
    }
);
