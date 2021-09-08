import expect from '@util/expect';
import toDashCase from '../src/toDashCase';

describe(
    'toDashCase',
    () => {
        test(
            'should sentences',
            () => {
                expect(toDashCase('now is the time for all good men to come to the aid of their country')).toBe('now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country');
            }
        );

        test(
            'should not change remaining case',
            () => {
                expect(toDashCase('now IS the time for ALL good men to come to the AID of their country')).toBe('now-is-the-time-for-all-good-men-to-come-to-the-aid-of-their-country');
            }
        );
    }
);
