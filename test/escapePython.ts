import 'mocha';
import { expect }   from 'chai';
import escapePython from '../escapePython';
import { space }    from '../constants';

describe(
    'escapePython',
    () => {
        it(
            'should escape standard sequences',
            () => {
                expect(escapePython('\x07\b\f\n\r\t\v\\\'"')).to.equal('\\a\\b\\f\\n\\r\\t\\v\\\\\\\'\\"');
            }
        );

        it(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapePython('\0')).to.equal('\\0');
                expect(escapePython('\0X')).to.equal('\\0X');
                expect(escapePython('\x000')).to.equal('\\0000');
            }
        );

        it(
            'should not escape most ascii',
            () => {
                expect(escapePython(space)).to.equal(space);
                expect(escapePython('ABCdef[~]')).to.equal('ABCdef[~]');
            }
        );

        it(
            'should escape non printables as \\xnn unless followed by a hex digit',
            () => {
                expect(escapePython('\x01')).to.equal('\\x01');
                expect(escapePython('\x01X')).to.equal('\\x01X');
                expect(escapePython('\x010')).to.equal('\\u00010');
                expect(escapePython('\x1f')).to.equal('\\x1f');
                expect(escapePython('\x1fX')).to.equal('\\x1fX');
                expect(escapePython('\x1f0')).to.equal('\\u001f0');
                expect(escapePython('\x7f')).to.equal('\\x7f');
                expect(escapePython('\x7fX')).to.equal('\\x7fX');
                expect(escapePython('\x7f0')).to.equal('\\u007f0');
                expect(escapePython('\xa0')).to.equal('\\xa0');
                expect(escapePython('\xa0X')).to.equal('\\xa0X');
                expect(escapePython('\xa00')).to.equal('\\u00a00');
            }
        );

        it(
            'should mot escape latin-1 characters',
            () => {
                expect(escapePython('¡¢£ýþÿ')).to.equal('¡¢£ýþÿ');
            }
        )

        it(
            'should unicode escape BMP characters',
            () => {
                expect(escapePython('ΑΒΓΔΕΖ')).to.equal('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        it(
            'should encode astral characters',
            () => {
                expect(escapePython('😀😁😂😺😸😹')).to.equal('\\U0001f600\\U0001f601\\U0001f602\\U0001f63a\\U0001f638\\U0001f639');
            }
        );
    }
);

