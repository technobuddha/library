import { isValidJsIdentifier } from '../is-valid-js-identifer.ts';

describe('isValidJsIdentifier', () => {
  test('accepts valid ASCII identifiers', () => {
    expect(isValidJsIdentifier('foo')).toBeTrue();
    expect(isValidJsIdentifier('_private')).toBeTrue();
    expect(isValidJsIdentifier('$value')).toBeTrue();
    expect(isValidJsIdentifier('value123')).toBeTrue();
  });

  test('accepts valid Unicode identifiers', () => {
    expect(isValidJsIdentifier('éclair')).toBeTrue();
    expect(isValidJsIdentifier('π')).toBeTrue();
    expect(isValidJsIdentifier('अंक')).toBeTrue();
    expect(isValidJsIdentifier('x\u200Cy')).toBeTrue();
    expect(isValidJsIdentifier('x\u200Dy')).toBeTrue();
  });

  test('rejects invalid identifiers', () => {
    expect(isValidJsIdentifier('')).toBeFalse();
    expect(isValidJsIdentifier('1value')).toBeFalse();
    expect(isValidJsIdentifier('my-value')).toBeFalse();
    expect(isValidJsIdentifier('my value')).toBeFalse();
    expect(isValidJsIdentifier('value.thing')).toBeFalse();
  });

  test('does not validate reserved words', () => {
    expect(isValidJsIdentifier('class')).toBeTrue();
    expect(isValidJsIdentifier('return')).toBeTrue();
  });
});
