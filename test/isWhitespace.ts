import expect from '../util/expect';
import isWhitespace     from '../src/isWhitespace';
import { empty, space } from '../src/constants';

describe(
    'isWhitespace',
    () => {
        it(
            'should handle empty strings',
            () => {
                expect(isWhitespace(empty)).toBe(false);
            }
        );

        it(
            'should handle whitespace characters',
            () => {
                expect(isWhitespace(space)).toBe(true);
                expect(isWhitespace('\t')).toBe(true);
                expect(isWhitespace('\r')).toBe(true);
                expect(isWhitespace('\n')).toBe(true);
                expect(isWhitespace('\v')).toBe(true);
                expect(isWhitespace('\f')).toBe(true);
                expect(isWhitespace('\u00A0')).toBe(true);
                expect(isWhitespace('\u1680')).toBe(true);
                expect(isWhitespace('\u2000')).toBe(true);
                expect(isWhitespace('\u2001')).toBe(true);
                expect(isWhitespace('\u2002')).toBe(true);
                expect(isWhitespace('\u2003')).toBe(true);
                expect(isWhitespace('\u2004')).toBe(true);
                expect(isWhitespace('\u2005')).toBe(true);
                expect(isWhitespace('\u2006')).toBe(true);
                expect(isWhitespace('\u2007')).toBe(true);
                expect(isWhitespace('\u2008')).toBe(true);
                expect(isWhitespace('\u2009')).toBe(true);
                expect(isWhitespace('\u200a')).toBe(true);
                expect(isWhitespace('\u2028')).toBe(true);
                expect(isWhitespace('\u2029')).toBe(true);
                expect(isWhitespace('\u202f')).toBe(true);
                expect(isWhitespace('\u205f')).toBe(true);
                expect(isWhitespace('\u3000')).toBe(true);
                expect(isWhitespace('\ufeff')).toBe(true);
            }
        );

        it(
            'should handle whitespace strings',
            () => {
                expect(isWhitespace(' \t\r\n\v\f ')).toBe(true);
            }
        );

        it(
            'should reject other strings',
            () => {
                expect(isWhitespace('    a    ')).toBe(false);
            }
        );
    }
);
