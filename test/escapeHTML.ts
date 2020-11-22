import 'mocha';
import { expect } from 'chai';
import escapeHTML from '../src/escapeHTML';
import { space }  from '../src/constants';

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
    }
);

