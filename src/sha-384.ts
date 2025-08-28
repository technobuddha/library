/* eslint-disable no-bitwise */
// cspell:ignore majh majl

import { ShaBase } from './sha-base.ts';

/**
 * The SHA-384 round constants array, `K`, used in the SHA-384 cryptographic hash function.
 * Each pair of 32-bit integers represents a 64-bit constant, as specified by the FIPS 180-4 standard.
 * These constants are used during the message schedule and compression function rounds.
 * @see [FIPS 180-4: Secure Hash Standard (SHS)](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)
 * @internal
 */
const K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817,
];

/**
 * Converts a given number to a 32-bit signed integer using bitwise OR.
 * @param x - The number to convert.
 * @returns The 32-bit signed integer representation of the input.
 * @internal
 */
function int32(x: number): number {
  // eslint-disable-next-line unicorn/prefer-math-trunc
  return x | 0;
}

/**
 * Computes the SHA-384 'choose' (Ch) function.
 *
 * The function selects bits from `y` or `z` based on the value of `x`.
 * For each bit position, if the corresponding bit in `x` is 1, the result is the bit from `y`; otherwise, it is the bit from `z`.
 *
 * Mathematically: Ch(x, y, z) = (x & y) ^ (~x & z)
 * @param x - The selector value.
 * @param y - The first input value.
 * @param z - The second input value.
 * @returns The result of the choose function.
 * @internal
 */
function çh(x: number, y: number, z: number): number {
  return z ^ (x & (y ^ z));
}

/**
 * Computes the majority function of three 32-bit numbers.
 *
 * For each bit position, the result is the value that appears in at least two of the inputs.
 * This function is commonly used in cryptographic hash algorithms such as SHA-2.
 * @param x - The first 32-bit number.
 * @param y - The second 32-bit number.
 * @param z - The third 32-bit number.
 * @returns The majority value for each bit position among `x`, `y`, and `z`.
 * @internal
 */
function maj(x: number, y: number, z: number): number {
  return (x & y) | (z & (x | y));
}

/**
 * Computes the SHA-384 σ₀ (sigma0) function on a 64-bit value represented by two 32-bit numbers.
 *
 * This function performs bitwise operations (rotations and shifts) as specified in the SHA-384 algorithm.
 * The input is split into two 32-bit parts: `x` (high) and `xl` (low).
 * @param x - The high 32 bits of the 64-bit input value.
 * @param xl - The low 32 bits of the 64-bit input value.
 * @returns The result of the σ₀ function as a 32-bit integer.
 * @internal
 */
function sigma0(x: number, xl: number): number {
  return ((x >>> 28) | (xl << 4)) ^ ((xl >>> 2) | (x << 30)) ^ ((xl >>> 7) | (x << 25));
}

/**
 * Computes the SHA-384 σ₁ (sigma1) function on a 64-bit value represented by two 32-bit numbers.
 *
 * This function performs bitwise rotations and shifts according to the SHA-384 specification:
 *   σ₁(x) = ROTR^14(x) ⊕ ROTR^18(x) ⊕ ROTR^41(x)
 * where `x` is a 64-bit value split into high (`x`) and low (`xl`) 32-bit parts.
 * @param x - The high 32 bits of the 64-bit input value.
 * @param xl - The low 32 bits of the 64-bit input value.
 * @returns The result of the σ₁ function as a 32-bit number.
 * @internal
 */
function sigma1(x: number, xl: number): number {
  return ((x >>> 14) | (xl << 18)) ^ ((x >>> 18) | (xl << 14)) ^ ((xl >>> 9) | (x << 23));
}

/**
 * Computes the SHA-384 specific γ₀ (gamma0) function on a 64-bit value represented by two 32-bit numbers.
 *
 * This function performs bitwise operations as defined in the SHA-384 specification:
 *   γ₀(x) = (x \>\>\> 1 | x \<\< 63) ^ (x \>\>\> 8 | x \<\< 56) ^ (x \>\>\> 7)
 * Here, `x` is split into two 32-bit parts: `x` (high) and `xl` (low).
 * @param x - The high 32 bits of the 64-bit input value.
 * @param xl - The low 32 bits of the 64-bit input value.
 * @returns The result of the γ₀ function as a 32-bit integer.
 * @internal
 */
