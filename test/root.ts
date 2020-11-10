import 'mocha';
import { expect } from 'chai';
import root       from '../root';

describe(
    'root',
    () => {
        it(
            'should extract root word',
            () => {
                expect(root('abc')).to.equal('abc');
                expect(root('pre-abc', { prefix: 'pre-' })).to.equal('abc');
                expect(root('abc-post', { suffix: '-post' })).to.equal('abc');
                expect(root('pre-abc-post', { prefix: 'pre-', suffix: '-post' })).to.equal('abc');
            }
        );
    }
);

