import 'mocha';
import { expect }  from 'chai';
import toHumanCase from '../src/toHumanCase';

describe(
    'toHumanCase',
    () => {
        it(
            'should sentences',
            () => {
                expect(toHumanCase('now is the time for all good men to come to the aid of their country'))
                .to.equal('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('nowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry'))
                .to.equal('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country'))
                .to.equal('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('now.is.the.time.for.all.good.men.to.come.to.the.aid.of.their.country'))
                .to.equal('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('nowIsTheTimeForAllGoodMenToComeToTheAidOfTheirCountry'))
                .to.equal('Now is the time for all good men to come to the aid of their country');
                expect(toHumanCase('now_is_the_time_for_all_good_men_to_come_to_the_aid_of_their_country'))
                .to.equal('Now is the time for all good men to come to the aid of their country');
            }
        );
    }
);
