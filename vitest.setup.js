import matchers from 'jest-extended';
import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import { expect } from 'vitest';

expect.extend(matchers);
expect.extend({ toBeDeepCloseTo, toMatchCloseTo });