function gamma0(x: number, xl: number): number {
  return ((x >>> 1) | (xl << 31)) ^ ((x >>> 8) | (xl << 24)) ^ (x >>> 7);
}

/**
 * Computes the SHA-384/SHA-512-specific Gamma0 function for 64-bit words, split into high (`x`) and low (`xl`) 32-bit parts.
 *
 * This function performs bitwise right rotations and shifts on the input values and combines them using XOR,
 * as specified in the SHA-384/SHA-512 hash algorithm.
 * @param x - The high 32 bits of the 64-bit word.
 * @param xl - The low 32 bits of the 64-bit word.
 * @returns The result of the Gamma0 function as a 32-bit integer.
 * @internal
 */
function gamma0l(x: number, xl: number): number {
  return ((x >>> 1) | (xl << 31)) ^ ((x >>> 8) | (xl << 24)) ^ ((x >>> 7) | (xl << 25));
}

/**
 * Computes the SHA-384 specific Gamma1 function on a 64-bit value represented by two 32-bit numbers.
 *
 * This function applies bitwise rotation and shift operations as defined in the SHA-384 specification.
 * The input is split into high (`x`) and low (`xl`) 32-bit words of a 64-bit integer.
 * @param x - The high 32 bits of the 64-bit input value.
 * @param xl - The low 32 bits of the 64-bit input value.
 * @returns The result of the Gamma1 function as a 32-bit integer.
 * @internal
 */
function gamma1(x: number, xl: number): number {
  return ((x >>> 19) | (xl << 13)) ^ ((xl >>> 29) | (x << 3)) ^ (x >>> 6);
}

/**
 * Computes the SHA-384/SHA-512 specific "gamma1l" bitwise transformation on a 64-bit value
 * represented by its high (`x`) and low (`xl`) 32-bit parts.
 *
 * This function performs a combination of right rotations and shifts, as specified in the
 * SHA-384/SHA-512 algorithm, to produce the "gamma1" value for the lower 32 bits.
 * @param x - The high 32 bits of the 64-bit input value.
 * @param xl - The low 32 bits of the 64-bit input value.
 * @returns The result of the gamma1l transformation on the input value.
 * @internal
 */
function gamma1l(x: number, xl: number): number {
  return ((x >>> 19) | (xl << 13)) ^ ((xl >>> 29) | (x << 3)) ^ ((x >>> 6) | (xl << 26));
}

/**
 * Calculates the carry bit resulting from the addition of two unsigned 32-bit integers.
 * @param a - The first unsigned 32-bit integer operand.
 * @param b - The second unsigned 32-bit integer operand.
 * @returns 1 if adding `a` and `b` would result in an unsigned overflow (carry), otherwise 0.
 * @internal
 */
function getCarry(a: number, b: number): number {
  return a >>> 0 < b >>> 0 ? 1 : 0;
}

/**
 * Secure Hash Algorithm, SHA2 SHA-384
 * @example
 * ```typescript
 * const sha384 = new Sha384();
 * sha384.update('hello world', 'utf8');
 * sha384.digest('hex');
 * // 'fdbd8e75a67f29f701a4e040385e2e23986303ea10239211af907fcbb83578b3e417cb71ce646efd0819dd8c088de1bd'
 * ```
 * ```typescript
 * const sha384 = new Sha384();
 * sha384.update(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
 * sha384.digest('hex');
 * // 'fdbd8e75a67f29f701a4e040385e2e23986303ea10239211af907fcbb83578b3e417cb71ce646efd0819dd8c088de1bd'
 * ```
 * @group Encoding
 * @category Hash
 */
export class Sha384 extends ShaBase {
  private ah = 0xcbbb9d5d;
  private bh = 0x629a292a;
  private ch = 0x9159015a;
  private dh = 0x152fecd8;
  private eh = 0x67332667;
  private fh = 0x8eb44a87;
  private gh = 0xdb0c2e0d;
  private hh = 0x47b5481d;

