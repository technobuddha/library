/* eslint-disable unicorn/consistent-destructuring */

import { U32 } from '../binary/u32.ts';

import { ShaBase } from './sha-base.ts';

/**
 * The SHA-256 round constants.
 *
 * These 64 constant 32-bit words are used in each round of the SHA-256 hash computation.
 * They are derived from the fractional parts of the cube roots of the first 64 prime numbers.
 * @see [FIPS PUB 180-4: Secure Hash Standard (SHS)](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)
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
 * Secure Hash Algorithm, SHA2 SHA-256
 * @example
 * ```typescript
 * const sha256 = new Sha256();
 * sha256.update('hello world', 'utf-8');
 * sha256.digest('hex');
 * // 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
 * ```
 * ```typescript
 * const sha256 = new Sha256();
 * sha256.update(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
 * sha256.digest('hex');
 * // 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
 * ```
 * @group Hash
 * @category SHA
 */
export class Sha256 extends ShaBase {
  private a = new U32(0x6a09e667);
  private b = new U32(0xbb67ae85);
  private c = new U32(0x3c6ef372);
  private d = new U32(0xa54ff53a);
  private e = new U32(0x510e527f);
  private f = new U32(0x9b05688c);
  private g = new U32(0x1f83d9ab);
  private h = new U32(0x5be0cd19);
  private readonly w: U32[];

  /**
   * Creates a new SHA-256 hash instance and initializes its internal state.
   *
   * @remarks
   * The internal state variables are set to the initial SHA-256 constants as specified
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
      const T1 = h.add(e.sigma1()).add(e.ch(f, g)).add(K[j]).add(w[j]);
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
      ...this.h.toBytes(),
    ]);
  }
}
