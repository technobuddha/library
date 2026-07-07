import { isJsVariable } from '../is-js-variable.ts';

describe('isJsVariable', () => {
  test('accepts valid variable names', () => {
    expect(isJsVariable('foo')).toBeTrue();
    expect(isJsVariable('_private')).toBeTrue();
    expect(isJsVariable('$value')).toBeTrue();
    expect(isJsVariable('value123')).toBeTrue();
    expect(isJsVariable('π')).toBeTrue();
    expect(isJsVariable('x\u{200C}y')).toBeTrue();
  });

  test('rejects invalid identifier syntax', () => {
    expect(isJsVariable('')).toBeFalse();
    expect(isJsVariable('1value')).toBeFalse();
    expect(isJsVariable('my-value')).toBeFalse();
    expect(isJsVariable('my value')).toBeFalse();
    expect(isJsVariable('value.thing')).toBeFalse();
  });

  test('rejects ECMAScript reserved words', () => {
    expect(isJsVariable('class')).toBeFalse();
    expect(isJsVariable('return')).toBeFalse();
    expect(isJsVariable('null')).toBeFalse();
    expect(isJsVariable('true')).toBeFalse();
  });

  test('rejects strict-mode and top-level reserved words', () => {
    expect(isJsVariable('implements')).toBeFalse();
    expect(isJsVariable('let')).toBeFalse();
    expect(isJsVariable('arguments')).toBeFalse();
    expect(isJsVariable('await')).toBeFalse();
  });

  test('accepts non-reserved lookalikes', () => {
    expect(isJsVariable('className')).toBeTrue();
    expect(isJsVariable('awaited')).toBeTrue();
    expect(isJsVariable('interfaceType')).toBeTrue();
  });
});
