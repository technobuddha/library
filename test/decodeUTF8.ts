import 'mocha';
import { expect } from 'chai';
import decodeUTF8 from '../decodeUTF8';

describe(
    'decodeUTF8',
    () => {
        it(
            'should not change ASCII',
            () => {
                expect(decodeUTF8('abcdef')).to.equal('abcdef');
                expect(decodeUTF8('\x00\x01\x02\x03\x7F')).to.equal('\x00\x01\x02\x03\x7F');
            }
        );

        it(
            'should decode codepoints < 0x8000',
            () => {
                expect(decodeUTF8('\xC2\xBC\xC2\xBD\xC2\xBE')).to.equal('¼½¾');
                expect(decodeUTF8('\xCE\x91\xCE\x92\xCE\x93\xCE\x94')).to.equal('ΑΒΓΔ');
            }
        );

        it(
            'should use decode non astral codepoints ',
            () => {
                expect(decodeUTF8('\xE2\x99\x80\xE2\x99\x82')).to.equal('♀♂');
                expect(decodeUTF8('\xEA\xAD\x93\xEA\xAD\x94\xEA\xAD\x95')).to.equal('ꭓꭔꭕ');
            }
        );

        it(
            'should should decode astral codepoints',
            () => {
                expect(decodeUTF8('\xF0\x9F\x98\x80\xF0\x9F\x98\x81\xF0\x9F\x98\x82')).to.equal('😀😁😂');
                expect(decodeUTF8('\xF0\x9D\x90\x80\xF0\x9D\x90\x81\xF0\x9D\x90\x82')).to.equal('𝐀𝐁𝐂');
            }
        );

        it(
            'should trap bad surrogate pairs',
            () => {
                expect(() => decodeUTF8('\xC0')).to.throw();
                expect(() => decodeUTF8('\xC0\x00')).to.throw();
                expect(() => decodeUTF8('\xE0')).to.throw();
                expect(() => decodeUTF8('\xE0\x80')).to.throw();
                expect(() => decodeUTF8('\xE0\x00')).to.throw();
                expect(() => decodeUTF8('\xE0\x80\x00')).to.throw();
                expect(() => decodeUTF8('\xF0')).to.throw();
                expect(() => decodeUTF8('\xF0\x80')).to.throw();
                expect(() => decodeUTF8('\xF0\x00')).to.throw();
                expect(() => decodeUTF8('\xF0\x80\x80')).to.throw();
                expect(() => decodeUTF8('\xF0\x00\x80')).to.throw();
                expect(() => decodeUTF8('\xF0\x80\x80\x00')).to.throw();
                expect(() => decodeUTF8('\xF4\xBF\xBF\xBF')).to.throw();
            }
        );
    }
);

