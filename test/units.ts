import 'mocha';
import { expect } from 'chai';
import {metricUnits, binaryUnits} from '../units';

describe(
    'metricUnits',
    () => {
        it(
            'should handle numbers greater than 1',
            () => {
                expect(metricUnits(                        1)).to.equal('1');
                expect(metricUnits(                       10)).to.equal('10');
                expect(metricUnits(                      100)).to.equal('100');
                expect(metricUnits(                     1000)).to.equal('1K');
                expect(metricUnits(                  1000000)).to.equal('1M');
                expect(metricUnits(               1000000000)).to.equal('1G');
                expect(metricUnits(            1000000000000)).to.equal('1T');
                expect(metricUnits(         1000000000000000)).to.equal('1P');
                expect(metricUnits(      1000000000000000000)).to.equal('1E');
                expect(metricUnits(   1000000000000000000000)).to.equal('1Z');
                expect(metricUnits(1000000000000000000000000)).to.equal('1Y');

            }
        );

        it(
            'should handle numbers less than 1',
            () => {
                expect(metricUnits(                         0.1)).to.equal('0.1');
                expect(metricUnits(                        0.01)).to.equal('0.01');
                expect(metricUnits(                       0.001)).to.equal('1m');
                expect(metricUnits(                    0.000001)).to.equal('1µ');
                expect(metricUnits(                 0.000000001)).to.equal('1n');
                expect(metricUnits(              0.000000000001)).to.equal('1p');
                expect(metricUnits(           0.000000000000001)).to.equal('1f');
                expect(metricUnits(        0.000000000000000001)).to.equal('1a');
                expect(metricUnits(     0.000000000000000000001)).to.equal('1z');
                expect(metricUnits(  0.000000000000000000000001)).to.equal('1y');

            }
        );

        it(
            'should handle fractional numbers',
            () => {
                expect(metricUnits(1000000)).to.equal('1M');
                expect(metricUnits(1200000)).to.equal('1.2M');
                expect(metricUnits(1230000)).to.equal('1.23M');
                expect(metricUnits(1234000)).to.equal('1.23M');
                expect(metricUnits(1235000)).to.equal('1.24M');
            }
        );

        it(
            'should handle precision',
            () =>
            {
                expect(metricUnits(1000000, { precision: 3 })).to.equal('1M');
                expect(metricUnits(1200000, { precision: 3 })).to.equal('1.2M');
                expect(metricUnits(1230000, { precision: 3 })).to.equal('1.23M');
                expect(metricUnits(1234000, { precision: 3 })).to.equal('1.234M');
                expect(metricUnits(1234500, { precision: 3 })).to.equal('1.235M');
            }
        );

        it(
            'should handle macro',
            () => {
                expect(metricUnits(                        1, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1');
                expect(metricUnits(                       10, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('10');
                expect(metricUnits(                      100, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('100');
                expect(metricUnits(                     1000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1A');
                expect(metricUnits(                  1000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1B');
                expect(metricUnits(               1000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1C');
                expect(metricUnits(            1000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1D');
                expect(metricUnits(         1000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1E');
                expect(metricUnits(      1000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1F');
                expect(metricUnits(   1000000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1G');
                expect(metricUnits(1000000000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1H');
            }
        );

        it(
            'should handle micro',
            () => {
                expect(metricUnits(                         0.1, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('0.1');
                expect(metricUnits(                        0.01, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('0.01');
                expect(metricUnits(                       0.001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1A');
                expect(metricUnits(                    0.000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1B');
                expect(metricUnits(                 0.000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1C');
                expect(metricUnits(              0.000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1D');
                expect(metricUnits(           0.000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1E');
                expect(metricUnits(        0.000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1F');
                expect(metricUnits(     0.000000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1G');
                expect(metricUnits(  0.000000000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ] })).to.equal('1H');

            }
        );

        it(
            'should handle unit',
            () => {
                expect(metricUnits(                          2, { unit: 2000 })).to.equal('2');
                expect(metricUnits(                         20, { unit: 2000 })).to.equal('20');
                expect(metricUnits(                        200, { unit: 2000 })).to.equal('200');
                expect(metricUnits(                       2000, { unit: 2000 })).to.equal('1K');
                expect(metricUnits(                    4000000, { unit: 2000 })).to.equal('1M');
                expect(metricUnits(                 8000000000, { unit: 2000 })).to.equal('1G');
                expect(metricUnits(             16000000000000, { unit: 2000 })).to.equal('1T');
                expect(metricUnits(          32000000000000000, { unit: 2000 })).to.equal('1P');
                expect(metricUnits(       64000000000000000000, { unit: 2000 })).to.equal('1E');
                expect(metricUnits(   128000000000000000000000, { unit: 2000 })).to.equal('1Z');
                expect(metricUnits(256000000000000000000000000, { unit: 2000 })).to.equal('1Y');
            }
        );

        it(
            'should respect format',
            () => {
                expect(metricUnits( 1, {format: '000'})).to.equal('001');
                expect(metricUnits(10, {format: '000'})).to.equal('010');
            }
        )
    }
);

describe(
    'binaryUnits',
    () => {
        it(
            'should handle whole numbers than 1',
            () => {
                expect(binaryUnits(                        1)).to.equal('1B');
                expect(binaryUnits(                       10)).to.equal('10B');
                expect(binaryUnits(                      100)).to.equal('100B');
                expect(binaryUnits(                     1000)).to.equal('1000B');
                expect(binaryUnits(                     1024)).to.equal('1KiB');
                expect(binaryUnits(                  1048576)).to.equal('1MiB');
                expect(binaryUnits(               1073741824)).to.equal('1GiB');
                expect(binaryUnits(            1099511627776)).to.equal('1TiB');
                expect(binaryUnits(         1125899906842624)).to.equal('1PiB');
                expect(binaryUnits(      1152921504606846976)).to.equal('1EiB');
                expect(binaryUnits(   1180591620717411303424)).to.equal('1ZiB');
                expect(binaryUnits(1208925819614629174706176)).to.equal('1YiB');

            }
        );

        it(
            'should handle fractional numbers',
            () => {
                expect(binaryUnits(1000000)).to.equal('976.56KiB');
                expect(binaryUnits(1200000)).to.equal('1.14MiB');
                expect(binaryUnits(1230000)).to.equal('1.17MiB');
                expect(binaryUnits(1234000)).to.equal('1.18MiB');
            }
        );

        it(
            'should handle precision',
            () => {
                expect(binaryUnits(1000000, { precision: 3 })).to.equal('976.563KiB');
                expect(binaryUnits(1200000, { precision: 3 })).to.equal('1.144MiB');
                expect(binaryUnits(1230000, { precision: 3 })).to.equal('1.173MiB');
                expect(binaryUnits(1234000, { precision: 3 })).to.equal('1.177MiB');
            }
        );


        //TODO format
    }
);



