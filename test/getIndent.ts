import expect from '../util/expect';
import getIndent  from '../src/getIndent';

describe(
    'getIndent',
    () => {
        test(
            'should getIndent lines',
            () => {
                expect(getIndent('It was the best of times.\nIt was the worst of times.')).toBe(0);
                expect(getIndent(' It was the best of times.\n It was the worst of times.')).toBe(1);
                expect(getIndent(' It was the best of times.\n  It was the worst of times.')).toBe(1);
            }
        );

        test(
            'should allow to specify indenter',
            () => {
                expect(getIndent('It was the best of times.\nIt was the worst of times.', { indenter: '* ' })).toBe(0);
                expect(getIndent('* It was the best of times.\n* It was the worst of times.', { indenter: '* ' })).toBe(1);
                expect(getIndent('* It was the best of times.\n* * It was the worst of times.', { indenter: '* ' })).toBe(1);
            }
        );
    }
);
