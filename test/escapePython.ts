import expect from '../util/expect';
import escapePython from '../src/escapePython';
import { space }    from '../src/constants';

describe(
    'escapePython',
    () => {
        it(
            'should escape standard sequences',
            () => {
                expect(escapePython('\x07\b\f\n\r\t\v\\\'"')).toBe('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"');
            }
        );

        it(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapePython('\0')).toBe('\\0');
                expect(escapePython('\0X')).toBe('\\0X');
                expect(escapePython('\x000')).toBe('\\0000');
            }
        );

        it(
            'should not escape most ascii',
            () => {
                expect(escapePython(space)).toBe(space);
                expect(escapePython('ABCdef[~]')).toBe('ABCdef[~]');
            }
        );

        it(
            'should escape non printables as \\xnn unless followed by a hex digit',
            () => {
                expect(escapePython('\x01')).toBe('\\x01');
                expect(escapePython('\x01X')).toBe('\\x01X');
                expect(escapePython('\x010')).toBe('\\u00010');
                expect(escapePython('\x1f')).toBe('\\x1f');
                expect(escapePython('\x1fX')).toBe('\\x1fX');
                expect(escapePython('\x1f0')).toBe('\\u001f0');
                expect(escapePython('\x7f')).toBe('\\x7f');
                expect(escapePython('\x7fX')).toBe('\\x7fX');
                expect(escapePython('\x7f0')).toBe('\\u007f0');
                expect(escapePython('\xa0')).toBe('\\xa0');
                expect(escapePython('\xa0X')).toBe('\\xa0X');
                expect(escapePython('\xa00')).toBe('\\u00a00');
            }
        );

        it(
            'should mot escape latin-1 characters',
            () => {
                expect(escapePython('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
            }
        );

        it(
            'should unicode escape BMP characters',
            () => {
                expect(escapePython('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        it(
            'should encode astral characters',
            () => {
                expect(escapePython('😀😁😂😺😸😹')).toBe('\\U0001f600\\U0001f601\\U0001f602\\U0001f63a\\U0001f638\\U0001f639');
            }
        );
    }
);
