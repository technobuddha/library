import expect from '#util/expect';
import toHumanCase from '../src/toHumanCase';

describe(
    'toHumanCase',
    () => {
        test(
            'should sentences',
            () => {
                expect(toHumanCase('now is the time for all good men to come to the aid of their country')).toBe('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('nowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry')).toBe('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country')).toBe('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('now.is.the.time.for.all.good.men.to.come.to.the.aid.of.their.country')).toBe('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('nowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry')).toBe('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('now_is_the_time_for_all_good_men_to_come_to_the_aid_of_their_country')).toBe('Now is the time for all good men to come to the aid of their country');
            }
        );
    }
);
