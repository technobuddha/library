/* eslint-disable unicorn/consistent-destructuring */
import { U32 } from '../binary/u32.ts';

import { ShaBase } from './sha-base.ts';

/**
 * Constants used in the SHA-224 and SHA-256 cryptographic hash functions.
 *
 * These 32-bit integer values are the first 32 bits of the fractional parts of the cube roots of the first 64 prime numbers.
 * They are used as round constants in the main compression function of the SHA-2 family of algorithms.
 * @see [FIPS PUB 180-4, Section 4.2.2](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)
 * @internal
 */
const K: U32[] = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
].map((k) => new U32(k));

/**
 * Secure Hash Algorithm, SHA2 SHA-224
 * @example
 * ```typescript
 * const sha224 = new Sha224();
 * sha224.update('hello world', 'utf-8');
 * sha224.digest('hex');
 * // '23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7'
 * ```
 * ```typescript
 * const sha224 = new Sha224();
 * sha224.update(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
 * sha224.digest('hex');
 * // '23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7'
 * ```
 * @group Hash
 * @category SHA
 */
export class Sha224 extends ShaBase {
  private a = new U32(0xc1059ed8);
  private b = new U32(0x367cd507);
  private c = new U32(0x3070dd17);
  private d = new U32(0xf70e5939);
  private e = new U32(0xffc00b31);
  private f = new U32(0x68581511);
  private g = new U32(0x64f98fa7);
  private h = new U32(0xbefa4fa4);
  private readonly w: U32[];

  /**
   * Creates a new SHA-224 hash instance and initializes its internal state.
   *
   * @remarks
   * The internal state variables are set to the initial SHA-224 constants as specified
   * in FIPS PUB 180-4. Use {@link update} to process data and {@link digest} to retrieve the hash.
   */
  public constructor() {
    super(64, 56);
    this.w = Array.from({ length: 64 });
  }

  protected override updateCounters(buffer: Uint8Array): void {
    const { w } = this;
    let { a, b, c, d, e, f, g, h } = this;

    for (let i = 0; i < 16; ++i) {
      w[i] = U32.fromBytes(buffer, i);
    }
    for (let i = 16; i < 64; ++i) {
      w[i] = w[i - 2]
        .gamma1()
        .add(w[i - 7])
        .add(w[i - 15].gamma0())
        .add(w[i - 16]);
    }

    for (let j = 0; j < 64; ++j) {
      const T1 = h.add(e.sigma1().add(e.ch(f, g)).add(K[j]).add(w[j]));
      const T2 = a.sigma0().add(a.maj(b, c));

      h = g;
      g = f;
      f = e;
      e = d.add(T1);
      d = c;
      c = b;
      b = a;
      a = T1.add(T2);
    }

    this.a = a.add(this.a);
    this.b = b.add(this.b);
    this.c = c.add(this.c);
    this.d = d.add(this.d);
    this.e = e.add(this.e);
    this.f = f.add(this.f);
    this.g = g.add(this.g);
    this.h = h.add(this.h);
  }

  protected override hash(): Uint8Array {
    return new Uint8Array([
      ...this.a.toBytes(),
      ...this.b.toBytes(),
      ...this.c.toBytes(),
      ...this.d.toBytes(),
      ...this.e.toBytes(),
      ...this.f.toBytes(),
      ...this.g.toBytes(),
    ]);
  }
}
