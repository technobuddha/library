import expect from '#util/expect';
import toDate  from '../src/toDate';

describe(
    'toDate',
    () => {
        test(
            'should return dates',
            () => {
                const now = new Date();

                expect(toDate(now)).toEqual(now);
            }
        );

        test(
            'should convert numbers',
            () => {
                expect(toDate(123456789)).toEqual(new Date(123456789));
            }
        );

        test(
            'should convert strings',
            () => {
                expect(toDate('02 Jun 2021')).toEqual(new Date('02 Jun 2021'));
            }
        );

        test(
            'nullish should be invalid dates',
            () => {
                expect(toDate(null).getTime()).toBeNaN();
                expect(toDate(undefined).getTime()).toBeNaN();
            }
        );

        test(
            'convert other types to string first',
            () => {
                expect(toDate({ toString: () => '02 Jun 2021' })).toEqual(new Date('02 Jun 2021'));
            }
        );
    }
);
