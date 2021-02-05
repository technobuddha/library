import expect from '../util/expect';
import decodeUTF8 from '../src/decodeUTF8';

describe(
    'decodeUTF8',
    () => {
        test(
            'should not change ASCII',
            () => {
                expect(decodeUTF8('abcdef')).toBe('abcdef');
                expect(decodeUTF8('\x00\x01\x02\x03\x7F')).toBe('\x00\x01\x02\x03\x7F');
            }
        );

        test(
            'should decode codepoints < 0x8000',
            () => {
                expect(decodeUTF8('\xC2\xBC\xC2\xBD\xC2\xBE')).toBe('¼½¾');
                expect(decodeUTF8('\xCE\x91\xCE\x92\xCE\x93\xCE\x94')).toBe('ΑΒΓΔ');
            }
        );

        test(
            'should use decode non astral codepoints ',
            () => {
                expect(decodeUTF8('\xE2\x99\x80\xE2\x99\x82')).toBe('♀♂');
                expect(decodeUTF8('\xEA\xAD\x93\xEA\xAD\x94\xEA\xAD\x95')).toBe('ꭓꭔꭕ');
            }
        );

        test(
            'should should decode astral codepoints',
            () => {
                expect(decodeUTF8('\xF0\x9F\x98\x80\xF0\x9F\x98\x81\xF0\x9F\x98\x82')).toBe('😀😁😂');
                expect(decodeUTF8('\xF0\x9D\x90\x80\xF0\x9D\x90\x81\xF0\x9D\x90\x82')).toBe('𝐀𝐁𝐂');
            }
        );

        test(
            'should trap bad surrogate pairs',
            () => {
                expect(() => decodeUTF8('\xC0')).toThrowError();
                expect(() => decodeUTF8('\xC0\x00')).toThrowError();
                expect(() => decodeUTF8('\xE0')).toThrowError();
                expect(() => decodeUTF8('\xE0\x80')).toThrowError();
                expect(() => decodeUTF8('\xE0\x00')).toThrowError();
                expect(() => decodeUTF8('\xE0\x80\x00')).toThrowError();
                expect(() => decodeUTF8('\xF0')).toThrowError();
                expect(() => decodeUTF8('\xF0\x80')).toThrowError();
                expect(() => decodeUTF8('\xF0\x00')).toThrowError();
                expect(() => decodeUTF8('\xF0\x80\x80')).toThrowError();
                expect(() => decodeUTF8('\xF0\x00\x80')).toThrowError();
                expect(() => decodeUTF8('\xF0\x80\x80\x00')).toThrowError();
                expect(() => decodeUTF8('\xF4\xBF\xBF\xBF')).toThrowError();
            }
        );
    }
);
