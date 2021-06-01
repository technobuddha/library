import expect from '../util/expect';
import toBoolean  from '../src/toBoolean';

describe(
    'toBoolean',
    () => {
        test(
            'should convert basic boolean values',
            () => {
                expect(toBoolean('true')).toBe(true);
                expect(toBoolean('false')).toBe(false);
                expect(toBoolean('yes')).toBe(true);
                expect(toBoolean('no')).toBe(false);
                expect(toBoolean('y')).toBe(true);
                expect(toBoolean('n')).toBe(false);
                expect(toBoolean('on')).toBe(true);
                expect(toBoolean('off')).toBe(false);
                expect(toBoolean('1')).toBe(true);
                expect(toBoolean('0')).toBe(false);
            }
        );

        test(
            'should ignore case',
            () => {
                expect(toBoolean('True')).toBe(true);
                expect(toBoolean('False')).toBe(false);
            }
        );

        test(
            'should treat unknowns as undefined',
            () => {
                expect(toBoolean('truthy')).toBeUndefined();
                expect(toBoolean('falsy')).toBeUndefined();
            }
        );

        test(
            'should allow string values',
            () => {
                expect(toBoolean('Yup', { trueValues: [ 'yup' ]})).toBe(true);
                expect(toBoolean('Nope', { falseValues: [ 'nope' ]})).toBe(false);
            }
        );

        test(
            'should allow allow regular expressions',
            () => {
                expect(toBoolean('Yup', { trueValues: [ /y.*/u ]})).toBe(true);
                expect(toBoolean('Nope', { falseValues: [ /n.*/u ]})).toBe(false);
            }
        );
    }
);
