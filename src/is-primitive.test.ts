import isPrimitive from './is-primitive.js';

describe('isPrimitive', () => {
  test('should detect primitives', () => {
    expect(isPrimitive(null)).toBeTrue();
    expect(isPrimitive('jabberwocky')).toBeTrue();
    expect(isPrimitive(0)).toBeTrue();
    expect(isPrimitive(Symbol('symbol'))).toBeTrue();
    expect(isPrimitive({})).toBeFalse();
    expect(isPrimitive([])).toBeFalse();
    expect(isPrimitive(new Date())).toBeFalse();
  });
});
