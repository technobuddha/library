import { withIndex } from '../array/with-index.ts';

export const charToInteger: Record<string, number> = {};
export const integerToChar: Record<number, string> = {};

for (const [char, index] of withIndex(
  // eslint-disable-next-line no-secrets/no-secrets
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
)) {
  charToInteger[char] = index;
  integerToChar[index] = char;
}
