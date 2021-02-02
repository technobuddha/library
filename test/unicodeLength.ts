import expect from '../util/expect';
import unicodeLength from '../src/unicodeLength';

describe(
    'unicodeLength',
    () => {
        it(
            'should detect surrogates',
            () => {
                expect('😀😁😂😺😸😹'.length).toBe(12);
                expect(unicodeLength('😀😁😂😺😸😹')).toBe(6);
            }
        );
    }
);
