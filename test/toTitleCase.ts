import 'mocha';
import { expect }   from 'chai';
import toTitleCase  from '../toTitleCase';

describe(
    'toTitleCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toTitleCase('now is the time for all good men to come to the aid of their country.'))
                .to.equal('Now Is the Time for All Good Men to Come to the Aid of Their Country.');
            }
        );
    }
);

