import 'mocha';
import { expect }       from 'chai';
import padNumber        from '../src/padNumber';
import { negativeZero } from '../src/constants';


describe(
    'padNumber',
    () => {
        it(
            'should handle positive numbers',
            () => {
                expect(padNumber(0)).to.equal('00');
                expect(padNumber(1)).to.equal('01');
                expect(padNumber(10)).to.equal('10');
                expect(padNumber(100)).to.equal('100');
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(padNumber(-0)).to.equal('00');
                expect(padNumber(-1)).to.equal('-1');
                expect(padNumber(-10)).to.equal('-10');
                expect(padNumber(-100)).to.equal('-100');
            }
        );

        it(
            'should handle different lengths',
            () => {
                expect(padNumber(0, 10)).to.equal('0000000000');
                expect(padNumber(1, 10)).to.equal('0000000001');
                expect(padNumber(10, 10)).to.equal('0000000010');
                expect(padNumber(100, 10)).to.equal('0000000100');
                expect(padNumber(-0, 10)).to.equal('0000000000');
                expect(padNumber(-1, 10)).to.equal('-000000001');
                expect(padNumber(-10, 10)).to.equal('-000000010');
                expect(padNumber(-100, 10)).to.equal('-000000100');
            }
        );

        it(
            'should handle special numbers',
            () => {
                expect(padNumber(negativeZero)).to.equal('00');
                expect(padNumber(NaN)).to.equal('NaN');
                expect(padNumber(Infinity)).to.equal('Infinity');
                expect(padNumber(-Infinity)).to.equal('-Infinity');

                expect(padNumber(negativeZero, 10)).to.equal('0000000000');
                expect(padNumber(NaN, 10)).to.equal('       NaN');
                expect(padNumber(Infinity, 10)).to.equal('  Infinity');
                expect(padNumber(-Infinity, 10)).to.equal(' -Infinity');
            }
        );
    }
);

