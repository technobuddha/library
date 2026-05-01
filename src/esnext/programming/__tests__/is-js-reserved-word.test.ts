import { isJsReservedWord } from '../is-js-reserved-word.ts';

describe('isJsReservedWord', () => {
  test('accepts ECMAScript reserved words', () => {
    expect(isJsReservedWord('class')).toBeTrue();
    expect(isJsReservedWord('return')).toBeTrue();
    expect(isJsReservedWord('null')).toBeTrue();
    expect(isJsReservedWord('true')).toBeTrue();
  });

  test('accepts strict-mode reserved words by default', () => {
    expect(isJsReservedWord('implements')).toBeTrue();
    expect(isJsReservedWord('interface')).toBeTrue();
    expect(isJsReservedWord('let')).toBeTrue();
    expect(isJsReservedWord('arguments')).toBeTrue();
  });

  test('can exclude strict-mode reserved words', () => {
    expect(isJsReservedWord('implements', { strict: false })).toBeFalse();
    expect(isJsReservedWord('interface', { strict: false })).toBeFalse();
    expect(isJsReservedWord('let', { strict: false })).toBeFalse();
    expect(isJsReservedWord('class', { strict: false })).toBeTrue();
  });

  test('accepts top-level reserved words by default', () => {
    expect(isJsReservedWord('await')).toBeTrue();
  });

  test('can exclude top-level reserved words', () => {
    expect(isJsReservedWord('await', { top: false })).toBeFalse();
    expect(isJsReservedWord('class', { top: false })).toBeTrue();
  });

  test('rejects non-reserved words', () => {
    expect(isJsReservedWord('myValue')).toBeFalse();
    expect(isJsReservedWord('className')).toBeFalse();
    expect(isJsReservedWord('π')).toBeFalse();
    expect(isJsReservedWord('')).toBeFalse();
  });
});
