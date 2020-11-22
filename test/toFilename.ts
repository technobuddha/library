import 'mocha';
import { expect } from 'chai';
import toFilename from '../src/toFilename';


describe(
    'toFilename',
    () => {
        it(
            'should bad characters to be replaces',
            () => {
                expect(toFilename('x/x\\x:x*x?x<x>x|x.x-x')).to.equal('x-x-x-x-x-x-x-x-x-x-x');
                expect(toFilename('x//y: :z*  ?q')).to.equal('x-y-z-q');
            }
        );

        it(
            'should truncate long text',
            () => {
                expect(toFilename('now is the time for all good men to come to the aid of their country.')).to.equal('now is the time for all good men to come to the aid of…ir country');
            }
        );

        it(
            'should control the disambiguate',
            () => {
                expect(toFilename('now is the time for all good men to come to the aid of their country.', { disambiguate: 20 })).to.equal('now is the time for all good men to come to …aid of their country');
            }
        );

        it(
            'should control the maxLength',
            () => {
                expect(toFilename('now is the time for all good men to come to the aid of their country.', { maxLength: 20 })).to.equal('now is the…ir country');
            }
        );

        it(
            'should control the replacement character',
            () => {
                expect(toFilename('x/x\\x:x*x?x<x>x|x.x_x', {  replacement: '_' })).to.equal('x_x_x_x_x_x_x_x_x_x_x');
            }
        );
    }
);

