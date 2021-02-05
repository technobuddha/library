import expect from '../util/expect';
import fillTemplate from '../src/fillTemplate';

describe(
    'fillTemplate',
    () => {
        test(
            'should handle templates',
            () => {
                expect(fillTemplate('A sunny {{day}} in {{month}}.', { day: 'Monday', month: 'June' })).toBe('A sunny Monday in June.');
            }
        );

        test(
            'should allow different delimiters',
            () => {
                // eslint-disable-next-line no-template-curly-in-string
                expect(fillTemplate('The ${object} of ${principle}.', { object: 'Statue', principle: 'Liberty' }, { open: '${', close: '}' })).toBe('The Statue of Liberty.');
            }
        );
    }
);
