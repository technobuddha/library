import { specialBegin, specialFinish } from '../json.ts';
import { reviver } from '../reviver.ts';

describe('reviver', () => {
  test('should decode dates', () => {
    const now = new Date();

    expect(
      JSON.parse(`{"date":"${specialBegin}Date:${now.toISOString()}${specialFinish}"}`, reviver),
    ).toEqual({ date: now });
  });

  test('should decode Regexps', () => {
    expect(
      JSON.parse(`{"regexp":"${specialBegin}RegExp:/abc/giv${specialFinish}"}`, reviver),
    ).toEqual({ regexp: /abc/giv });
  });

  test('should decode numbers', () => {
    expect(JSON.parse(`{"number":"${specialBegin}Number:NaN${specialFinish}"}`, reviver)).toEqual({
      number: Number.NaN,
    });
    expect(
      JSON.parse(`{"number":"${specialBegin}Number:Infinity${specialFinish}"}`, reviver),
    ).toEqual({ number: Infinity });
    expect(
      JSON.parse(`{"number":"${specialBegin}Number:-Infinity${specialFinish}"}`, reviver),
    ).toEqual({ number: -Infinity });
  });

  test('should decode bigint', () => {
    expect(
      JSON.parse(`{"bigint":"${specialBegin}BigInt:123456789${specialFinish}"}`, reviver),
    ).toEqual({ bigint: 123456789n });
  });

  test('should decode badly encoded input', () => {
    expect(JSON.parse(`{"bad":"${specialBegin}Foobie:Bletch${specialFinish}"}`, reviver)).toEqual({
      bad: `${specialBegin}Foobie:Bletch${specialFinish}`,
    });
  });

  test('should decode badly encoded regexp', () => {
    expect(JSON.parse(`{"bad":"${specialBegin}RegExp:Bletch${specialFinish}"}`, reviver)).toEqual({
      bad: /Bletch/v,
    });
  });
});
