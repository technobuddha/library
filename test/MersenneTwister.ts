import expect from '@util/expect';
import MersenneTwister  from '../src/MersenneTwister';

describe(
    'MersenneTwister',
    () => {
        test(
            'should generate same random int32 from seed',
            () => {
                const mt = new MersenneTwister(0);

                expect(mt.genrand_int32()).toBe(293910048);
                expect(mt.genrand_int32()).toBe(417317171);
                expect(mt.genrand_int32()).toBe(2036186861);
                expect(mt.genrand_int32()).toBe(1160412725);
                expect(mt.genrand_int32()).toBe(338713629);
                expect(mt.genrand_int32()).toBe(1008941840);
            }
        );

        test(
            'should generate same random int31 from seed',
            () => {
                const mt = new MersenneTwister(0);

                expect(mt.genrand_int31()).toBe(146955024);
                expect(mt.genrand_int31()).toBe(208658585);
                expect(mt.genrand_int31()).toBe(1018093430);
                expect(mt.genrand_int31()).toBe(580206362);
                expect(mt.genrand_int31()).toBe(169356814);
                expect(mt.genrand_int31()).toBe(504470920);
            }
        );

        test(
            'should generate same random real1 from seed',
            () => {
                const mt = new MersenneTwister(0);

                expect(mt.genrand_real1()).toBeCloseTo(0.0684312656681126, 15);
                expect(mt.genrand_real1()).toBeCloseTo(0.0971642255543647, 15);
                expect(mt.genrand_real1()).toBeCloseTo(0.4740866975565643, 15);
                expect(mt.genrand_real1()).toBeCloseTo(0.2701796417287969, 15);
                expect(mt.genrand_real1()).toBeCloseTo(0.0788629122727697, 15);
                expect(mt.genrand_real1()).toBeCloseTo(0.2349125780712144, 15);
            }
        );

        test(
            'should generate same random real2 from seed',
            () => {
                const mt = new MersenneTwister(0);

                expect(mt.genrand_real2()).toBeCloseTo(0.0684312656521797, 15);
                expect(mt.genrand_real2()).toBeCloseTo(0.0971642255317419, 15);
                expect(mt.genrand_real2()).toBeCloseTo(0.4740866974461823, 15);
                expect(mt.genrand_real2()).toBeCloseTo(0.2701796416658908, 15);
                expect(mt.genrand_real2()).toBeCloseTo(0.0788629122544080, 15);
                expect(mt.genrand_real2()).toBeCloseTo(0.2349125780165195, 15);
            }
        );

        test(
            'should generate same random real3 from seed',
            () => {
                const mt = new MersenneTwister(0);

                expect(mt.genrand_real3()).toBeCloseTo(0.0684312657685950, 15);
                expect(mt.genrand_real3()).toBeCloseTo(0.0971642256481573, 15);
                expect(mt.genrand_real3()).toBeCloseTo(0.4740866975625977, 15);
                expect(mt.genrand_real3()).toBeCloseTo(0.2701796417823061, 15);
                expect(mt.genrand_real3()).toBeCloseTo(0.0788629123708233, 15);
                expect(mt.genrand_real3()).toBeCloseTo(0.2349125781329348, 15);
            }
        );

        test(
            'should generate same random res53 from seed',
            () => {
                const mt = new MersenneTwister(0);

                expect(mt.genrand_res53()).toBeCloseTo(0.0684312663761095, 15);
                expect(mt.genrand_res53()).toBeCloseTo(0.4740866964323791, 15);
                expect(mt.genrand_res53()).toBeCloseTo(0.0788629072525544, 15);
                expect(mt.genrand_res53()).toBeCloseTo(0.2875786441468070, 15);
                expect(mt.genrand_res53()).toBeCloseTo(0.2310116773870166, 15);
                expect(mt.genrand_res53()).toBeCloseTo(0.0952395144272963, 15);
            }
        );

        test(
            'should generate same random int32 from array seed',
            () => {
                const mt = new MersenneTwister(new Array(100).fill(0));

                expect(mt.genrand_int32()).toBe(1434223582);
                expect(mt.genrand_int32()).toBe(1450191270);
            }
        );

        test(
            'should generate same random int32 from array seed',
            () => {
                const mt = new MersenneTwister(new Array(1000).fill(0));

                expect(mt.genrand_int32()).toBe(1914342825);
                expect(mt.genrand_int32()).toBe(305667567);
            }
        );

        test(
            'should generate random int32',
            () => {
                const mt = new MersenneTwister();

                expect(mt.genrand_int32()).toBeLessThanOrEqual(0xFFFFFFFF);
            }
        );
    }
);
