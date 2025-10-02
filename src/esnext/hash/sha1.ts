/* eslint-disable unicorn/consistent-destructuring */
//cspell:words Kepert Ydnar Lostinet

/*!
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See [MD5](https://pajhome.org.uk/crypt/md5) for details.
 */

import { U32 } from '../binary/u32.ts';
import { toInteger } from '../number/to-integer.ts';

import { ShaBase } from './sha-base.ts';

/**
 * SHA-1 round constants.
 *
 * These are the four constant values used in the SHA-1 hash algorithm,
 * one for each of the four main rounds of the compression function.
 * @see {@link https://en.wikipedia.org/wiki/SHA-1#SHA-1_pseudocode}
 * @internal
 */
const K: U32[] = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6].map((k) => new U32(k));

/**
 * Secure Hash Algorithm, SHA-1
 * @example
 * ```typescript
 * const sha1 = new Sha1();
 * sha1.update('hello world', 'utf-8');
 * sha1.digest('hex');
 * // '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed'
 * ```
 * ```typescript
 * const sha1 = new Sha1();
 * sha1.update(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
 * sha1.digest('hex');
 * // '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed'
 * ```
 * @group Hash
 * @category SHA
 */
export class Sha1 extends ShaBase {
  private a = new U32(0x67452301);
  private b = new U32(0xefcdab89);
  private c = new U32(0x98badcfe);
  private d = new U32(0x010325476);
  private e = new U32(0xc3d2e1f0);
  private readonly w: U32[];

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
    let { a, b, c, d, e } = this;

    for (let i = 0; i < 16; ++i) {
      w[i] = U32.fromBytes(buffer, i);
    }

    for (let i = 16; i < 80; ++i) {
      w[i] = w[i - 3]
        .xor(w[i - 8])
        .xor(w[i - 14])
        .xor(w[i - 16])
        .rotl(1);
    }

    for (let j = 0; j < 80; ++j) {
      const s = toInteger(j / 20);

      let t = a.rotl(5);
      if (s === 0) {
        t = t.add(b.and(c).or(b.not().and(d)));
      } else if (s === 2) {
        t = t.add(b.and(c).or(b.and(d)).or(c.and(d)));
      } else {
        t = t.add(b.xor(c).xor(d));
      }
      t = t.add(e).add(w[j]).add(K[s]);

      e = d;
      d = c;
      c = b.rotl(30);
      b = a;
      a = t;
    }

    this.a = a.add(this.a);
    this.b = b.add(this.b);
    this.c = c.add(this.c);
    this.d = d.add(this.d);
    this.e = e.add(this.e);
  }

  protected hash(): Uint8Array {
    return new Uint8Array([
      ...this.a.toBytes(),
      ...this.b.toBytes(),
      ...this.c.toBytes(),
      ...this.d.toBytes(),
      ...this.e.toBytes(),
    ]);
  }
}
