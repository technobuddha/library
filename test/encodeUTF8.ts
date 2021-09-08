import expect from '@util/expect';
import encodeUTF8 from '../src/encodeUTF8';

// cspell:ignore ΑΒΓΔ 𝐀𝐁𝐂
describe(
    'encodeUTF8',
    () => {
        test(
            'should not change ASCII',
            () => {
                expect(encodeUTF8('abcdef')).toBe('abcdef');
                expect(encodeUTF8('\x00\x01\x02\x03\x7F')).toBe('\x00\x01\x02\x03\x7F');
            }
        );

        test(
            'should encode codepoints < 0x8000',
            () => {
                expect(encodeUTF8('¼½¾')).toBe('\xC2\xBC\xC2\xBD\xC2\xBE');
                expect(encodeUTF8('ΑΒΓΔ')).toBe('\xCE\x91\xCE\x92\xCE\x93\xCE\x94');
            }
        );

        test(
            'should use encode non astral codepoints ',
            () => {
                expect(encodeUTF8('♀♂')).toBe('\xE2\x99\x80\xE2\x99\x82');
                expect(encodeUTF8('ꭓꭔꭕ')).toBe('\xEA\xAD\x93\xEA\xAD\x94\xEA\xAD\x95');
            }
        );

        test(
            'should should encode astral codepoints',
            () => {
                expect(encodeUTF8('😀😁😂')).toBe('\xF0\x9F\x98\x80\xF0\x9F\x98\x81\xF0\x9F\x98\x82');
                expect(encodeUTF8('𝐀𝐁𝐂')).toBe('\xF0\x9D\x90\x80\xF0\x9D\x90\x81\xF0\x9D\x90\x82');
            }
        );

        test(
            'should trap bad surrogate pairs',
            () => {
                expect(() => encodeUTF8('\uD83D')).toThrowError();
                expect(() => encodeUTF8('\uD83D\u0000')).toThrowError();
            }
        );
    }
);
