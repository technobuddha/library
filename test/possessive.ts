import 'mocha';
import { expect } from 'chai';
import possessive from '../src/possessive';

//TODO we need more comprehensive testing

describe(
    'possessive',
    () => {
        it(
            'should handle simple possessives',
            () => {
                expect(possessive('Phil')).to.equal("Phil's");
                expect(possessive('Chris')).to.equal("Chris'");
            }
        );
    }
);
