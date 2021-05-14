import expect from '../util/expect';
import MersenneTwister  from '../src/MersenneTwister';

describe(
    'MersenneTwister',
    () => {
        test(
            'should generate same random number from seed',
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
    }
);
