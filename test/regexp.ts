import expect from '#util/expect';
import { domain, email, isoDate, numeric, ipV4 } from '../src/regexp';

describe(
    'regexp',
    () => {
        test(
            'validate hostname',
            () => {
                expect(domain.test('technobuddha.com')).toBe(true);
            }
        );

        test(
            'validate email',
            () => {
                expect(email.test('phil@technobudha.com')).toBe(true);
            }
        );

        test(
            'validate isoDate',
            () => {
                expect(isoDate.test('2021-06-02T10:45:31.345Z')).toBe(true);
            }
        );

        test(
            'validate numeric',
            () => {
                expect(numeric.test('123.456')).toBe(true);
            }
        );

        test.each([
            [ '0.0.0.0',            true  ],
            [ '00.00.00.00',        true  ],
            [ '000.000.000.000',    true  ],
            [ '1.1.1.1',            true  ],
            [ '250.255.0.0',        true  ],
            [ '249.200.100.199',    true  ],
            [ 'x1.2.3.4',           false ],
            [ '1.2.3.4x',           false ],
            [ '256.0.0.0',          false ],
        ])(
            'IPv4 %s',
            (str, result) => {
                expect(ipV4.test(str)).toBe(result);
            }
        );
    }
);
