import 'mocha';
import { expect }  from 'chai';
import isSurrogate from '../src/isSurrogate';

describe(
    'isSurrogate',
    () => {
        it(
            'should detect surrogates',
            () => {
                expect(isSurrogate('a')).to.equal(false);
                expect(isSurrogate('\uD800')).to.equal(true);
                expect(isSurrogate('\uDC00')).to.equal(true);
            }
        );

        it(
            'should detect high and low',
            () => {
                expect(isSurrogate('\uD800', { high: false })).to.equal(false);
                expect(isSurrogate('\uDC00', { high: false })).to.equal(true);
                expect(isSurrogate('\uD800', { low: false })).to.equal(true);
                expect(isSurrogate('\uDC00', { low: false })).to.equal(false);
            }
        );
    }
);
