import expect from '../util/expect';
import syllables  from '../src/syllables';

describe(
    'syllables',
    () => {
        test(
            'should count syllables',
            () => {
                expect(syllables('now is the time for all good men to come to the aid of their country')).toBe(17);
                expect(syllables('the quick brown fox jumped over the lazy dog')).toBe(11);
                expect(syllables('organization')).toBe(5);
                //expect(syllables('recommendations')).to.equal(5);
            }
        );
    }
);
