/* eslint-disable no-bitwise */
/*!
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */
import { HashBase } from './hash-base.js';

function rotl1(num: number): number {
  return (num << 1) | (num >>> 31);
}

function rotl5(num: number): number {
  return (num << 5) | (num >>> 27);
}

function rotl30(num: number): number {
  return (num << 30) | (num >>> 2);
}

function ft(s: number, b: number, c: number, d: number): number {
  if (s === 0) {
    return (b & c) | (~b & d);
  }
  if (s === 2) {
    return (b & c) | (b & d) | (c & d);
  }
  return b ^ c ^ d;
}

const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];

function int32(x: number): number {
  // eslint-disable-next-line unicorn/prefer-math-trunc
  return x | 0;
}

/**
 * Secure Hash Algorithm, SHA-1
 * @group Crypto
 * @category SHA1
 */
export class Sha1 extends HashBase {
  private a = 0x67452301;
  private b = 0xefcdab89;
  private c = 0x98badcfe;
  private d = 0x10325476;
  private e = 0xc3d2e1f0;
  private readonly w: number[];

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
      w[i] = rotl1(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
    }

    for (let j = 0; j < 80; ++j) {
      const s = int32(j / 20);
      const t = int32(rotl5(a) + ft(s, b, c, d) + e + w[j] + int32(K[s]));

      e = d;
      d = c;
      c = rotl30(b);
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
