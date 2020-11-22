import 'mocha';
import { expect }       from 'chai';
import toPrimitive      from '../src/toPrimitive';
import { empty, space } from '../src/constants';


describe(
    'toPrimitive',
    () => {
        it(
            'should convert strings',
            () => {
                expect(toPrimitive(empty)).to.equal(empty);
                expect(toPrimitive(space)).to.equal(space);
                expect(toPrimitive("jabberwocky")).to.equal("jabberwocky");
                expect(toPrimitive("0")).to.equal('0');
            }
        );

        it(
            'should handle numbers',
            () => {
                expect(toPrimitive(0)).to.equal(0);
                expect(toPrimitive(-0)).to.equal(-0);
                expect(toPrimitive(1)).to.equal(1);
                expect(toPrimitive(Infinity)).to.equal(Infinity);
                expect(toPrimitive(-Infinity)).to.equal(-Infinity);
                expect(toPrimitive(NaN)).to.be.NaN;
            }
        );

        it(
            'should handle booleans',
            () => {
                expect(toPrimitive(true)).to.equal(true);
                expect(toPrimitive(false)).to.equal(false);
            }
        );

        it(
            'should handle null and undefined',
            () => {
                expect(toPrimitive(null)).to.equal(null);
                expect(toPrimitive(undefined)).to.equal(undefined);
            }
        );

        it(
            'should handle symbols',
            () => {
                expect(toPrimitive(Symbol.toPrimitive)).to.equal(Symbol.toPrimitive);
            }
        );

        it(
            'should handle objects and arrays',
            () => {
                expect(toPrimitive([])).to.deep.equal([]);
                expect(toPrimitive([1,2,3])).to.deep.equal([1,2,3]);
                expect(toPrimitive({})).to.deep.equal({});
            }
        );

        it(
            'should handle hint of string',
            () => {
                expect(toPrimitive(undefined,          'string')).to.equal(undefined);
                expect(toPrimitive(null,               'string')).to.equal(null);
                expect(toPrimitive('123',              'string')).to.equal('123');
                expect(toPrimitive(123,                'string')).to.equal('123');
                expect(toPrimitive(false,              'string')).to.equal('false');
                expect(toPrimitive(Symbol.toPrimitive, 'string')).to.equal(Symbol.toPrimitive);
                expect(toPrimitive([1,2,3],            'string')).to.equal('1,2,3');
            }
        );

        it(
            'should handle hint of number',
            () => {
                expect(toPrimitive(undefined,          'number')).to.equal(undefined);
                expect(toPrimitive(null,               'number')).to.equal(null);
                expect(toPrimitive('123',              'number')).to.equal('123');
                expect(toPrimitive(123,                'number')).to.equal(123);
                expect(toPrimitive(false,              'number')).to.equal(false);
                expect(toPrimitive(Symbol.toPrimitive, 'number')).to.equal(Symbol.toPrimitive);
                expect(toPrimitive([1,2,3],            'number')).to.deep.equal([1,2,3]);
            }
        );

        it(
            'should handle hint of default',
            () => {
                expect(toPrimitive(undefined,          'default')).to.equal(undefined);
                expect(toPrimitive(null,               'default')).to.equal(null);
                expect(toPrimitive('123',              'default')).to.equal('123');
                expect(toPrimitive(123,                'default')).to.equal(123);
                expect(toPrimitive(false,              'default')).to.equal(false);
                expect(toPrimitive(Symbol.toPrimitive, 'default')).to.equal(Symbol.toPrimitive);
                expect(toPrimitive([1,2,3],            'default')).to.deep.equal([1,2,3]);
            }
        );
    }
);

