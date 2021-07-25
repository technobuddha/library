import expect from '../util/expect';
import ordinal          from '../src/ordinal';
import { negativeZero } from '../src/constants';

describe(
    'ordinal',
    () => {
        test(
            'should handle positive numbers',
            () => {
                expect(ordinal(0)).toBe('0th');
                expect(ordinal(1)).toBe('1st');
                expect(ordinal(2)).toBe('2nd');
                expect(ordinal(3)).toBe('3rd');
                expect(ordinal(4)).toBe('4th');
                expect(ordinal(5)).toBe('5th');
                expect(ordinal(10)).toBe('10th');
                expect(ordinal(11)).toBe('11th');
                expect(ordinal(12)).toBe('12th');
                expect(ordinal(13)).toBe('13th');
                expect(ordinal(14)).toBe('14th');
                expect(ordinal(20)).toBe('20th');
                expect(ordinal(21)).toBe('21st');
                expect(ordinal(22)).toBe('22nd');
                expect(ordinal(23)).toBe('23rd');
                expect(ordinal(24)).toBe('24th');
                expect(ordinal(1000010)).toBe('1000010th');
                expect(ordinal(1000011)).toBe('1000011th');
                expect(ordinal(1000012)).toBe('1000012th');
                expect(ordinal(1000013)).toBe('1000013th');
                expect(ordinal(1000014)).toBe('1000014th');
                expect(ordinal(1000020)).toBe('1000020th');
                expect(ordinal(1000021)).toBe('1000021st');
                expect(ordinal(1000022)).toBe('1000022nd');
                expect(ordinal(1000023)).toBe('1000023rd');
                expect(ordinal(1000024)).toBe('1000024th');
            }
        );

        test(
            'should handle negative numbers',
            () => {
                expect(ordinal(-0)).toBe('0th');
                expect(ordinal(-1)).toBe('-1st');
                expect(ordinal(-2)).toBe('-2nd');
                expect(ordinal(-3)).toBe('-3rd');
                expect(ordinal(-4)).toBe('-4th');
                expect(ordinal(-5)).toBe('-5th');
                expect(ordinal(-10)).toBe('-10th');
                expect(ordinal(-11)).toBe('-11th');
                expect(ordinal(-12)).toBe('-12th');
                expect(ordinal(-13)).toBe('-13th');
                expect(ordinal(-14)).toBe('-14th');
                expect(ordinal(-20)).toBe('-20th');
                expect(ordinal(-21)).toBe('-21st');
                expect(ordinal(-22)).toBe('-22nd');
                expect(ordinal(-23)).toBe('-23rd');
                expect(ordinal(-24)).toBe('-24th');
                expect(ordinal(-1000010)).toBe('-1000010th');
                expect(ordinal(-1000011)).toBe('-1000011th');
                expect(ordinal(-1000012)).toBe('-1000012th');
                expect(ordinal(-1000013)).toBe('-1000013th');
                expect(ordinal(-1000014)).toBe('-1000014th');
                expect(ordinal(-1000020)).toBe('-1000020th');
                expect(ordinal(-1000021)).toBe('-1000021st');
                expect(ordinal(-1000022)).toBe('-1000022nd');
                expect(ordinal(-1000023)).toBe('-1000023rd');
                expect(ordinal(-1000024)).toBe('-1000024th');
            }
        );

        test(
            'should handle non integers',
            () => {
                expect(ordinal(0.1)).toBe('0.1th');
                expect(ordinal(0.2)).toBe('0.2th');
                expect(ordinal(0.3)).toBe('0.3th');
                expect(ordinal(0.4)).toBe('0.4th');
                expect(ordinal(0.5)).toBe('0.5th');
            }
        );

        test(
            'should handle exponential number',
            () => {
                expect(ordinal(1e100)).toBe('1e+100th');
                expect(ordinal(1.2e110)).toBe('1.2e+110th');
                expect(ordinal(1.23e120)).toBe('1.23e+120th');
                expect(ordinal(1e-100)).toBe('1e-100th');
                expect(ordinal(1.2e-110)).toBe('1.2e-110th');
                expect(ordinal(1.23e-120)).toBe('1.23e-120th');
            }
        );

        test(
            'should handle special numbers',
            () => {
                expect(ordinal(negativeZero)).toBe('0th');
                expect(ordinal(Number.NaN)).toBe('NaN');
                expect(ordinal(Infinity)).toBe('Infinityth');
                expect(ordinal(-Infinity)).toBe('-Infinityth');
            }
        );
    }
);
