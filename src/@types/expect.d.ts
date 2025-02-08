//import type CustomMatchers from 'jest-extended';
import type JE from 'jest-extended';
import type JMDCT from 'jest-matcher-deep-close-to';

declare module 'vitest' {
  interface Assertion<T = unknown> extends JE<T>, JMDCT<T> {
    /**/
  }
  interface AsymmetricMatchersContaining<T = unknown> extends JE<T>, JMDCT<T> {}
  interface ExpectStatic extends JE, JMDCT {}
}

export {};
