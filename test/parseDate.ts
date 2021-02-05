import expect from '../util/expect';
import parseDate  from '../src/parseDate';

describe(
    'parseDate',
    () => {
        test(
            'should find the last occurrence of a day in a month',
            () => {
                expect(parseDate('07012018').toString()).toBe(new Date('1 Jul 2018').toString());
            }
        );
    }
);
