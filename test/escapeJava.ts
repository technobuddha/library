import expect from '@util/expect';
import escapeJava from '../src/escapeJava';
import { space }  from '../src/constants';

// cspell:ignore unnnn ΑΒΓΔΕΖ
describe(
    'escapeJava',
    () => {
        test(
            'should escape standard sequences',
            () => {
                expect(escapeJava('\b\f\n\r\t\\\'"')).toBe('\\b\\f\\n\\r\\t\\\\\\\'\\"');
            }
        );

        test(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapeJava('\0')).toBe('\\0');
                expect(escapeJava('\0X')).toBe('\\0X');
                expect(escapeJava('\x000')).toBe('\\0000');
            }
        );

        test(
            'should not escape most ascii',
            () => {
                expect(escapeJava(space)).toBe(space);
                expect(escapeJava('ABCdef[~]')).toBe('ABCdef[~]');
            }
        );

        test(
            'should escape non printables as \\unnnn',
            () => {
                expect(escapeJava('\x01')).toBe('\\u0001');
                expect(escapeJava('\x1f')).toBe('\\u001f');
                expect(escapeJava('\x7f')).toBe('\\u007f');
                expect(escapeJava('\xa0')).toBe('\\u00a0');
            }
        );

        test(
            'should mot escape latin-1 characters',
            () => {
                expect(escapeJava('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
            }
        );

        test(
            'should unicode escape BMP characters',
            () => {
                expect(escapeJava('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        test(
            'should encode astral characters should be UTF-16 encoded',
            () => {
                expect(escapeJava('😀😁😂😺😸😹')).toBe(
                    '\\ud83d\\ude00\\ud83d\\ude01\\ud83d\\ude02\\ud83d\\ude3a\\ud83d\\ude38\\ud83d\\ude39'
                );
            }
        );
    }
);
