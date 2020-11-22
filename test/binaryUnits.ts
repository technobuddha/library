import 'mocha';
import { expect }  from 'chai';
import binaryUnits from '../src/binaryUnits';

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



