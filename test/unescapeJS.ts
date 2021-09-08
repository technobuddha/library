import expect from '@util/expect';
import unescapeJS from '../src/unescapeJS';
import { space }  from '../src/constants';

// cspell:ignore ΑΒΓΔΕΖ
describe(
    'unescapeJS',
    () => {
        test(
            'should unescape standard sequences',
            () => {
                expect(unescapeJS('\\b\\f\\n\\r\\t\\v\\\\\\\'\\"')).toBe('\b\f\n\r\t\v\\\'"');
            }
        );

        test(
            'should support non-standard sequences',
            () => {
                expect(unescapeJS('\\j\\q\\z')).toBe('jqz');
            }
        );

        test(
            'should unescape octal',
            () => {
                expect(unescapeJS('\\0')).toBe('\0');
                expect(unescapeJS('\\00')).toBe('\0');
                expect(unescapeJS('\\000')).toBe('\0');
                expect(unescapeJS('\\0000')).toBe('\x000');
            }
        );

        test(
            'should unescape hex',
            () => {
                expect(unescapeJS('\\x00')).toBe('\0');
                expect(unescapeJS('\\x00X')).toBe('\0X');
            }
        );

        test(
            'should unescape unicode',
            () => {
                expect(unescapeJS('\\u0000')).toBe('\0');
                expect(unescapeJS('\\u00000')).toBe('\x000');
                expect(unescapeJS('\\u0000X')).toBe('\0X');
            }
        );

        test(
            'should unescape extended unicode',
            () => {
                expect(unescapeJS('\\u{0}')).toBe('\0');
                expect(unescapeJS('\\u{0}0')).toBe('\x000');
                expect(unescapeJS('\\u{0}X')).toBe('\0X');
            }
        );

        test(
            'should return ASCII, Latin1, BMP and ASTRAL as-is',
            () => {
                expect(unescapeJS(space)).toBe(space);
                expect(unescapeJS('ABCabc[~]')).toBe('ABCabc[~]');
                expect(unescapeJS('abcdef')).toBe('abcdef');
                expect(unescapeJS('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
                expect(unescapeJS('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
                expect(unescapeJS('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
            }
        );
    }
);
