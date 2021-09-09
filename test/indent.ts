import expect from '#util/expect';
import indent     from '../src/indent';

describe(
    'indent',
    () => {
        test(
            'should indent lines',
            () => {
                expect(indent('It was the best of times.\nIt was the worst of times.')).toBe(' It was the best of times.\n It was the worst of times.');
            }
        );

        test(
            'should allow to specify indenter',
            () => {
                expect(indent('It was the best of times.\nIt was the worst of times.', { indenter: '* ' })).toBe('* It was the best of times.\n* It was the worst of times.');
            }
        );
    }
);
