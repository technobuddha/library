import expect from '../util/expect';
import escapeHTML from '../src/escapeHTML';
import { space }  from '../src/constants';

describe(
    'escapeHTML',
    () => {
        it(
            'should escape basic characters',
            () => {
                expect(escapeHTML('"&\'<>')).toBe('&quot;&amp;&apos;&lt;&gt;');
            }
        );

        it(
            'should escape control characters',
            () => {
                expect(escapeHTML('\0')).toBe('&#0;');
                expect(escapeHTML('\x01')).toBe('&#1;');
                expect(escapeHTML('\x7f')).toBe('&#127;');
                expect(escapeHTML('\x9f')).toBe('&#159;');
            }
        );

        it(
            'should not escape most ascii',
            () => {
                expect(escapeHTML(space)).toBe(space);
                expect(escapeHTML('ABCdef[~]')).toBe('ABCdef[~]');
            }
        );
    }
);
