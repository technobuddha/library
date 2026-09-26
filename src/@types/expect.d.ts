// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
import { type JestExtended, type JestMatcherDeepCloseTo } from '@technobuddha/project';

declare module '@vitest/expect' {
  interface Assertion<R extends void | Promise<void> = void | Promise<void>, T = unknown> {
    toBeTrue(): R;
    toBeFalse(): R;
  }
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown>
    extends JestExtended<T>, JestMatcherDeepCloseTo<T> {
    toBeTrue(): R;
    toBeFalse(): R;
  }
  interface AsymmetricMatchersContaining extends JestExtended, JestMatcherDeepCloseTo {}
  interface ExpectStatic extends JestExtended, JestMatcherDeepCloseTo {}
}

declare module 'vitest' {
  interface Assertion<R extends void | Promise<void> = void | Promise<void>, T = unknown> {
    toBeTrue(): R;
    toBeFalse(): R;
  }
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown>
    extends JestExtended<T>, JestMatcherDeepCloseTo<T> {
    toBeTrue(): R;
    toBeFalse(): R;
  }
  interface AsymmetricMatchersContaining extends JestExtended, JestMatcherDeepCloseTo {}
  interface ExpectStatic extends JestExtended, JestMatcherDeepCloseTo {}
}
