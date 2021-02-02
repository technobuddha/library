import expect from '../util/expect';
import metricUnits from '../src/metricUnits';

//TODO add tests for 'pad' option
describe(
    'metricUnits',
    () => {
        it(
            'should handle numbers greater than 1',
            () => {
                expect(metricUnits(1)).toBe('1');
                expect(metricUnits(10)).toBe('10');
                expect(metricUnits(100)).toBe('100');
                expect(metricUnits(1000)).toBe('1K');
                expect(metricUnits(1000000)).toBe('1M');
                expect(metricUnits(1000000000)).toBe('1G');
                expect(metricUnits(1000000000000)).toBe('1T');
                expect(metricUnits(1000000000000000)).toBe('1P');
                expect(metricUnits(1000000000000000000)).toBe('1E');
                expect(metricUnits(1000000000000000000000)).toBe('1Z');
                expect(metricUnits(1000000000000000000000000)).toBe('1Y');
            }
        );

        it(
            'should handle numbers less than 1',
            () => {
                expect(metricUnits(0.1)).toBe('0.1');
                expect(metricUnits(0.01)).toBe('10m');
                expect(metricUnits(0.001)).toBe('1m');
                expect(metricUnits(0.0001)).toBe('0.1m');
                expect(metricUnits(0.000001)).toBe('1µ');
                expect(metricUnits(0.000000001)).toBe('1n');
                expect(metricUnits(0.000000000001)).toBe('1p');
                expect(metricUnits(0.000000000000001)).toBe('1f');
                expect(metricUnits(0.000000000000000001)).toBe('1a');
                expect(metricUnits(0.000000000000000000001)).toBe('1z');
                expect(metricUnits(0.000000000000000000000001)).toBe('1y');
            }
        );

        it(
            'should handle fractional numbers',
            () => {
                expect(metricUnits(1000000)).toBe('1M');
                expect(metricUnits(1200000)).toBe('1.2M');
                expect(metricUnits(1230000)).toBe('1.23M');
                expect(metricUnits(1234000)).toBe('1.23M');
                expect(metricUnits(1235000)).toBe('1.24M');
            }
        );

        it(
            'should handle precision',
            () => {
                expect(metricUnits(1000000, { precision: 3 })).toBe('1M');
                expect(metricUnits(1200000, { precision: 3 })).toBe('1.2M');
                expect(metricUnits(1230000, { precision: 3 })).toBe('1.23M');
                expect(metricUnits(1234000, { precision: 3 })).toBe('1.234M');
                expect(metricUnits(1234500, { precision: 3 })).toBe('1.235M');
            }
        );

        it(
            'should handle macro',
            () => {
                expect(metricUnits(1, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1');
                expect(metricUnits(10, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('10');
                expect(metricUnits(100, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('100');
                expect(metricUnits(1000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1A');
                expect(metricUnits(1000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1B');
                expect(metricUnits(1000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1C');
                expect(metricUnits(1000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1D');
                expect(metricUnits(1000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1E');
                expect(metricUnits(1000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1F');
                expect(metricUnits(1000000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1G');
                expect(metricUnits(1000000000000000000000000, { macro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1H');
            }
        );

        it(
            'should handle micro',
            () => {
                expect(metricUnits(0.1, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('0.1');
                expect(metricUnits(0.01, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('10A');
                expect(metricUnits(0.001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1A');
                expect(metricUnits(0.000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1B');
                expect(metricUnits(0.000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1C');
                expect(metricUnits(0.000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1D');
                expect(metricUnits(0.000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1E');
                expect(metricUnits(0.000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1F');
                expect(metricUnits(0.000000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1G');
                expect(metricUnits(0.000000000000000000000001, { micro: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]})).toBe('1H');
            }
        );

        it(
            'should handle unit',
            () => {
                expect(metricUnits(2, { unit: 2000 })).toBe('2');
                expect(metricUnits(20, { unit: 2000 })).toBe('20');
                expect(metricUnits(200, { unit: 2000 })).toBe('200');
                expect(metricUnits(2000, { unit: 2000 })).toBe('1K');
                expect(metricUnits(4000000, { unit: 2000 })).toBe('1M');
                expect(metricUnits(8000000000, { unit: 2000 })).toBe('1G');
                expect(metricUnits(16000000000000, { unit: 2000 })).toBe('1T');
                expect(metricUnits(32000000000000000, { unit: 2000 })).toBe('1P');
                expect(metricUnits(64000000000000000000, { unit: 2000 })).toBe('1E');
                expect(metricUnits(128000000000000000000000, { unit: 2000 })).toBe('1Z');
                expect(metricUnits(256000000000000000000000000, { unit: 2000 })).toBe('1Y');
            }
        );

        it(
            'should respect format',
            () => {
                expect(metricUnits(1, { format: '000' })).toBe('001');
                expect(metricUnits(10, { format: '000' })).toBe('010');
            }
        );
    }
);
