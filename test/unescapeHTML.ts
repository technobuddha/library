import 'mocha';
import { expect }   from 'chai';
import unescapeHTML from '../src/unescapeHTML';
import { space }    from '../src/constants';

describe(
    'unescapeHTML',
    () => {
        it(
            'should unescape basic characters',
            () => {
                expect(unescapeHTML('&quot;&amp;&apos;&lt;&gt;')).to.equal('"&\'<>');
            }
        );

        it(
            'should unescape control characters',
            () => {
                expect(unescapeHTML('&#0;')).to.equal('\0');
                expect(unescapeHTML('&#1;')).to.equal('\x01');
                expect(unescapeHTML('&#127;')).to.equal('\x7f');
                expect(unescapeHTML('&#159;')).to.equal('\x9f');
            }
        );

        it(
            'should unescape hex control characters',
            () => {
                expect(unescapeHTML('&#x0;')).to.equal('\0');
                expect(unescapeHTML('&#x1;')).to.equal('\x01');
                expect(unescapeHTML('&#x7F;')).to.equal('\x7f');
                expect(unescapeHTML('&#x9f;')).to.equal('\x9f');
            }
        );

        it(
            'should not unescape most ascii',
            () => {
                expect(unescapeHTML(space)).to.equal(space);
                expect(unescapeHTML('ABCdef[~]')).to.equal('ABCdef[~]');
            }
        );

        it(
            'should extended entities',
            () => {
                expect(unescapeHTML('ΑΒΓΔΕΖ')).to.equal('ΑΒΓΔΕΖ');
                expect(unescapeHTML('&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;')).to.equal('ΑΒΓΔΕΖ');
                expect(unescapeHTML('&Alpha;&Beta;ЖК')).to.equal('ΑΒЖК');
            }
        );
    }
);

