import expect from '../util/expect';
import escapePython from '../src/escapePython';
import { space }    from '../src/constants';

describe(
    'escapePython',
    () => {
        test(
            'should escape standard sequences',
            () => {
                expect(escapePython('\x07\b\f\n\r\t\v\\\'"')).toBe('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"');
            }
        );

        test(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapePython('\0')).toBe('\\0');
                expect(escapePython('\0X')).toBe('\\0X');
                expect(escapePython('\x000')).toBe('\\0000');
            }
        );

        test(
            'should not escape most ascii',
            () => {
                expect(escapePython(space)).toBe(space);
                expect(escapePython('ABCdef[~]')).toBe('ABCdef[~]');
            }
        );

        test(
            'should escape non printables as \\xnn unless followed by a hex digit',
            () => {
                expect(escapePython('\x01')).toBe('\\x01');
                expect(escapePython('\x01X')).toBe('\\x01X');
                expect(escapePython('\x010')).toBe('\\u00010');
                expect(escapePython('\x01a')).toBe('\\u0001a');
                expect(escapePython('\x01A')).toBe('\\u0001A');
                expect(escapePython('\x1f')).toBe('\\x1f');
                expect(escapePython('\x1fX')).toBe('\\x1fX');
                expect(escapePython('\x1f0')).toBe('\\u001f0');
                expect(escapePython('\x1fa')).toBe('\\u001fa');
                expect(escapePython('\x1fA')).toBe('\\u001fA');
                expect(escapePython('\x7f')).toBe('\\x7f');
                expect(escapePython('\x7fX')).toBe('\\x7fX');
                expect(escapePython('\x7f0')).toBe('\\u007f0');
                expect(escapePython('\x7fa')).toBe('\\u007fa');
                expect(escapePython('\x7fA')).toBe('\\u007fA');
                expect(escapePython('\xa0')).toBe('\\xa0');
                expect(escapePython('\xa0X')).toBe('\\xa0X');
                expect(escapePython('\xa00')).toBe('\\u00a00');
                expect(escapePython('\xa0a')).toBe('\\u00a0a');
                expect(escapePython('\xa0A')).toBe('\\u00a0A');
            }
        );

        test(
            'should mot escape latin-1 characters',
            () => {
                expect(escapePython('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
            }
        );

        test(
            'should unicode escape BMP characters',
            () => {
                // cspell:disable-next-line
                expect(escapePython('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        test(
            'should encode astral characters',
            () => {
                expect(escapePython('😀😁😂😺😸😹')).toBe('\\U0001f600\\U0001f601\\U0001f602\\U0001f63a\\U0001f638\\U0001f639');
            }
        );
    }
);
