import { isValidJsVariable } from '../is-valid-js-variable.ts';

describe('isValidJsVariable', () => {
  test('accepts valid variable names', () => {
    expect(isValidJsVariable('foo')).toBeTrue();
    expect(isValidJsVariable('_private')).toBeTrue();
    expect(isValidJsVariable('$value')).toBeTrue();
    expect(isValidJsVariable('value123')).toBeTrue();
    expect(isValidJsVariable('π')).toBeTrue();
    expect(isValidJsVariable('x\u{200C}y')).toBeTrue();
  });

  test('rejects invalid identifier syntax', () => {
    expect(isValidJsVariable('')).toBeFalse();
    expect(isValidJsVariable('1value')).toBeFalse();
    expect(isValidJsVariable('my-value')).toBeFalse();
    expect(isValidJsVariable('my value')).toBeFalse();
    expect(isValidJsVariable('value.thing')).toBeFalse();
  });

  test('rejects ECMAScript reserved words', () => {
    expect(isValidJsVariable('class')).toBeFalse();
    expect(isValidJsVariable('return')).toBeFalse();
    expect(isValidJsVariable('null')).toBeFalse();
    expect(isValidJsVariable('true')).toBeFalse();
  });

  test('rejects strict-mode and top-level reserved words', () => {
    expect(isValidJsVariable('implements')).toBeFalse();
    expect(isValidJsVariable('let')).toBeFalse();
    expect(isValidJsVariable('arguments')).toBeFalse();
    expect(isValidJsVariable('await')).toBeFalse();
  });

  test('accepts non-reserved lookalikes', () => {
    expect(isValidJsVariable('className')).toBeTrue();
    expect(isValidJsVariable('awaited')).toBeTrue();
    expect(isValidJsVariable('interfaceType')).toBeTrue();
  });
});
