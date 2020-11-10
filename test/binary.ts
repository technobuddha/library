import 'mocha';
import { expect } from 'chai';
import binary     from '../binary';


describe(
    'binary',
    () => {
        it(
            'should handle whole numbers than 1',
            () => {
                expect(binary(                        1)).to.equal('1B');
                expect(binary(                       10)).to.equal('10B');
                expect(binary(                      100)).to.equal('100B');
                expect(binary(                     1000)).to.equal('1000B');
                expect(binary(                     1024)).to.equal('1KiB');
                expect(binary(                  1048576)).to.equal('1MiB');
                expect(binary(               1073741824)).to.equal('1GiB');
                expect(binary(            1099511627776)).to.equal('1TiB');
                expect(binary(         1125899906842624)).to.equal('1PiB');
                expect(binary(      1152921504606846976)).to.equal('1EiB');
                expect(binary(   1180591620717411303424)).to.equal('1ZiB');
                expect(binary(1208925819614629174706176)).to.equal('1YiB');

            }
        );

        it(
            'should handle fractional numbers',
            () => {
                expect(binary(1000000)).to.equal('976.56KiB');
                expect(binary(1200000)).to.equal('1.14MiB');
                expect(binary(1230000)).to.equal('1.17MiB');
                expect(binary(1234000)).to.equal('1.18MiB');
            }
        );

        it(
            'should handle precision',
            () => {
                expect(binary(1000000, { precision: 3 })).to.equal('976.563KiB');
                expect(binary(1200000, { precision: 3 })).to.equal('1.144MiB');
                expect(binary(1230000, { precision: 3 })).to.equal('1.173MiB');
                expect(binary(1234000, { precision: 3 })).to.equal('1.177MiB');
            }
        );


        //TODO format
    }
);

