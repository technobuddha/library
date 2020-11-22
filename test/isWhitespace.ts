import 'mocha';
import { expect }       from 'chai';
import isWhitespace     from '../src/isWhitespace';
import { empty, space } from '../src/constants';

describe(
    'isWhitespace',
    () => {
        it(
            'should handle empty strings',
            () => {
                expect(isWhitespace(empty)).to.equal(false);
            }
        );

        it(
            'should handle whitespace characters',
            () => {
                expect(isWhitespace(space)).to.equal(true);
                expect(isWhitespace('\t')).to.equal(true);
                expect(isWhitespace('\r')).to.equal(true);
                expect(isWhitespace('\n')).to.equal(true);
                expect(isWhitespace('\v')).to.equal(true);
                expect(isWhitespace('\f')).to.equal(true);
                expect(isWhitespace('\u00A0')).to.equal(true);
                expect(isWhitespace('\u1680')).to.equal(true);
                expect(isWhitespace('\u2000')).to.equal(true);
                expect(isWhitespace('\u2001')).to.equal(true);
                expect(isWhitespace('\u2002')).to.equal(true);
                expect(isWhitespace('\u2003')).to.equal(true);
                expect(isWhitespace('\u2004')).to.equal(true);
                expect(isWhitespace('\u2005')).to.equal(true);
                expect(isWhitespace('\u2006')).to.equal(true);
                expect(isWhitespace('\u2007')).to.equal(true);
                expect(isWhitespace('\u2008')).to.equal(true);
                expect(isWhitespace('\u2009')).to.equal(true);
                expect(isWhitespace('\u200a')).to.equal(true);
                expect(isWhitespace('\u2028')).to.equal(true);
                expect(isWhitespace('\u2029')).to.equal(true);
                expect(isWhitespace('\u202f')).to.equal(true);
                expect(isWhitespace('\u205f')).to.equal(true);
                expect(isWhitespace('\u3000')).to.equal(true);
                expect(isWhitespace('\ufeff')).to.equal(true);
            }
        );

        it(
            'should handle whitespace strings',
            () => {
                expect(isWhitespace(' \t\r\n\v\f ')).to.equal(true);
            }
        );

        it(
            'should reject other strings',
            () => {
                expect(isWhitespace('    a    ')).to.equal(false);
            }
        );
    }
);

