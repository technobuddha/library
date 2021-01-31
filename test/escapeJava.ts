import 'mocha';
import { expect } from 'chai';
import escapeJava from '../src/escapeJava';
import { space }  from '../src/constants';

describe(
    'escapeJava',
    () => {
        it(
            'should escape standard sequences',
            () => {
                expect(escapeJava('\b\f\n\r\t\\\'"')).to.equal('\\b\\f\\n\\r\\t\\\\\\\'\\"');
            }
        );

        it(
            'should escape nul as \\0, unless followed by an octal digit',
            () => {
                expect(escapeJava('\0')).to.equal('\\0');
                expect(escapeJava('\0X')).to.equal('\\0X');
                expect(escapeJava('\x000')).to.equal('\\0000');
            }
        );

        it(
            'should not escape most ascii',
            () => {
                expect(escapeJava(space)).to.equal(space);
                expect(escapeJava('ABCdef[~]')).to.equal('ABCdef[~]');
            }
        );

        it(
            'should escape non printables as \\unnnn',
            () => {
                expect(escapeJava('\x01')).to.equal('\\u0001');
                expect(escapeJava('\x1f')).to.equal('\\u001f');
                expect(escapeJava('\x7f')).to.equal('\\u007f');
                expect(escapeJava('\xa0')).to.equal('\\u00a0');
            }
        );

        it(
            'should mot escape latin-1 characters',
            () => {
                expect(escapeJava('¡¢£ýþÿ')).to.equal('¡¢£ýþÿ');
            }
        );

        it(
            'should unicode escape BMP characters',
            () => {
                expect(escapeJava('ΑΒΓΔΕΖ')).to.equal('\\u0391\\u0392\\u0393\\u0394\\u0395\\u0396');
            }
        );

        it(
            'should encode astral characters should be UTF-16 encoded',
            () => {
                expect(escapeJava('😀😁😂😺😸😹')).to.equal('\\ud83d\\ude00\\ud83d\\ude01\\ud83d\\ude02\\ud83d\\ude3a\\ud83d\\ude38\\ud83d\\ude39');
            }
        );
    }
);
