import expect     from '@util/expect';
import graphQL    from '../src/graphQL';

describe(
    'graphQL',
    () => {
        test(
            'should output numbers',
            () => {
                expect(graphQL(1234)).toBe('1234');
            }
        );

        test(
            'should output strings',
            () => {
                expect(graphQL('hello')).toBe('"hello"');
            }
        );

        test(
            'should output booleans',
            () => {
                expect(graphQL(true)).toBe('true');
                expect(graphQL(false)).toBe('false');
            }
        );

        test(
            'should output nulls',
            () => {
                expect(graphQL(null)).toBe('null');
            }
        );

        test(
            'should output arrays',
            () => {
                expect(graphQL([ 1, 'hello', true, null ])).toBe('[ 1, "hello", true, null ]');
            }
        );

        test(
            'should output objects',
            () => {
                expect(graphQL({ a: 1, b: 'hello', c: true, d: null })).toBe('{ a: 1, b: "hello", c: true, d: null }');
            }
        );

        test(
            'should output nested objects',
            () => {
                expect(graphQL({ a: [{ b: { c: []}}]})).toBe('{ a: [ { b: { c: [  ] } } ] }');
            }
        );

        test(
            'should escape strings',
            () => {
                expect(graphQL('\b\f\n\r\t\\"/')).toBe('"\\b\\f\\n\\r\\t\\\\\\"\\/"');
            }
        );

        test(
            'should work with templates',
            () => {
                expect(
                    graphQL`
                    query { ${1} }
                    query { ${'hello'} }
                    query { ${true} }
                    query { ${null} }
                    query { ${[ 1, 2, 3 ]} }
                    query { ${{ a: 1, b: 2, c: 3 }} }
                    `
                ).toBe('query { 1 } query { "hello" } query { true } query { null } query { [ 1, 2, 3 ] } query { { a: 1, b: 2, c: 3 } }');
            }
        );
    }
);
