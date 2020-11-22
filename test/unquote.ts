import 'mocha';
import { expect } from 'chai';
import unquote    from '../src/unquote';

describe(
    'unquote',
    () => {
        it(
            'should quote input',
            () => {
                expect(unquote('"My favorite color is \\"blue.\\""')).to.equal('My favorite color is "blue."');
            }
        );

        it(
            'should allow to specify quote',
            () => {
                expect(unquote('\'My favorite color is \\"blue.\\"\'', { quote: '\'' })).to.equal('My favorite color is "blue."');
            }
        );

        it(
            'should allow to specify escape',
            () => {
                expect(unquote('"My favorite color is ""blue."""', { escape: '""' })).to.equal('My favorite color is "blue."');
            }
        );
    }
);

