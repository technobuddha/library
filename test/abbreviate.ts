import 'mocha';
import { expect } from 'chai';
import abbreviate from '../abbreviate';

describe(
    'abbreviate',
    () => {
        it(
            'should handle numbers greater than 1',
            () => {
                expect(abbreviate(                        1)).to.equal('1');
                expect(abbreviate(                       10)).to.equal('10');
                expect(abbreviate(                      100)).to.equal('100');
                expect(abbreviate(                     1000)).to.equal('1K');
                expect(abbreviate(                  1000000)).to.equal('1M');
                expect(abbreviate(               1000000000)).to.equal('1G');
                expect(abbreviate(            1000000000000)).to.equal('1T');
                expect(abbreviate(         1000000000000000)).to.equal('1P');
                expect(abbreviate(      1000000000000000000)).to.equal('1E');
                expect(abbreviate(   1000000000000000000000)).to.equal('1Z');
                expect(abbreviate(1000000000000000000000000)).to.equal('1Y');

            }
        );

        it(
            'should handle numbers less than 1',
            () => {
                expect(abbreviate(                         0.1)).to.equal('0.1');
                expect(abbreviate(                        0.01)).to.equal('0.01');
                expect(abbreviate(                       0.001)).to.equal('1m');
                expect(abbreviate(                    0.000001)).to.equal('1µ');
                expect(abbreviate(                 0.000000001)).to.equal('1n');
                expect(abbreviate(              0.000000000001)).to.equal('1p');
                expect(abbreviate(           0.000000000000001)).to.equal('1f');
                expect(abbreviate(        0.000000000000000001)).to.equal('1a');
                expect(abbreviate(     0.000000000000000000001)).to.equal('1z');
                expect(abbreviate(  0.000000000000000000000001)).to.equal('1y');

            }
        );

        it(
            'should handle fractional numbers',
            () => {
                expect(abbreviate(1000000)).to.equal('1M');
                expect(abbreviate(1200000)).to.equal('1.2M');
                expect(abbreviate(1230000)).to.equal('1.23M');
                expect(abbreviate(1234000)).to.equal('1.23M');
                expect(abbreviate(1235000)).to.equal('1.24M');
            }
        );

        it(
            'should handle precision',
            () =>
            {
                expect(abbreviate(1000000, { precision: 3 })).to.equal('1M');
                expect(abbreviate(1200000, { precision: 3 })).to.equal('1.2M');
                expect(abbreviate(1230000, { precision: 3 })).to.equal('1.23M');
                expect(abbreviate(1234000, { precision: 3 })).to.equal('1.234M');
                expect(abbreviate(1234500, { precision: 3 })).to.equal('1.235M');
            }
        );

        it(
            'should handle macro',
            () => {
                expect(abbreviate(                        1, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1');
                expect(abbreviate(                       10, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('10');
                expect(abbreviate(                      100, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('100');
                expect(abbreviate(                     1000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1A');
                expect(abbreviate(                  1000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1B');
                expect(abbreviate(               1000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1C');
                expect(abbreviate(            1000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1D');
                expect(abbreviate(         1000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1E');
                expect(abbreviate(      1000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1F');
                expect(abbreviate(   1000000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1G');
                expect(abbreviate(1000000000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1H');
            }
        );

        it(
            'should handle micro',
            () => {
                expect(abbreviate(                         0.1, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('0.1');
                expect(abbreviate(                        0.01, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('0.01');
                expect(abbreviate(                       0.001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1A');
                expect(abbreviate(                    0.000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1B');
                expect(abbreviate(                 0.000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1C');
                expect(abbreviate(              0.000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1D');
                expect(abbreviate(           0.000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1E');
                expect(abbreviate(        0.000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1F');
                expect(abbreviate(     0.000000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1G');
                expect(abbreviate(  0.000000000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1H');

            }
        );

        it(
            'should handle unit',
            () => {
                expect(abbreviate(                          2, { unit: 2000 })).to.equal('2');
                expect(abbreviate(                         20, { unit: 2000 })).to.equal('20');
                expect(abbreviate(                        200, { unit: 2000 })).to.equal('200');
                expect(abbreviate(                       2000, { unit: 2000 })).to.equal('1K');
                expect(abbreviate(                    4000000, { unit: 2000 })).to.equal('1M');
                expect(abbreviate(                 8000000000, { unit: 2000 })).to.equal('1G');
                expect(abbreviate(             16000000000000, { unit: 2000 })).to.equal('1T');
                expect(abbreviate(          32000000000000000, { unit: 2000 })).to.equal('1P');
                expect(abbreviate(       64000000000000000000, { unit: 2000 })).to.equal('1E');
                expect(abbreviate(   128000000000000000000000, { unit: 2000 })).to.equal('1Z');
                expect(abbreviate(256000000000000000000000000, { unit: 2000 })).to.equal('1Y');
            }
        );

        //TODO format
    }
);

