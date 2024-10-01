import toBoolean from './to-boolean.js';

describe('toBoolean', () => {
  test('should convert basic boolean values', () => {
    expect(toBoolean('true')).toBeTrue();
    expect(toBoolean('false')).toBeFalse();
    expect(toBoolean('yes')).toBeTrue();
    expect(toBoolean('no')).toBeFalse();
    expect(toBoolean('y')).toBeTrue();
    expect(toBoolean('n')).toBeFalse();
    expect(toBoolean('on')).toBeTrue();
    expect(toBoolean('off')).toBeFalse();
    expect(toBoolean('1')).toBeTrue();
    expect(toBoolean('0')).toBeFalse();
  });

  test('should ignore case', () => {
    expect(toBoolean('True')).toBeTrue();
    expect(toBoolean('False')).toBeFalse();
  });

  test('should treat unknowns as undefined', () => {
    expect(toBoolean('truthy')).toBeUndefined();
    expect(toBoolean('falsy')).toBeUndefined();
  });

  test('should allow string values', () => {
    expect(toBoolean('Yup', { trueValues: ['yup'] })).toBeTrue();
    expect(toBoolean('Nope', { falseValues: ['nope'] })).toBeFalse();
  });

  test('should allow allow regular expressions', () => {
    expect(toBoolean('Yup', { trueValues: [/y.*/u] })).toBeTrue();
    expect(toBoolean('Nope', { falseValues: [/n.*/u] })).toBeFalse();
  });
});
