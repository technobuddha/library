import expect from '@util/expect';
import { replacer, reviver, specialBegin, specialFinish } from '../src/json';

describe(
    'clearObject',
    () => {
        describe(
            'replacer',
            () => {
                test(
                    'should encode dates',
                    () => {
                        const now = new Date();

                        expect(JSON.stringify({ date: now }, replacer)).toBe(`{"date":"${specialBegin}Date:${now.toISOString()}${specialFinish}"}`);
                    }
                );

                test(
                    'should encode Regexps',
                    () => {
                        expect(JSON.stringify({ regexp: /abc/giu }, replacer)).toBe(`{"regexp":"${specialBegin}RegExp:/abc/giu${specialFinish}"}`);
                    }
                );

                test(
                    'should encode numbers',
                    () => {
                        expect(JSON.stringify({ number: Number.NaN }, replacer)).toBe(`{"number":"${specialBegin}Number:NaN${specialFinish}"}`);
                        expect(JSON.stringify({ number: Infinity }, replacer)).toBe(`{"number":"${specialBegin}Number:Infinity${specialFinish}"}`);
                        expect(JSON.stringify({ number: -Infinity }, replacer)).toBe(`{"number":"${specialBegin}Number:-Infinity${specialFinish}"}`);
                    }
                );

                test(
                    'should encode bigint',
                    () => {
                        expect(JSON.stringify({ bigint: BigInt('123456789') }, replacer)).toBe(`{"bigint":"${specialBegin}BigInt:123456789${specialFinish}"}`);
                    }
                );
            }
        );

        describe(
            'reviver',
            () => {
                test(
                    'should decode dates',
                    () => {
                        const now = new Date();

                        expect(JSON.parse(`{"date":"${specialBegin}Date:${now.toISOString()}${specialFinish}"}`, reviver)).toEqual({ date: now });
                    }
                );

                test(
                    'should decode Regexps',
                    () => {
                        expect(JSON.parse(`{"regexp":"${specialBegin}RegExp:/abc/giu${specialFinish}"}`,  reviver)).toEqual({ regexp: /abc/giu });
                    }
                );

                test(
                    'should decode numbers',
                    () => {
                        expect(JSON.parse(`{"number":"${specialBegin}Number:NaN${specialFinish}"}`, reviver)).toEqual({ number: Number.NaN });
                        expect(JSON.parse(`{"number":"${specialBegin}Number:Infinity${specialFinish}"}`, reviver)).toEqual({ number: Infinity });
                        expect(JSON.parse(`{"number":"${specialBegin}Number:-Infinity${specialFinish}"}`, reviver)).toEqual({ number: -Infinity });
                    }
                );

                test(
                    'should decode bigint',
                    () => {
                        expect(JSON.parse(`{"bigint":"${specialBegin}BigInt:123456789${specialFinish}"}`, reviver)).toEqual({ bigint: BigInt('123456789') });
                    }
                );

                test(
                    'should decode badly encoded input',
                    () => {
                        expect(JSON.parse(`{"bad":"${specialBegin}Foobie:Bletch${specialFinish}"}`, reviver)).toEqual({ bad: `${specialBegin}Foobie:Bletch${specialFinish}` });
                    }
                );

                test(
                    'should decode badly encoded regexp',
                    () => {
                        expect(JSON.parse(`{"bad":"${specialBegin}RegExp:Bletch${specialFinish}"}`, reviver)).toEqual({ bad: /Bletch/u });
                    }
                );
            }
        );
    }
);
