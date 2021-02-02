import expect from '../util/expect';
import quote      from '../src/quote';

describe(
    'quote',
    () => {
        it(
            'should quote input',
            () => {
                expect(quote('My favorite color is "blue."')).toBe('"My favorite color is \\"blue.\\""');
            }
        );

        it(
            'should allow to specify quote',
            () => {
                expect(quote('My favorite color is "blue."', { quote: '\'' })).toBe('\'My favorite color is \\"blue.\\"\'');
            }
        );

        it(
            'should allow to specify escape',
            () => {
                expect(quote('My favorite color is "blue."', { escape: '""' })).toBe('"My favorite color is ""blue."""');
            }
        );
    }
);
