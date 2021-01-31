import 'mocha';
import { expect } from 'chai';
import escapeC    from '../src/escapeC';
import { space }  from '../src/constants';

describe(
    'escapeC',
    () => {
        it(
            'should escape standard sequences',
            () => {
                expect(escapeC('\x07\b\f\n\r\t\v\\\'"?')).to.equal('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"\\?');
            }
        );

        it(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapeC('\0')).to.equal('\\0');
                expect(escapeC('\0X')).to.equal('\\0X');
                expect(escapeC('\x000')).to.equal('\\0000');
            }
        );

        it(
            'should not escape most ascii',
            () => {
                expect(escapeC(space)).to.equal(space);
                expect(escapeC('ABCdef[~]')).to.equal('ABCdef[~]');
            }
        );

        it(
            'should escape non printables as \\xnn unless followed by a hex digit',
            () => {
                expect(escapeC('\x01')).to.equal('\\x01');
                expect(escapeC('\x01X')).to.equal('\\x01X');
                expect(escapeC('\x010')).to.equal('\\u00010');
                expect(escapeC('\x1f')).to.equal('\\x1f');
                expect(escapeC('\x1fX')).to.equal('\\x1fX');
                expect(escapeC('\x1f0')).to.equal('\\u001f0');
                expect(escapeC('\x7f')).to.equal('\\x7f');
                expect(escapeC('\x7fX')).to.equal('\\x7fX');
                expect(escapeC('\x7f0')).to.equal('\\u007f0');
                expect(escapeC('\xa0')).to.equal('\\xa0');
                expect(escapeC('\xa0X')).to.equal('\\xa0X');
                expect(escapeC('\xa00')).to.equal('\\u00a00');
            }
        );

        it(
            'should mot escape latin-1 characters',
            () => {
                expect(escapeC('¡¢£ýþÿ')).to.equal('¡¢£ýþÿ');
            }
        );

        it(
            'should unicode escape BMP characters',
            () => {
                expect(escapeC('ΑΒΓΔΕΖ')).to.equal('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        it(
            'should encode astral characters',
            () => {
                expect(escapeC('😀😁😂😺😸😹')).to.equal('\\U0001f600\\U0001f601\\U0001f602\\U0001f63a\\U0001f638\\U0001f639');
            }
        );
    }
);
