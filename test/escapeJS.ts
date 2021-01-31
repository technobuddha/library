import 'mocha';
import { expect } from 'chai';
import escapeJS   from '../src/escapeJS';
import { space }  from '../src/constants';

describe(
    'escapeJS',
    () => {
        it(
            'should escape standard sequences',
            () => {
                expect(escapeJS('\b\f\n\r\t\v\\\'"')).to.equal('\\b\\f\\n\\r\\t\\v\\\\\\\'\\"');
            }
        );

        it(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapeJS('\0')).to.equal('\\0');
                expect(escapeJS('\0X')).to.equal('\\0X');
                expect(escapeJS('\x000')).to.equal('\\x000');
            }
        );

        it(
            'should not escape most ascii',
            () => {
                expect(escapeJS(space)).to.equal(space);
                expect(escapeJS('ABCdef[~]')).to.equal('ABCdef[~]');
            }
        );

        it(
            'should escape non printables as \\xnn unless followed by a hex digit',
            () => {
                expect(escapeJS('\x01')).to.equal('\\x01');
                expect(escapeJS('\x01X')).to.equal('\\x01X');
                expect(escapeJS('\x010')).to.equal('\\u00010');
                expect(escapeJS('\x1f')).to.equal('\\x1f');
                expect(escapeJS('\x1fX')).to.equal('\\x1fX');
                expect(escapeJS('\x1f0')).to.equal('\\u001f0');
                expect(escapeJS('\x7f')).to.equal('\\x7f');
                expect(escapeJS('\x7fX')).to.equal('\\x7fX');
                expect(escapeJS('\x7f0')).to.equal('\\u007f0');
                expect(escapeJS('\xa0')).to.equal('\\xa0');
                expect(escapeJS('\xa0X')).to.equal('\\xa0X');
                expect(escapeJS('\xa00')).to.equal('\\u00a00');
            }
        );

        it(
            'should mot escape latin-1 characters',
            () => {
                expect(escapeJS('¡¢£ýþÿ')).to.equal('¡¢£ýþÿ');
            }
        );

        it(
            'should unicode escape BMP characters',
            () => {
                expect(escapeJS('ΑΒΓΔΕΖ')).to.equal('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        it(
            'should encode astral characters',
            () => {
                expect(escapeJS('😀😁😂😺😸😹')).to.equal('\\u{1f600}\\u{1f601}\\u{1f602}\\u{1f63a}\\u{1f638}\\u{1f639}');
            }
        );
    }
);
