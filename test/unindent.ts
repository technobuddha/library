import expect from '#util/expect';
import unindent   from '../src/unindent';

describe(
    'unindent',
    () => {
        test(
            'should unindent lines',
            () => {
                expect(unindent('It was the best of times.\nIt was the worst of times.')).toBe('It was the best of times.\nIt was the worst of times.');
                expect(unindent(' It was the best of times.\n It was the worst of times.')).toBe('It was the best of times.\nIt was the worst of times.');
                expect(unindent(' It was the best of times.\n  It was the worst of times.')).toBe('It was the best of times.\n It was the worst of times.');
            }
        );

        test(
            'should allow to specify indenter',
            () => {
                expect(unindent('It was the best of times.\nIt was the worst of times.', { indenter: '* ' })).toBe('It was the best of times.\nIt was the worst of times.');
                expect(unindent('* It was the best of times.\n* It was the worst of times.', { indenter: '* ' })).toBe('It was the best of times.\nIt was the worst of times.');
                expect(unindent('* It was the best of times.\n* * It was the worst of times.', { indenter: '* ' })).toBe('It was the best of times.\n* It was the worst of times.');
            }
        );
    }
);
