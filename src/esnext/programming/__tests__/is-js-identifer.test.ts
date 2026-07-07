import { isJsIdentifier } from '../is-js-identifier.ts';

describe('isJsIdentifier', () => {
  test('accepts valid ASCII identifiers', () => {
    expect(isJsIdentifier('foo')).toBeTrue();
    expect(isJsIdentifier('_private')).toBeTrue();
    expect(isJsIdentifier('$value')).toBeTrue();
    expect(isJsIdentifier('value123')).toBeTrue();
  });

  test('accepts valid Unicode identifiers', () => {
    expect(isJsIdentifier('éclair')).toBeTrue();
    expect(isJsIdentifier('π')).toBeTrue();
    expect(isJsIdentifier('अंक')).toBeTrue();
    expect(isJsIdentifier('x\u{200C}y')).toBeTrue();
    expect(isJsIdentifier('x\u{200D}y')).toBeTrue();
  });

  test('rejects invalid identifiers', () => {
    expect(isJsIdentifier('')).toBeFalse();
    expect(isJsIdentifier('1value')).toBeFalse();
    expect(isJsIdentifier('my-value')).toBeFalse();
    expect(isJsIdentifier('my value')).toBeFalse();
    expect(isJsIdentifier('value.thing')).toBeFalse();
  });

  test('does not validate reserved words', () => {
    expect(isJsIdentifier('class')).toBeTrue();
    expect(isJsIdentifier('return')).toBeTrue();
  });
});
