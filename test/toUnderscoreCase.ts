import 'mocha';
import { expect }        from 'chai';
import toUnderscoreCase  from '../toUnderscoreCase';

describe(
    'toUnderscoreCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toUnderscoreCase('now is the time for all good men to come to the aid of their country'))
                .to.equal('now_is_the_time_for_all_good_men_to_come_to_the_aid_of_their_country');
            }
        );

        it(
            'should not change remaining case',
            () => {
                expect(toUnderscoreCase('now IS the time for ALL good men to come to the AID of their country'))
                .to.equal('now_is_the_time_for_all_good_men_to_come_to_the_aid_of_their_country');
            }
        );
    }
);

