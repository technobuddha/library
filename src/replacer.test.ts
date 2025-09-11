import { specialBegin, specialFinish } from './json.ts';
import { replacer } from './replacer.ts';

describe('replacer', () => {
  test('should encode dates', () => {
    const now = new Date();

    expect(JSON.stringify({ date: now }, replacer)).toBe(
      `{"date":"${specialBegin}Date:${now.toISOString()}${specialFinish}"}`,
    );
  });

  test('should encode Regexps', () => {
    expect(JSON.stringify({ regexp: /abc/giu }, replacer)).toBe(
      `{"regexp":"${specialBegin}RegExp:/abc/giu${specialFinish}"}`,
    );
  });

  test('should encode numbers', () => {
    expect(JSON.stringify({ number: Number.NaN }, replacer)).toBe(
      `{"number":"${specialBegin}Number:NaN${specialFinish}"}`,
    );
    expect(JSON.stringify({ number: Infinity }, replacer)).toBe(
      `{"number":"${specialBegin}Number:Infinity${specialFinish}"}`,
    );
    expect(JSON.stringify({ number: -Infinity }, replacer)).toBe(
      `{"number":"${specialBegin}Number:-Infinity${specialFinish}"}`,
    );
  });

  test('should encode bigint', () => {
    expect(JSON.stringify({ bigint: BigInt('123456789') }, replacer)).toBe(
      `{"bigint":"${specialBegin}BigInt:123456789${specialFinish}"}`,
    );
  });
});
