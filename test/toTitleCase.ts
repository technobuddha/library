import expect from '../util/expect';
import toTitleCase  from '../src/toTitleCase';

describe(
    'toTitleCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toTitleCase('now is the time for all good men to come to the aid of their country.')).toBe('Now Is the Time for All Good Men to Come to the Aid of Their Country.');
            }
        );
    }
);
