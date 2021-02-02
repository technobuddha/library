import expect, { Matchers } from 'expect';
import { Expect/*, AsymmetricMatcher, MatcherState, ExpectedAssertionsErrors*/ }           from 'expect/build/types';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

export type Simplify<T> = {[KeyType in keyof T]: T[KeyType]};

type ExtendedMatchers<R> = Matchers<R> & {
    toBeDeepCloseTo(x: unknown): R;
    toMatchCloseTo(x: unknown): R;
}

type ExtendedExpect = { [K in keyof Expect]: keyof Expect } & {
    <T = unknown>(actual: T): ExtendedMatchers<T>;
    // addSnapshotSerializer(arg0: any): void;
    // assertions(arg0: number): void;
    // extend(arg0: any): void;
    // extractExpectedAssertionsErrors: () => ExpectedAssertionsErrors;
    // getState(): MatcherState;
    // hasAssertions(): void;
    // setState(state: Partial<MatcherState>): void;
    // any(expectedObject: any): AsymmetricMatcher;
    // anything(): AsymmetricMatcher;
    // arrayContaining(sample: Array<unknown>): AsymmetricMatcher;
    // objectContaining(sample: Record<string, unknown>): AsymmetricMatcher;
    // stringContaining(expected: string): AsymmetricMatcher;
    // stringMatching(expected: string | RegExp): AsymmetricMatcher;
    // [id: string]: AsymmetricMatcher;
    // not: {
    //     [id: string]: AsymmetricMatcher;
    // };
};

const extendedExpect = expect as any as ExtendedExpect;

export default extendedExpect;
