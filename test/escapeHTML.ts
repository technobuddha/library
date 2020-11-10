import 'mocha';
import { expect } from 'chai';
import escapeHTML from '../escapeHTML';
import { space }  from '../constants';

describe(
    'escapeHTML',
    () => {
        it(
            'should escape basic characters',
            () => {
                expect(escapeHTML('"&\'<>')).to.equal('&quot;&amp;&apos;&lt;&gt;');
            }
        );

        it(
            'should escape control characters',
            () => {
                expect(escapeHTML('\0')).to.equal('&#0;');
                expect(escapeHTML('\x01')).to.equal('&#1;');
                expect(escapeHTML('\x7f')).to.equal('&#127;');
                expect(escapeHTML('\x9f')).to.equal('&#159;');
            }
        );

        it(
            'should not escape most ascii',
            () => {
                expect(escapeHTML(space)).to.equal(space);
                expect(escapeHTML('ABCdef[~]')).to.equal('ABCdef[~]');
            }
        );

        it(
            'should extended entities',
            () => {
                expect(escapeHTML('ΑΒΓΔΕΖ')).to.equal('ΑΒΓΔΕΖ');
                expect(escapeHTML('ΑΒΓΔΕΖ', { mode: 'extended' })).to.equal('&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;');
                expect(escapeHTML('ΑΒЖК', { mode: 'extended' })).to.equal('&Alpha;&Beta;ЖК');
            }
        );

        it(
            'should encode non-ascii',
            () => {
                expect(escapeHTML('ΑΒΓΔΕΖ', { escapeNonAscii: true })).to.equal('&#913;&#914;&#915;&#916;&#917;&#918;');
                expect(escapeHTML('ΑΒΓΔΕΖ', { mode: 'extended', escapeNonAscii: true })).to.equal('&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;');
                expect(escapeHTML('ΑΒЖК', { mode: 'extended', escapeNonAscii: true })).to.equal('&Alpha;&Beta;&#1046;&#1050;');
            }
        );
    }
);

