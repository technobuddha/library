import 'mocha';
import { expect }   from 'chai';
import unescapeJava from '../src/unescapeJava';
import { space }    from '../src/constants';

describe(
    'unescapeJava',
    () => {
        it(
            'should unescape standard sequences',
            () => {
                expect(unescapeJava('\\b\\n\\r\\t\\\\\\\'\\"')).to.equal('\b\n\r\t\\\'"');
            }
        );

        it(
            'should upport non-standard sequenes',
            () => {
                expect(unescapeJava('\\j\\q\\z')).to.equal('\\j\\q\\z');
            }
        );

        it(
            'should unescape octal',
            () => {
                expect(unescapeJava('\\0')).to.equal('\0');
                expect(unescapeJava('\\00')).to.equal('\0');
                expect(unescapeJava('\\000')).to.equal('\0');
                expect(unescapeJava('\\0000')).to.equal('\x000');
            }
        );

        it(
            'should unescape unicode',
            () => {
                expect(unescapeJava('\\u0000')).to.equal('\0');
                expect(unescapeJava('\\u00000')).to.equal('\x000');
                expect(unescapeJava('\\u0000X')).to.equal('\0X');
            }
        );

        it(
            'should return ASCII, Latin1, BMP and ASTRAL as-is',
            () => {
                expect(unescapeJava(space)).to.equal(space);
                expect(unescapeJava('ABCabc[~]')).to.equal('ABCabc[~]');
                expect(unescapeJava('abcdef')).to.equal('abcdef');
                expect(unescapeJava('¡¢£ýþÿ')).to.equal('¡¢£ýþÿ');
                expect(unescapeJava('ΑΒΓΔΕΖ')).to.equal('ΑΒΓΔΕΖ');
                expect(unescapeJava('😀😁😂😺😸😹')).to.equal('😀😁😂😺😸😹');
            }
        );
    }
);
