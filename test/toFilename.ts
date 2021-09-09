import expect from '#util/expect';
import toFilename from '../src/toFilename';

describe(
    'toFilename',
    () => {
        test(
            'should bad characters to be replaces',
            () => {
                expect(toFilename('x/x\\x:x*x?x<x>x|x.x-x')).toBe('x-x-x-x-x-x-x-x-x-x-x');
                expect(toFilename('x//y: :z*  ?q')).toBe('x-y-z-q');
            }
        );

        test(
            'should truncate long text',
            () => {
                expect(toFilename('now is the time for all good men to come to the aid of their country.')).toBe('now is the time for all good men to come to the aid of…ir country');
            }
        );

        test(
            'should control the disambiguate',
            () => {
                expect(
                    toFilename('now is the time for all good men to come to the aid of their country.', { disambiguate: 20 })
                ).toBe('now is the time for all good men to come to …aid of their country');
                expect(
                    toFilename('now is the time for all good men to come to the aid of their country.', { maxLength: 15, disambiguate: 20 })
                ).toBe('-…aid of their co');
            }
        );

        test(
            'should control the maxLength',
            () => {
                expect(toFilename('now is the time for all good men to come to the aid of their country.', { maxLength: 20 })).toBe('now is the…ir country');
            }
        );

        test(
            'should control the replacement character',
            () => {
                expect(toFilename('x/x\\x:x*x?x<x>x|x.x_x', {  replacement: '_' })).toBe('x_x_x_x_x_x_x_x_x_x_x');
            }
        );
    }
);
