import 'mocha';
import { expect } from 'chai';
import toBoolean  from '../toBoolean';

describe(
    'toBoolean',
    () => {
        it(
            'should convert basic boolean values',
            () => {
                expect(toBoolean('true')).to.equal(true);
                expect(toBoolean('false')).to.equal(false);
                expect(toBoolean('yes')).to.equal(true);
                expect(toBoolean('no')).to.equal(false);
                expect(toBoolean('y')).to.equal(true);
                expect(toBoolean('n')).to.equal(false);
                expect(toBoolean('on')).to.equal(true);
                expect(toBoolean('off')).to.equal(false);
                expect(toBoolean('1')).to.equal(true);
                expect(toBoolean('0')).to.equal(false);
            }
        );

        it(
            'should ignore case',
            () => {
                expect(toBoolean('True')).to.equal(true);
                expect(toBoolean('False')).to.equal(false);
            }
        );

        it(
            'should allow string values',
            () => {
                expect(toBoolean('Yup', { trueValues: [ 'yup' ] } )).to.equal(true);
                expect(toBoolean('Nope', { falseValues: [ 'nope' ] })).to.equal(false);
            }
        );

        it(
            'should allow allow regular expressions',
            () => {
                expect(toBoolean('Yup', { trueValues: [ /y.*/ ] } )).to.equal(true);
                expect(toBoolean('Nope', { falseValues: [ /n.*/ ] })).to.equal(false);
            }
        );
    }
);

