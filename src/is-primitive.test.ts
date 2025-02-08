import { isPrimitive } from './is-primitive.ts';

describe('isPrimitive', () => {
  test('should detect primitives', () => {
    expect(isPrimitive(null)).toBeTrue();
    expect(isPrimitive(undefined)).toBeTrue();
    expect(isPrimitive('jabberwocky')).toBeTrue();
    expect(isPrimitive(0)).toBeTrue();
    expect(isPrimitive(Symbol('description'))).toBeTrue();
    expect(isPrimitive({})).toBeFalse();
    expect(isPrimitive([])).toBeFalse();
    expect(isPrimitive(new Date())).toBeFalse();
  });
});
