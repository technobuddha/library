import 'mocha';
import { expect } from 'chai';
import encodeUTF8 from '../src/encodeUTF8';

describe(
    'encodeUTF8',
    () => {
        it(
            'should not change ASCII',
            () => {
                expect(encodeUTF8('abcdef')).to.equal('abcdef');
                expect(encodeUTF8('\x00\x01\x02\x03\x7F')).to.equal('\x00\x01\x02\x03\x7F');
            }
        );

        it(
            'should encode codepoints < 0x8000',
            () => {
                expect(encodeUTF8('¼½¾')).to.equal('\xC2\xBC\xC2\xBD\xC2\xBE');
                expect(encodeUTF8('ΑΒΓΔ')).to.equal('\xCE\x91\xCE\x92\xCE\x93\xCE\x94');
            }
        );

        it(
            'should use encode non astral codepoints ',
            () => {
                expect(encodeUTF8('♀♂')).to.equal('\xE2\x99\x80\xE2\x99\x82');
                expect(encodeUTF8('ꭓꭔꭕ')).to.equal('\xEA\xAD\x93\xEA\xAD\x94\xEA\xAD\x95');
            }
        );

        it(
            'should should encode astral codepoints',
            () => {
                expect(encodeUTF8('😀😁😂')).to.equal('\xF0\x9F\x98\x80\xF0\x9F\x98\x81\xF0\x9F\x98\x82');
                expect(encodeUTF8('𝐀𝐁𝐂')).to.equal('\xF0\x9D\x90\x80\xF0\x9D\x90\x81\xF0\x9D\x90\x82');
            }
        );

        it(
            'should trap bad surrogate pairs',
            () => {
                expect(() => encodeUTF8('\uD83D')).to.throw();
                expect(() => encodeUTF8('\uD83D\u0000')).to.throw();
            }
        );
    }
);
