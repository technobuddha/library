import 'mocha';
import { expect } from 'chai';
import build      from '../src/build';

describe(
    'build',
    () => {
        it(
            'should build strings',
            () => {
                expect(build()).to.equal('');
                expect(build('a')).to.equal('a');
                expect(build('a', 'b', 'c')).to.equal('abc');
                expect(build([ 'a', 'b', 'c' ])).to.equal('abc');
                expect(build(() => 'a')).to.equal('a');
                expect(build('a', [ 'b', 'c' ], 'd')).to.equal('abcd');
                expect(build(() => 'a', () => [ 'b', 'c' ], [ 'd', 'e' ], 'f')).to.equal('abcdef');
            }
        );
    }
);
