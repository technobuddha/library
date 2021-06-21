import expect                               from 'expect';
import { toBeDeepCloseTo, toMatchCloseTo }  from 'jest-matcher-deep-close-to';

import type { Expect }   from 'expect/build/types';
import type { Matchers } from 'expect';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

export type Simplify<T> = {[KeyType in keyof T]: T[KeyType] };

type ExtendedMatchers<R> = Matchers<R> & {
    toBeDeepCloseTo: (x: unknown) => R;
    toMatchCloseTo:  (x: unknown) => R;
};

type ExtendedExpect = {[K in keyof Expect]: keyof Expect } & (<T = unknown>(actual: T) => ExtendedMatchers<T>);

const extendedExpect = expect as any as ExtendedExpect;

export default extendedExpect;
