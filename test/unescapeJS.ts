import 'mocha';
import { expect } from 'chai';
import unescapeJS from '../src/unescapeJS';
import { space }  from '../src/constants';

describe(
    'unescapeJS',
    () => {
        it(
            'should unescape standard sequences',
            () => {
                expect(unescapeJS('\\b\\f\\n\\r\\t\\v\\\\\\\'\\"')).to.equal('\b\f\n\r\t\v\\\'"');
            }
        );

        it(
            'should upport non-standard sequenes',
            () => {
                expect(unescapeJS('\\j\\q\\z')).to.equal('jqz');
            }
        );

        it(
            'should unescape octal',
            () => {
                expect(unescapeJS('\\0')).to.equal('\0');
                expect(unescapeJS('\\00')).to.equal('\0');
                expect(unescapeJS('\\000')).to.equal('\0');
                expect(unescapeJS('\\0000')).to.equal('\x000');
            }
        );

        it(
            'should unescape hex',
            () => {
                expect(unescapeJS('\\x00')).to.equal('\0');
                expect(unescapeJS('\\x00X')).to.equal('\0X');
            }
        );

        it(
            'should unescape unicode',
            () => {
                expect(unescapeJS('\\u0000')).to.equal('\0');
                expect(unescapeJS('\\u00000')).to.equal('\x000');
                expect(unescapeJS('\\u0000X')).to.equal('\0X');
            }
        );

        it(
            'should unescape exended unicode',
            () => {
                expect(unescapeJS('\\u{0}')).to.equal('\0');
                expect(unescapeJS('\\u{0}0')).to.equal('\x000');
                expect(unescapeJS('\\u{0}X')).to.equal('\0X');
            }
        );

        it(
            'should return ASCII, Latin1, BMP and ASTRAL as-is',
            () => {
                expect(unescapeJS(space)).to.equal(space);
                expect(unescapeJS('ABCabc[~]')).to.equal('ABCabc[~]');
                expect(unescapeJS('abcdef')).to.equal('abcdef');
                expect(unescapeJS('¡¢£ýþÿ')).to.equal('¡¢£ýþÿ');
                expect(unescapeJS('ΑΒΓΔΕΖ')).to.equal('ΑΒΓΔΕΖ');
                expect(unescapeJS('😀😁😂😺😸😹')).to.equal('😀😁😂😺😸😹');
            }
        );
    }
);
