import 'mocha';
import { expect } from 'chai';
import quote      from '../src/quote';

describe(
    'quote',
    () => {
        it(
            'should quote input',
            () => {
                expect(quote('My favorite color is "blue."')).to.equal('"My favorite color is \\"blue.\\""');
            }
        );

        it(
            'should allow to specify quote',
            () => {
                expect(quote('My favorite color is "blue."', { quote: '\'' })).to.equal('\'My favorite color is \\"blue.\\"\'');
            }
        );

        it(
            'should allow to specify escape',
            () => {
                expect(quote('My favorite color is "blue."', { escape: '""' })).to.equal('"My favorite color is ""blue."""');
            }
        );
    }
);
