/* eslint-disable no-bitwise */
//cspell:words Kepert Ydnar Lostinet

/*!
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See [MD5](https://pajhome.org.uk/crypt/md5) for details.
 */

import { int32 } from './int32.ts';
import { rotl } from './rotl.ts';
import { ShaBase } from './sha-base.ts';

/**
 * SHA-1 auxiliary function `ft` used in the main loop of the SHA-1 hash algorithm.
 *
 * Depending on the value of `s`, this function computes one of three logical functions
 * used in different rounds of SHA-1:
 * - If `s === 0`: Returns the result of the "choose" function: (b & c) | (~b & d)
 * - If `s === 2`: Returns the result of the "majority" function: (b & c) | (b & d) | (c & d)
 * - Otherwise: Returns the result of the "Comparison" function: b ^ c ^ d
 * @param s - The round selector (typically 0, 1, 2, or 3) determining which logical function to use.
 * @param b - The first 32-bit integer input.
 * @param c - The second 32-bit integer input.
 * @param d - The third 32-bit integer input.
 * @returns The result of the selected logical function as a 32-bit integer.
 * @internal
 */
function ft(s: number, b: number, c: number, d: number): number {
  if (s === 0) {
    return (b & c) | (~b & d);
  }
  if (s === 2) {
    return (b & c) | (b & d) | (c & d);
  }
  return b ^ c ^ d;
}

/**
 * SHA-1 round constants.
 *
 * These are the four constant values used in the SHA-1 hash algorithm,
 * one for each of the four main rounds of the compression function.
 * @see {@link https://en.wikipedia.org/wiki/SHA-1#SHA-1_pseudocode}
 * @internal
 */
const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];

/**
 * Secure Hash Algorithm, SHA-1
 * @example
 * ```typescript
 * const sha1 = new Sha1();
 * sha1.update('hello world', 'utf8');
 * sha1.digest('hex');
 * // '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed'
 * ```
 * ```typescript
 * const sha1 = new Sha1();
 * sha1.update(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
 * sha1.digest('hex');
 * // '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed'
 * ```
 * @group Encoding
 * @category Hash
 */
export class Sha1 extends ShaBase {
  private a = 0x67452301;
  private b = 0xefcdab89;
  private c = 0x98badcfe;
  private d = 0x10325476;
  private e = 0xc3d2e1f0;
  private readonly w: number[];

  /**
   * Creates a new SHA-1 hash instance and initializes its internal state.
   *
   * @remarks
   * The internal state variables are set to the initial SHA-1 constants as specified
   * in FIPS PUB 180-1. Use {@link update} to process data and {@link digest} to retrieve the
   * final hash value.
   */
  public constructor() {
    super(64, 56);
    this.w = Array.from({ length: 80 });
  }

  protected updateCounters(buffer: Uint8Array): void {
    const { w } = this;
    let a = int32(this.a);
    let b = int32(this.b);
    let c = int32(this.c);
    let d = int32(this.d);
    let e = int32(this.e);

    let i;
    for (i = 0; i < 16; ++i) {
      w[i] = int32(
        (buffer[i * 4 + 0] << 24) |
          (buffer[i * 4 + 1] << 16) |
          (buffer[i * 4 + 2] << 8) |
          buffer[i * 4 + 3],
      );
    }
    for (; i < 80; ++i) {
      w[i] = rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
    }

    for (let j = 0; j < 80; ++j) {
      const s = int32(j / 20);
      const t = int32(rotl(a, 5) + ft(s, b, c, d) + e + w[j] + int32(K[s]));

      e = d;
      d = c;
      c = rotl(b, 30);
      b = a;
      a = t;
    }

    this.a = int32(a + this.a);
    this.b = int32(b + this.b);
    this.c = int32(c + this.c);
    this.d = int32(d + this.d);
    this.e = int32(e + this.e);
  }

  protected hash(): Uint8Array {
    return new Uint8Array([
      (this.a & 0xff000000) >>> 24,
      (this.a & 0x00ff0000) >>> 16,
      (this.a & 0x0000ff00) >>> 8,
      this.a & 0x000000ff,
      (this.b & 0xff000000) >>> 24,
      (this.b & 0x00ff0000) >>> 16,
      (this.b & 0x0000ff00) >>> 8,
      this.b & 0x000000ff,
      (this.c & 0xff000000) >>> 24,
      (this.c & 0x00ff0000) >>> 16,
      (this.c & 0x0000ff00) >>> 8,
      this.c & 0x000000ff,
      (this.d & 0xff000000) >>> 24,
      (this.d & 0x00ff0000) >>> 16,
      (this.d & 0x0000ff00) >>> 8,
      this.d & 0x000000ff,
      (this.e & 0xff000000) >>> 24,
      (this.e & 0x00ff0000) >>> 16,
      (this.e & 0x0000ff00) >>> 8,
      this.e & 0x000000ff,
    ]);
  }
}
