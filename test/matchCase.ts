import expect from '#util/expect';
import matchCase  from '../src/matchCase';

describe(
    'matchCase',
    () => {
        test(
            'should match case',
            () => {
                expect(matchCase('abc', 'xyz')).toBe('abc');
                expect(matchCase('abc', 'XYZ')).toBe('ABC');
                expect(matchCase('abc', 'Xyz')).toBe('Abc');
                expect(matchCase('abc', 'xYZ')).toBe('aBC');
                expect(matchCase('ABC', 'xyz')).toBe('abc');
                expect(matchCase('ABC', 'XYZ')).toBe('ABC');
                expect(matchCase('ABC', 'Xyz')).toBe('Abc');
                expect(matchCase('ABC', 'xYZ')).toBe('aBC');
            }
        );

        test(
            'should handle empty string',
            () => {
                expect(matchCase('abc', '')).toBe('abc');
                expect(matchCase('ABC', '')).toBe('ABC');
            }
        );
    }
);
