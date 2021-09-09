import expect from '#util/expect';
import unescapeC  from '../src/unescapeC';
import { space }  from '../src/constants';

// cspell:ignore ΑΒΓΔΕΖ
describe(
    'unescapeC',
    () => {
        test(
            'should unescape standard sequences',
            () => {
                expect(unescapeC('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"\\?\\e')).toBe('\x07\b\f\n\r\t\v\\\'"?\x1B');
            }
        );

        test(
            'should support non-standard sequences',
            () => {
                expect(unescapeC('\\j\\q\\z')).toBe('jqz');
            }
        );

        test(
            'should unescape octal',
            () => {
                expect(unescapeC('\\0')).toBe('\0');
                expect(unescapeC('\\00')).toBe('\0');
                expect(unescapeC('\\000')).toBe('\0');
                expect(unescapeC('\\0000')).toBe('\x000');
            }
        );

        test(
            'should unescape hex',
            () => {
                expect(unescapeC('\\x0')).toBe('\0');
                expect(unescapeC('\\x00')).toBe('\0');
                expect(unescapeC('\\x000')).toBe('\0');
                expect(unescapeC('\\x0000')).toBe('\0');
                expect(unescapeC('\\x00000')).toBe('\0');
                expect(unescapeC('\\x000000')).toBe('\0');
                expect(unescapeC('\\x0000000')).toBe('\0');
                expect(unescapeC('\\x00000000')).toBe('\0');
                expect(unescapeC('\\x000000000')).toBe('\0');
                expect(unescapeC('\\x0X')).toBe('\0X');
                expect(unescapeC('\\x00X')).toBe('\0X');
                expect(unescapeC('\\x000X')).toBe('\0X');
                expect(unescapeC('\\x0000X')).toBe('\0X');
                expect(unescapeC('\\x00000X')).toBe('\0X');
                expect(unescapeC('\\x000000X')).toBe('\0X');
                expect(unescapeC('\\x0000000X')).toBe('\0X');
                expect(unescapeC('\\x00000000X')).toBe('\0X');
                expect(unescapeC('\\x000000000X')).toBe('\0X');
            }
        );

        test(
            'should unescape unicode',
            () => {
                expect(unescapeC('\\u0000')).toBe('\0');
                expect(unescapeC('\\u00000')).toBe('\x000');
                expect(unescapeC('\\u0000X')).toBe('\0X');
            }
        );

        test(
            'should unescape extended unicode',
            () => {
                expect(unescapeC('\\U00000000')).toBe('\0');
                expect(unescapeC('\\U000000000')).toBe('\x000');
                expect(unescapeC('\\U00000000X')).toBe('\0X');
            }
        );

        test(
            'should return ASCII, Latin1, BMP and ASTRAL as-is',
            () => {
                expect(unescapeC(space)).toBe(space);
                expect(unescapeC('ABCabc[~]')).toBe('ABCabc[~]');
                expect(unescapeC('abcdef')).toBe('abcdef');
                expect(unescapeC('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
                expect(unescapeC('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
                expect(unescapeC('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
            }
        );
    }
);
