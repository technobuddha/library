import expect from '../util/expect';
import toDotCase  from '../src/toDotCase';

describe(
    'toDotCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toDotCase('now is the time for all good men to come to the aid of their country')).toBe('now.is.the.time.for.all.good.men.to.come.to.the.aid.of.their.country');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toDotCase('now IS the time for ALL good men to come to the AID of their country')).toBe('now.is.the.time.for.all.good.men.to.come.to.the.aid.of.their.country');
            }
        );
    }
);
