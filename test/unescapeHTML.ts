import expect from '@util/expect';
import unescapeHTML from '../src/unescapeHTML';
import { space }    from '../src/constants';

// cspell:ignore ΑΒΓΔΕΖ ΑΒЖК
describe(
    'unescapeHTML',
    () => {
        test(
            'should unescape basic characters',
            () => {
                expect(unescapeHTML('&quot;&amp;&apos;&lt;&gt;')).toBe('"&\'<>');
            }
        );

        test(
            'should unescape control characters',
            () => {
                expect(unescapeHTML('&#0;')).toBe('\0');
                expect(unescapeHTML('&#1;')).toBe('\x01');
                expect(unescapeHTML('&#127;')).toBe('\x7f');
                expect(unescapeHTML('&#159;')).toBe('\x9f');
            }
        );

        test(
            'should unescape hex control characters',
            () => {
                expect(unescapeHTML('&#x0;')).toBe('\0');
                expect(unescapeHTML('&#x1;')).toBe('\x01');
                expect(unescapeHTML('&#x7F;')).toBe('\x7f');
                expect(unescapeHTML('&#x9f;')).toBe('\x9f');
            }
        );

        test(
            'should not unescape most ascii',
            () => {
                expect(unescapeHTML(space)).toBe(space);
                expect(unescapeHTML('ABCdef[~]')).toBe('ABCdef[~]');
            }
        );

        test(
            'should extended entities',
            () => {
                expect(unescapeHTML('ΑΒΓΔΕΖ')).toBe('ΑΒΓΔΕΖ');
                expect(unescapeHTML('&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;')).toBe('ΑΒΓΔΕΖ');
                expect(unescapeHTML('&Alpha;&Beta;ЖК')).toBe('ΑΒЖК');
            }
        );

        test(
            'should leave unknown entities',
            () => {
                expect(unescapeHTML('&unknown;')).toBe('&unknown;');
            }
        );
    }
);
