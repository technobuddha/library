/* eslint-disable no-bitwise */

import { HashBase } from './hash-base.ts';

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function int32(x: number): number {
  // eslint-disable-next-line unicorn/prefer-math-trunc
  return x | 0;
}

function ch(x: number, y: number, z: number): number {
  return z ^ (x & (y ^ z));
}

function maj(x: number, y: number, z: number): number {
  return (x & y) | (z & (x | y));
}

function sigma0(x: number): number {
  return ((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^ ((x >>> 22) | (x << 10));
}

function sigma1(x: number): number {
  return ((x >>> 6) | (x << 26)) ^ ((x >>> 11) | (x << 21)) ^ ((x >>> 25) | (x << 7));
}

function gamma0(x: number): number {
  return ((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3);
}

function gamma1(x: number): number {
  return ((x >>> 17) | (x << 15)) ^ ((x >>> 19) | (x << 13)) ^ (x >>> 10);
}

/**
 * Secure Hash Algorithm, SHA2 SHA-256
 * @group Crypto
 * @category Hash
 */
export class Sha256 extends HashBase {
  private a = 0x6a09e667;
  private b = 0xbb67ae85;
  private c = 0x3c6ef372;
  private d = 0xa54ff53a;
  private e = 0x510e527f;
  private f = 0x9b05688c;
  private g = 0x1f83d9ab;
  private h = 0x5be0cd19;
  private readonly w: number[];

  public constructor() {
    super(64, 56);
    this.w = Array.from({ length: 64 });
  }

  protected override updateCounters(buffer: Uint8Array): void {
    const { w } = this;
    let a = int32(this.a);
    let b = int32(this.b);
    let c = int32(this.c);
    let d = int32(this.d);
    let e = int32(this.e);
    let f = int32(this.f);
    let g = int32(this.g);
    let h = int32(this.h);

    let i: number;
    for (i = 0; i < 16; ++i) {
      w[i] =
        (buffer[i * 4 + 0] << 24) |
        (buffer[i * 4 + 1] << 16) |
        (buffer[i * 4 + 2] << 8) |
        buffer[i * 4 + 3];
    }
    for (; i < 64; ++i) {
      w[i] = int32(gamma1(w[i - 2]) + w[i - 7] + gamma0(w[i - 15]) + w[i - 16]);
    }

    for (let j = 0; j < 64; ++j) {
      const T1 = int32(h + sigma1(e) + ch(e, f, g) + int32(K[j]) + w[j]);
      const T2 = int32(sigma0(a) + maj(a, b, c));

      h = g;
      g = f;
      f = e;
      e = int32(d + T1);
      d = c;
      c = b;
      b = a;
      a = int32(T1 + T2);
    }

    this.a = int32(a + this.a);
    this.b = int32(b + this.b);
    this.c = int32(c + this.c);
    this.d = int32(d + this.d);
    this.e = int32(e + this.e);
    this.f = int32(f + this.f);
    this.g = int32(g + this.g);
    this.h = int32(h + this.h);
  }

  protected override hash(): Uint8Array {
    return new Uint8Array([
      (this.a & 0xff000000) >> 24,
      (this.a & 0x00ff0000) >> 16,
      (this.a & 0x0000ff00) >> 8,
      this.a & 0x000000ff,
      (this.b & 0xff000000) >> 24,
      (this.b & 0x00ff0000) >> 16,
      (this.b & 0x0000ff00) >> 8,
      this.b & 0x000000ff,
      (this.c & 0xff000000) >> 24,
      (this.c & 0x00ff0000) >> 16,
      (this.c & 0x0000ff00) >> 8,
      this.c & 0x000000ff,
      (this.d & 0xff000000) >> 24,
      (this.d & 0x00ff0000) >> 16,
      (this.d & 0x0000ff00) >> 8,
      this.d & 0x000000ff,
      (this.e & 0xff000000) >> 24,
      (this.e & 0x00ff0000) >> 16,
      (this.e & 0x0000ff00) >> 8,
      this.e & 0x000000ff,
      (this.f & 0xff000000) >> 24,
      (this.f & 0x00ff0000) >> 16,
      (this.f & 0x0000ff00) >> 8,
      this.f & 0x000000ff,
      (this.g & 0xff000000) >> 24,
      (this.g & 0x00ff0000) >> 16,
      (this.g & 0x0000ff00) >> 8,
      this.g & 0x000000ff,
      (this.h & 0xff000000) >> 24,
      (this.h & 0x00ff0000) >> 16,
      (this.h & 0x0000ff00) >> 8,
      this.h & 0x000000ff,
    ]);
  }
}