  private al = 0xc1059ed8;
  private bl = 0x367cd507;
  private cl = 0x3070dd17;
  private dl = 0xf70e5939;
  private el = 0xffc00b31;
  private fl = 0x68581511;
  private gl = 0x64f98fa7;
  private hl = 0xbefa4fa4;
  private readonly w: number[];

  /**
   * Creates a new SHA-384 hash instance and initializes its internal state.
   *
   * @remarks
   * The internal state variables are set to the initial SHA-384 constants as specified
   * in FIPS PUB 180-4. Use {@link update} to process data and {@link digest} to retrieve the hash.
   */
  public constructor() {
    super(128, 112);
    this.w = Array.from({ length: 160 });
  }

  protected override updateCounters(buffer: Uint8Array): void {
    const { w } = this;
    let ah = int32(this.ah);
    let bh = int32(this.bh);
    let ch = int32(this.ch);
    let dh = int32(this.dh);
    let eh = int32(this.eh);
    let fh = int32(this.fh);
    let gh = int32(this.gh);
    let hh = int32(this.hh);
    let al = int32(this.al);
    let bl = int32(this.bl);
    let cl = int32(this.cl);
    let dl = int32(this.dl);
    let el = int32(this.el);
    let fl = int32(this.fl);
    let gl = int32(this.gl);
    let hl = int32(this.hl);

    let i: number;
    for (i = 0; i < 32; i += 2) {
      w[i] =
        (buffer[i * 4 + 0] << 24) |
        (buffer[i * 4 + 1] << 16) |
        (buffer[i * 4 + 2] << 8) |
        buffer[i * 4 + 3];
      w[i + 1] =
        (buffer[i * 4 + 4] << 24) |
        (buffer[i * 4 + 5] << 16) |
        (buffer[i * 4 + 6] << 8) |
        buffer[i * 4 + 7];
    }

    let wil: number;
    let wih: number;
    for (; i < 160; i += 2) {
      let xh = w[i - 15 * 2];
      let xl = w[i - 15 * 2 + 1];
      const gama0 = gamma0(xh, xl);
      const gama0l = gamma0l(xl, xh);

      xh = w[i - 2 * 2];
      xl = w[i - 2 * 2 + 1];
      const gama1 = gamma1(xh, xl);
      const gama1l = gamma1l(xl, xh);

      const wi7h = w[i - 7 * 2];
      const wi7l = w[i - 7 * 2 + 1];

      const wi16h = w[i - 16 * 2];
      const wi16l = w[i - 16 * 2 + 1];

      wil = int32(gama0l + wi7l);
      wih = int32(gama0 + wi7h + getCarry(wil, gama0l));
      wil = int32(wil + gama1l);
      wih = int32(wih + gama1 + getCarry(wil, gama1l));
      wil = int32(wil + wi16l);
      wih = int32(wih + wi16h + getCarry(wil, wi16l));

      w[i] = wih;
      w[i + 1] = wil;
    }

    for (let j = 0; j < 160; j += 2) {
      wih = w[j];
      wil = w[j + 1];

      const majh = maj(ah, bh, ch);
      const majl = maj(al, bl, cl);

      const sigma0h = sigma0(ah, al);
      const sigma0l = sigma0(al, ah);
      const sigma1h = sigma1(eh, el);
      const sigma1l = sigma1(el, eh);

      const kih = K[j];
      const kil = K[j + 1];

      const chh = çh(eh, fh, gh);
      const chl = çh(el, fl, gl);

      let t1l = int32(hl + sigma1l);
      let t1h = int32(hh + sigma1h + getCarry(t1l, hl));
      t1l = int32(t1l + chl);
      t1h = int32(t1h + chh + getCarry(t1l, chl));
      t1l = int32(t1l + kil);
      t1h = int32(t1h + kih + getCarry(t1l, kil));
      t1l = int32(t1l + wil);
      t1h = int32(t1h + wih + getCarry(t1l, wil));

      const t2l = int32(sigma0l + majl);
      const t2h = int32(sigma0h + majh + getCarry(t2l, sigma0l));

      hh = gh;
      hl = gl;
      gh = fh;
      gl = fl;
      fh = eh;
      fl = el;
      el = int32(dl + t1l);
      eh = int32(dh + t1h + getCarry(el, dl));
      dh = ch;
      dl = cl;
      ch = bh;
      cl = bl;
      bh = ah;
      bl = al;
      al = int32(t1l + t2l);
      ah = int32(t1h + t2h + getCarry(al, t1l));
    }

    this.al = int32(this.al + al);
    this.bl = int32(this.bl + bl);
    this.cl = int32(this.cl + cl);
    this.dl = int32(this.dl + dl);
    this.el = int32(this.el + el);
    this.fl = int32(this.fl + fl);
    this.gl = int32(this.gl + gl);
    this.hl = int32(this.hl + hl);

    this.ah = int32(this.ah + ah + getCarry(this.al, al));
    this.bh = int32(this.bh + bh + getCarry(this.bl, bl));
    this.ch = int32(this.ch + ch + getCarry(this.cl, cl));
    this.dh = int32(this.dh + dh + getCarry(this.dl, dl));
    this.eh = int32(this.eh + eh + getCarry(this.el, el));
    this.fh = int32(this.fh + fh + getCarry(this.fl, fl));
    this.gh = int32(this.gh + gh + getCarry(this.gl, gl));
    this.hh = int32(this.hh + hh + getCarry(this.hl, hl));
  }

