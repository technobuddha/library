import expect from '../util/expect';
import unquote    from '../src/unquote';

describe(
    'unquote',
    () => {
        it(
            'should quote input',
            () => {
                expect(unquote('"My favorite color is \\"blue.\\""')).toBe('My favorite color is "blue."');
            }
        );

        it(
            'should allow to specify quote',
            () => {
                expect(unquote('\'My favorite color is \\"blue.\\"\'', { quote: '\'' })).toBe('My favorite color is "blue."');
            }
        );

        it(
            'should allow to specify escape',
            () => {
                expect(unquote('"My favorite color is ""blue."""', { escape: '""' })).toBe('My favorite color is "blue."');
            }
        );
    }
);
