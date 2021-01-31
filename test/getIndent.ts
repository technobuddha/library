import 'mocha';
import { expect } from 'chai';
import getIndent  from '../src/getIndent';

describe(
    'getIndent',
    () => {
        it(
            'should getIndent lines',
            () => {
                expect(getIndent('It was the best of times.\nIt was the worst of times.')).to.equal(0);
                expect(getIndent(' It was the best of times.\n It was the worst of times.')).to.equal(1);
                expect(getIndent(' It was the best of times.\n  It was the worst of times.')).to.equal(1);
            }
        );

        it(
            'should allow to specify indenter',
            () => {
                expect(getIndent('It was the best of times.\nIt was the worst of times.', { indenter: '* ' })).to.equal(0);
                expect(getIndent('* It was the best of times.\n* It was the worst of times.', { indenter: '* ' })).to.equal(1);
                expect(getIndent('* It was the best of times.\n* * It was the worst of times.', { indenter: '* ' })).to.equal(1);
            }
        );
    }
);
