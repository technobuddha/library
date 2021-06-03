import expect from '../util/expect';
import { email, isoDate, numberString } from '../src/regexp';

describe(
    'regexp',
    () => {
        test(
            'validate email',
            () => {
                expect(email.test('phil@technobudha.com')).toBe(true);
            }
        );

        test(
            'computes isoDate',
            () => {
                expect(isoDate.test('2021-06-02T10:45:31.345Z')).toBe(true);
            }
        );

        test(
            'computes numberString',
            () => {
                expect(numberString.test('123.456')).toBe(true);
            }
        );
    }
);
