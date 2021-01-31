import 'mocha';
import { expect } from 'chai';
import syllables  from '../src/syllables';

describe(
    'syllables',
    () => {
        it(
            'should count syllables',
            () => {
                expect(syllables('now is the time for all good men to come to the aid of their country')).to.equal(17);
                expect(syllables('the quick brown fox jumped over the lazy dog')).to.equal(11);
                expect(syllables('organization')).to.equal(5);
                //expect(syllables('recommendations')).to.equal(5);
            }
        );
    }
);
