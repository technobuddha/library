import 'mocha';
import { expect } from 'chai';
import splitLines from '../src/splitLines';
import { empty }  from '../src/constants';


describe(
    'splitLines',
    () => {
        it(
            'should not split strings',
            () => {
                expect(splitLines('abcdefghi')).to.deep.equal([ 'abcdefghi' ]);
                expect(splitLines(empty)).to.deep.equal([]);
            }
        );

        it(
            'should handle windows end of line',
            () => {
                expect(splitLines('a\r\nb\r\nc\r\nd')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should handle unix end of line',
            () => {
                expect(splitLines('a\nb\nc\nd')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should handle null end of line',
            () => {
                expect(splitLines('a\0b\0c\0d')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should handle LFCR end of line',
            () => {
                expect(splitLines('a\n\rb\n\rc\n\rd')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should handle Mixed end of line',
            () => {
                expect(splitLines('a\r\nb\n\rc\nd\re\0f')).to.deep.equal([ 'a', 'b', 'c', 'd', 'e', 'f' ]);
            }
        );
    }
);

