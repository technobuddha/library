import 'mocha';
import { expect } from 'chai';
import unindent   from '../src/unindent';

describe(
    'unindent',
    () => {
        it(
            'should unindent lines',
            () => {
                expect(unindent('It was the best of times.\nIt was the worst of times.')).to.equal('It was the best of times.\nIt was the worst of times.');
                expect(unindent(' It was the best of times.\n It was the worst of times.')).to.equal('It was the best of times.\nIt was the worst of times.');
                expect(unindent(' It was the best of times.\n  It was the worst of times.')).to.equal('It was the best of times.\n It was the worst of times.');
            }
        );

        it(
            'should allow to specify indenter',
            () => {
                expect(unindent('It was the best of times.\nIt was the worst of times.', { indenter: '* ' })).to.equal('It was the best of times.\nIt was the worst of times.');
                expect(unindent('* It was the best of times.\n* It was the worst of times.', { indenter: '* ' })).to.equal('It was the best of times.\nIt was the worst of times.');
                expect(unindent('* It was the best of times.\n* * It was the worst of times.', { indenter: '* ' })).to.equal('It was the best of times.\n* It was the worst of times.');
            }
        );
    }
);