  protected override hash(): Uint8Array {
    return new Uint8Array([
      (this.ah & 0xff000000) >>> 24,
      (this.ah & 0x00ff0000) >>> 16,
      (this.ah & 0x0000ff00) >>> 8,
      this.ah & 0x000000ff,
      (this.al & 0xff000000) >>> 24,
      (this.al & 0x00ff0000) >>> 16,
      (this.al & 0x0000ff00) >>> 8,
      this.al & 0x000000ff,
      (this.bh & 0xff000000) >>> 24,
      (this.bh & 0x00ff0000) >>> 16,
      (this.bh & 0x0000ff00) >>> 8,
      this.bh & 0x000000ff,
      (this.bl & 0xff000000) >>> 24,
      (this.bl & 0x00ff0000) >>> 16,
      (this.bl & 0x0000ff00) >>> 8,
      this.bl & 0x000000ff,
      (this.ch & 0xff000000) >>> 24,
      (this.ch & 0x00ff0000) >>> 16,
      (this.ch & 0x0000ff00) >>> 8,
      this.ch & 0x000000ff,
      (this.cl & 0xff000000) >>> 24,
      (this.cl & 0x00ff0000) >>> 16,
      (this.cl & 0x0000ff00) >>> 8,
      this.cl & 0x000000ff,
      (this.dh & 0xff000000) >>> 24,
      (this.dh & 0x00ff0000) >>> 16,
      (this.dh & 0x0000ff00) >>> 8,
      this.dh & 0x000000ff,
      (this.dl & 0xff000000) >>> 24,
      (this.dl & 0x00ff0000) >>> 16,
      (this.dl & 0x0000ff00) >>> 8,
      this.dl & 0x000000ff,
      (this.eh & 0xff000000) >>> 24,
      (this.eh & 0x00ff0000) >>> 16,
      (this.eh & 0x0000ff00) >>> 8,
      this.eh & 0x000000ff,
      (this.el & 0xff000000) >>> 24,
      (this.el & 0x00ff0000) >>> 16,
      (this.el & 0x0000ff00) >>> 8,
      this.el & 0x000000ff,
      (this.fh & 0xff000000) >>> 24,
      (this.fh & 0x00ff0000) >>> 16,
      (this.fh & 0x0000ff00) >>> 8,
      this.fh & 0x000000ff,
      (this.fl & 0xff000000) >>> 24,
      (this.fl & 0x00ff0000) >>> 16,
      (this.fl & 0x0000ff00) >>> 8,
      this.fl & 0x000000ff,
    ]);
  }
}
