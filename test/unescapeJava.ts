import expect from '../util/expect';
import unescapeJava from '../src/unescapeJava';
import { space }    from '../src/constants';

describe(
    'unescapeJava',
    () => {
        test(
            'should unescape standard sequences',
            () => {
                expect(unescapeJava('\\b\\f\\n\\r\\t\\\\\\\'\\"')).toBe('\b\f\n\r\t\\\'"');
            }
        );

        test(
            'should support non-standard sequences',
            () => {
                expect(unescapeJava('\\j\\q\\z')).toBe('\\j\\q\\z');
            }
        );

        test(
            'should unescape octal',
            () => {
                expect(unescapeJava('\\0')).toBe('\0');
                expect(unescapeJava('\\00')).toBe('\0');
                expect(unescapeJava('\\000')).toBe('\0');
                expect(unescapeJava('\\0000')).toBe('\x000');
            }
        );

        test(
            'should unescape unicode',
            () => {
                expect(unescapeJava('\\u0000')).toBe('\0');
                expect(unescapeJava('\\u00000')).toBe('\x000');
                expect(unescapeJava('\\u0000X')).toBe('\0X');
            }
        );

        test(
            'should return ASCII, Latin1, BMP and ASTRAL as-is',
            () => {
                expect(unescapeJava(space)).toBe(space);
                expect(unescapeJava('ABCabc[~]')).toBe('ABCabc[~]');
                expect(unescapeJava('abcdef')).toBe('abcdef');
                expect(unescapeJava('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
                expect(unescapeJava('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
                expect(unescapeJava('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
            }
        );
    }
);
