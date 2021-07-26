import expect from '../util/expect';
import escapeJS   from '../src/escapeJS';
import { space }  from '../src/constants';

// cspell:ignore ΑΒΓΔΕΖ
describe(
    'escapeJS',
    () => {
        test(
            'should escape standard sequences',
            () => {
                expect(escapeJS('\b\f\n\r\t\v\\\'"')).toBe('\\b\\f\\n\\r\\t\\v\\\\\\\'\\"');
            }
        );

        test(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapeJS('\0')).toBe('\\0');
                expect(escapeJS('\0X')).toBe('\\0X');
                expect(escapeJS('\x000')).toBe('\\x000');
            }
        );

        test(
            'should not escape most ascii',
            () => {
                expect(escapeJS(space)).toBe(space);
                expect(escapeJS('ABCdef[~]')).toBe('ABCdef[~]');
            }
        );

        test(
            'should escape non printables as \\xnn unless followed by a hex digit',
            () => {
                expect(escapeJS('\x01')).toBe('\\x01');
                expect(escapeJS('\x01X')).toBe('\\x01X');
                expect(escapeJS('\x010')).toBe('\\u00010');
                expect(escapeJS('\x01a')).toBe('\\u0001a');
                expect(escapeJS('\x01A')).toBe('\\u0001A');
                expect(escapeJS('\x1f')).toBe('\\x1f');
                expect(escapeJS('\x1fX')).toBe('\\x1fX');
                expect(escapeJS('\x1f0')).toBe('\\u001f0');
                expect(escapeJS('\x1fa')).toBe('\\u001fa');
                expect(escapeJS('\x1fA')).toBe('\\u001fA');
                expect(escapeJS('\x7f')).toBe('\\x7f');
                expect(escapeJS('\x7fX')).toBe('\\x7fX');
                expect(escapeJS('\x7f0')).toBe('\\u007f0');
                expect(escapeJS('\x7fa')).toBe('\\u007fa');
                expect(escapeJS('\x7fA')).toBe('\\u007fA');
                expect(escapeJS('\xa0')).toBe('\\xa0');
                expect(escapeJS('\xa0X')).toBe('\\xa0X');
                expect(escapeJS('\xa00')).toBe('\\u00a00');
                expect(escapeJS('\xa0a')).toBe('\\u00a0a');
                expect(escapeJS('\xa0A')).toBe('\\u00a0A');
            }
        );

        test(
            'should mot escape latin-1 characters',
            () => {
                expect(escapeJS('¡¢£ýþÿ')).toBe('¡¢£ýþÿ');
            }
        );

        test(
            'should unicode escape BMP characters',
            () => {
                expect(escapeJS('ΑΒΓΔΕΖ')).toBe('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        test(
            'should encode astral characters',
            () => {
                expect(escapeJS('😀😁😂😺😸😹')).toBe('\\u{1f600}\\u{1f601}\\u{1f602}\\u{1f63a}\\u{1f638}\\u{1f639}');
            }
        );
    }
);
