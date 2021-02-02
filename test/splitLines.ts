import expect from '../util/expect';
import splitLines from '../src/splitLines';
import { empty }  from '../src/constants';

describe(
    'splitLines',
    () => {
        it(
            'should not split strings',
            () => {
                expect(splitLines('abcdefghi')).toEqual([ 'abcdefghi' ]);
                expect(splitLines(empty)).toEqual([]);
            }
        );

        it(
            'should handle windows end of line',
            () => {
                expect(splitLines('a\r\nb\r\nc\r\nd')).toEqual([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should handle unix end of line',
            () => {
                expect(splitLines('a\nb\nc\nd')).toEqual([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should handle null end of line',
            () => {
                expect(splitLines('a\0b\0c\0d')).toEqual([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should handle LFCR end of line',
            () => {
                expect(splitLines('a\n\rb\n\rc\n\rd')).toEqual([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should handle Mixed end of line',
            () => {
                expect(splitLines('a\r\nb\n\rc\nd\re\0f')).toEqual([ 'a', 'b', 'c', 'd', 'e', 'f' ]);
            }
        );
    }
);
