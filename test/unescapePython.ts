import expect from '../util/expect';
import unescapePython from '../src/unescapePython';
import { space }      from '../src/constants';

describe(
    'unescapePython',
    () => {
        it(
            'should unescape standard sequences',
            () => {
                expect(unescapePython('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"')).toBe('\x07\b\f\n\r\t\v\\\'"');
            }
        );

        it(
            'should upport non-standard sequenes',
            () => {
                expect(unescapePython('\\j\\q\\z')).toBe('\\j\\q\\z');
            }
        );

        it(
            'should unescape octal',
            () => {
                expect(unescapePython('\\0')).toBe('\0');
                expect(unescapePython('\\00')).toBe('\0');
                expect(unescapePython('\\000')).toBe('\0');
                expect(unescapePython('\\0000')).toBe('\x000');
            }
        );

        it(
            'should unescape hex',
            () => {
                expect(unescapePython('\\x0')).toBe('\0');
                expect(unescapePython('\\x00')).toBe('\0');
                expect(unescapePython('\\x000')).toBe('\0');
                expect(unescapePython('\\x0000')).toBe('\0');
                expect(unescapePython('\\x00000')).toBe('\0');
                expect(unescapePython('\\x000000')).toBe('\0');
                expect(unescapePython('\\x0000000')).toBe('\0');
                expect(unescapePython('\\x00000000')).toBe('\0');
                expect(unescapePython('\\x000000000')).toBe('\0');
                expect(unescapePython('\\x0X')).toBe('\0X');
                expect(unescapePython('\\x00X')).toBe('\0X');
                expect(unescapePython('\\x000X')).toBe('\0X');
                expect(unescapePython('\\x0000X')).toBe('\0X');
                expect(unescapePython('\\x00000X')).toBe('\0X');
                expect(unescapePython('\\x000000X')).toBe('\0X');
                expect(unescapePython('\\x0000000X')).toBe('\0X');
                expect(unescapePython('\\x00000000X')).toBe('\0X');
                expect(unescapePython('\\x000000000X')).toBe('\0X');
            }
        );

        it(
            'should unescape unicode',
            () => {
                expect(unescapePython('\\u0000')).toBe('\0');
                expect(unescapePython('\\u00000')).toBe('\x000');
                expect(unescapePython('\\u0000X')).toBe('\0X');
            }
        );

        it(
            'should unescape exended unicode',
            () => {
                expect(unescapePython('\\U00000000')).toBe('\0');
                expect(unescapePython('\\U000000000')).toBe('\x000');
                expect(unescapePython('\\U00000000X')).toBe('\0X');
            }
        );

        it(
            'should return ASCII, Latin1, BMP and ASTRAL as-is',
            () => {
                expect(unescapePython(space)).toBe(space);
                expect(unescapePython('ABCabc[~]')).toBe('ABCabc[~]');
                expect(unescapePython('abcdef')).toBe('abcdef');
                expect(unescapePython('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
                expect(unescapePython('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
                expect(unescapePython('😀😁😂😺😸😹')).toBe('😀😁😂😺😸😹');
            }
        );
    }
);
