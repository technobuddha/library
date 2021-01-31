import 'mocha';
import { expect }       from 'chai';
import ordinal          from '../src/ordinal';
import { negativeZero } from '../src/constants';

describe(
    'ordinal',
    () => {
        it(
            'should handle positive numbers',
            () => {
                expect(ordinal(0)).to.equal('0th');
                expect(ordinal(1)).to.equal('1st');
                expect(ordinal(2)).to.equal('2nd');
                expect(ordinal(3)).to.equal('3rd');
                expect(ordinal(4)).to.equal('4th');
                expect(ordinal(5)).to.equal('5th');
                expect(ordinal(10)).to.equal('10th');
                expect(ordinal(11)).to.equal('11th');
                expect(ordinal(12)).to.equal('12th');
                expect(ordinal(13)).to.equal('13th');
                expect(ordinal(14)).to.equal('14th');
                expect(ordinal(20)).to.equal('20th');
                expect(ordinal(21)).to.equal('21st');
                expect(ordinal(22)).to.equal('22nd');
                expect(ordinal(23)).to.equal('23rd');
                expect(ordinal(24)).to.equal('24th');
                expect(ordinal(1000010)).to.equal('1000010th');
                expect(ordinal(1000011)).to.equal('1000011th');
                expect(ordinal(1000012)).to.equal('1000012th');
                expect(ordinal(1000013)).to.equal('1000013th');
                expect(ordinal(1000014)).to.equal('1000014th');
                expect(ordinal(1000020)).to.equal('1000020th');
                expect(ordinal(1000021)).to.equal('1000021st');
                expect(ordinal(1000022)).to.equal('1000022nd');
                expect(ordinal(1000023)).to.equal('1000023rd');
                expect(ordinal(1000024)).to.equal('1000024th');
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(ordinal(-0)).to.equal('0th');
                expect(ordinal(-1)).to.equal('-1st');
                expect(ordinal(-2)).to.equal('-2nd');
                expect(ordinal(-3)).to.equal('-3rd');
                expect(ordinal(-4)).to.equal('-4th');
                expect(ordinal(-5)).to.equal('-5th');
                expect(ordinal(-10)).to.equal('-10th');
                expect(ordinal(-11)).to.equal('-11th');
                expect(ordinal(-12)).to.equal('-12th');
                expect(ordinal(-13)).to.equal('-13th');
                expect(ordinal(-14)).to.equal('-14th');
                expect(ordinal(-20)).to.equal('-20th');
                expect(ordinal(-21)).to.equal('-21st');
                expect(ordinal(-22)).to.equal('-22nd');
                expect(ordinal(-23)).to.equal('-23rd');
                expect(ordinal(-24)).to.equal('-24th');
                expect(ordinal(-1000010)).to.equal('-1000010th');
                expect(ordinal(-1000011)).to.equal('-1000011th');
                expect(ordinal(-1000012)).to.equal('-1000012th');
                expect(ordinal(-1000013)).to.equal('-1000013th');
                expect(ordinal(-1000014)).to.equal('-1000014th');
                expect(ordinal(-1000020)).to.equal('-1000020th');
                expect(ordinal(-1000021)).to.equal('-1000021st');
                expect(ordinal(-1000022)).to.equal('-1000022nd');
                expect(ordinal(-1000023)).to.equal('-1000023rd');
                expect(ordinal(-1000024)).to.equal('-1000024th');
            }
        );

        it(
            'should handle non integers',
            () => {
                expect(ordinal(0.1)).to.equal('0.1th');
                expect(ordinal(0.2)).to.equal('0.2th');
                expect(ordinal(0.3)).to.equal('0.3th');
                expect(ordinal(0.4)).to.equal('0.4th');
                expect(ordinal(0.5)).to.equal('0.5th');
            }
        );

        it(
            'should handle exponential number',
            () => {
                expect(ordinal(1e100)).to.equal('1e+100th');
                expect(ordinal(1.2e110)).to.equal('1.2e+110th');
                expect(ordinal(1.23e120)).to.equal('1.23e+120th');
                expect(ordinal(1e-100)).to.equal('1e-100th');
                expect(ordinal(1.2e-110)).to.equal('1.2e-110th');
                expect(ordinal(1.23e-120)).to.equal('1.23e-120th');
            }
        );

        it(
            'should handle special numbers',
            () => {
                expect(ordinal(negativeZero)).to.equal('0th');
                expect(ordinal(NaN)).to.equal('NaN');
                expect(ordinal(Infinity)).to.equal('Infinityth');
                expect(ordinal(-Infinity)).to.equal('-Infinityth');
            }
        );
    }
);
