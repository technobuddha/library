import expect from '@util/expect';
import escapeC    from '../src/escapeC';
import { space }  from '../src/constants';

describe(
    'escapeC',
    () => {
        test(
            'should escape standard sequences',
            () => {
                expect(escapeC('\x07\b\f\n\r\t\v\\\'"?')).toBe('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"\\?');
            }
        );

        test(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapeC('\0')).toBe('\\0');
                expect(escapeC('\0X')).toBe('\\0X');
                expect(escapeC('\x000')).toBe('\\0000');
            }
        );

        test(
            'should not escape most ascii',
            () => {
                expect(escapeC(space)).toBe(space);
                expect(escapeC('ABCdef[~]')).toBe('ABCdef[~]');
            }
        );

        test(
            'should escape non printables as \\xnn unless followed by a hex digit',
            () => {
                expect(escapeC('\x01')).toBe('\\x01');
                expect(escapeC('\x01X')).toBe('\\x01X');
                expect(escapeC('\x010')).toBe('\\u00010');
                expect(escapeC('\x01a')).toBe('\\u0001a');
                expect(escapeC('\x01A')).toBe('\\u0001A');
                expect(escapeC('\x1f')).toBe('\\x1f');
                expect(escapeC('\x1fX')).toBe('\\x1fX');
                expect(escapeC('\x1f0')).toBe('\\u001f0');
                expect(escapeC('\x1fa')).toBe('\\u001fa');
                expect(escapeC('\x1fA')).toBe('\\u001fA');
                expect(escapeC('\x7f')).toBe('\\x7f');
                expect(escapeC('\x7fX')).toBe('\\x7fX');
                expect(escapeC('\x7f0')).toBe('\\u007f0');
                expect(escapeC('\x7fa')).toBe('\\u007fa');
                expect(escapeC('\x7fA')).toBe('\\u007fA');
                expect(escapeC('\xa0')).toBe('\\xa0');
                expect(escapeC('\xa0X')).toBe('\\xa0X');
                expect(escapeC('\xa00')).toBe('\\u00a00');
                expect(escapeC('\xa0a')).toBe('\\u00a0a');
                expect(escapeC('\xa0A')).toBe('\\u00a0A');
            }
        );

        test(
            'should mot escape latin-1 characters',
            () => {
                expect(escapeC('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
            }
        );

        test(
            'should unicode escape BMP characters',
            () => {
                // cspell:disable-next-line
                expect(escapeC('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        test(
            'should encode astral characters',
            () => {
                expect(escapeC('😀😁😂😺😸😹')).toBe('\\U0001f600\\U0001f601\\U0001f602\\U0001f63a\\U0001f638\\U0001f639');
            }
        );
    }
);
