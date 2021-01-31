import 'mocha';
import { expect }   from 'chai';
import fillTemplate from '../src/fillTemplate';

describe(
    'fillTemplate',
    () => {
        it(
            'should handle templates',
            () => {
                expect(fillTemplate('A sunny {{day}} in {{month}}.', { day: 'Monday', month: 'June' }))
                .to.equal('A sunny Monday in June.');
            }
        );

        it(
            'should allow different delimiters',
            () => {
                // eslint-disable-next-line no-template-curly-in-string
                expect(fillTemplate('The ${object} of ${principle}.', { object: 'Statue', principle: 'Liberty' }, { open: '${', close: '}' }))
                .to.equal('The Statue of Liberty.');
            }
        );
    }
);
