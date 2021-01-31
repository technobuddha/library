import 'mocha';
import { expect } from 'chai';
import delimited  from '../src/delimited';
import { empty }  from '../src/constants';

describe(
    'delimited',
    () => {
        it(
            'should extract from delimited string',
            () => {
                expect(delimited('a*b*c*d', '*', 0)).to.equal('a');
                expect(delimited('a*b*c*d', '*', 1)).to.equal('b');
                expect(delimited('a*b*c*d', '*', 2)).to.equal('c');
                expect(delimited('a*b*c*d', '*', 3)).to.equal('d');
            }
        );

        it(
            'should handle index <= 0',
            () => {
                expect(delimited('a*b*c*d', '*', -1)).to.equal('d');
                expect(delimited('a*b*c*d', '*', -2)).to.equal('c');
                expect(delimited('a*b*c*d', '*', -3)).to.equal('b');
                expect(delimited('a*b*c*d', '*', -4)).to.equal('a');
            }
        );

        it(
            'should use counts',
            () => {
                expect(delimited('a*b*c*d', '*', 0, 1)).to.equal('a');
                expect(delimited('a*b*c*d', '*', 0, 2)).to.equal('a*b');
                expect(delimited('a*b*c*d', '*', 0, 3)).to.equal('a*b*c');
                expect(delimited('a*b*c*d', '*', 0, 4)).to.equal('a*b*c*d');
            }
        );

        it(
            'should handle counts with index < 0',
            () => {
                expect(delimited('a*b*c*d', '*', -4, 1)).to.equal('a');
                expect(delimited('a*b*c*d', '*', -4, 2)).to.equal('a*b');
                expect(delimited('a*b*c*d', '*', -4, 3)).to.equal('a*b*c');
                expect(delimited('a*b*c*d', '*', -4, 4)).to.equal('a*b*c*d');
            }
        );

        it(
            'should handle index out of bounds',
            () => {
                expect(delimited('a*b*c*d', '*', 4)).to.equal(empty);
                expect(delimited('a*b*c*d', '*', -5)).to.equal(empty);
            }
        );

        it(
            'should handle counts out of range',
            () => {
                expect(delimited('a*b*c*d', '*', 0, 5)).to.equal('a*b*c*d');
                expect(delimited('a*b*c*d', '*', -4, 5)).to.equal('a*b*c*d');
                expect(delimited('a*b*c*d', '*', 0, 0)).to.equal(empty);
                expect(delimited('a*b*c*d', '*', 0, -1)).to.equal(empty);
            }
        );
    }
);
