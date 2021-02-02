import expect from '../util/expect';
import isPrimitive from '../src/isPrimitive';

describe(
    'isPrimitive',
    () => {
        it(
            'should detect primitives',
            () => {
                expect(isPrimitive(null)).toBe(true);
                expect(isPrimitive(undefined)).toBe(true);
                expect(isPrimitive('jabberwocky')).toBe(true);
                expect(isPrimitive(0)).toBe(true);
                expect(isPrimitive(Symbol())).toBe(true);
                expect(isPrimitive({})).toBe(false);
                expect(isPrimitive([])).toBe(false);
                expect(isPrimitive(new Date())).toBe(false);
            }
        );
    }
);
