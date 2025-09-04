/* eslint-disable no-bitwise */
import { ch } from './ch.ts';
import { int32 } from './int32.ts';
import { maj } from './maj.ts';
import { ShaBase } from './sha-base.ts';

/**
 * The SHA-512 round constants array.
 *
 * This array contains 80 constant 32-bit integer values used in each round of the SHA-512 hashing algorithm.
 * Each pair of values represents the high and low 32 bits of a 64-bit constant, as specified by the SHA-512 standard (FIPS PUB 180-4).
 * @see {@link https://csrc.nist.gov/publications/detail/fips/180/4/final | FIPS PUB 180-4: Secure Hash Standard}
 * @remarks
 * These constants are derived from the fractional parts of the cube roots of the first 80 prime numbers.
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
 * Computes the SHA-512 σ₀ (sigma0) function for the given 64-bit value split into high (`xH`) and low (`xl`) 32-bit words.
 *
 * The σ₀ function is defined as:
 *   σ₀(x) = ROTR^1(x) ⊕ ROTR^8(x) ⊕ SHR^7(x)
 * where ROTR is a right rotation and SHR is a right shift.
 * @param xH - The high 32 bits of the 64-bit input value.
 * @param xL - The low 32 bits of the 64-bit input value.
 * @returns The result of the σ₀ function as a 32-bit integer.
 * @internal
 */
function sigma0(xH: number, xL: number): number {
  return ((xH >>> 28) | (xL << 4)) ^ ((xL >>> 2) | (xH << 30)) ^ ((xL >>> 7) | (xH << 25));
}

/**
 * Computes the SHA-512 σ₁ (sigma1) function on a 64-bit word represented by two 32-bit numbers.
 *
 * The σ₁ function is defined as:
 *   σ₁(x) = ROTR^14(x) ⊕ ROTR^18(x) ⊕ ROTR^41(x)
 * where ROTR^n(x) is the right rotation of x by n bits.
 * @param x - The high 32 bits of the 64-bit input word.
 * @param xL - The low 32 bits of the 64-bit input word.
 * @returns The result of the σ₁ function as a 32-bit number.
 * @internal
 */
function sigma1(x: number, xL: number): number {
  return ((x >>> 14) | (xL << 18)) ^ ((x >>> 18) | (xL << 14)) ^ ((xL >>> 9) | (x << 23));
}

/**
 * Computes the SHA-512 Gamma0 function on a 64-bit value represented by two 32-bit parts.
 *
 * This function applies bitwise rotations and shifts to the high (`x`) and low (`xL`) 32-bit words
 * of a 64-bit integer, as specified in the SHA-512 specification for the Gamma0 function.
 * @param x - The high 32 bits of the 64-bit input value.
 * @param xL - The low 32 bits of the 64-bit input value.
 * @returns The result of the Gamma0 function as a 32-bit integer.
 * @internal
 */
function gamma0(x: number, xL: number): number {
  return ((x >>> 1) | (xL << 31)) ^ ((x >>> 8) | (xL << 24)) ^ (x >>> 7);
}

/**
 * Computes the SHA-512-specific Gamma0 function for 64-bit values represented as two 32-bit numbers.
 *
 * This function applies bitwise right rotations and shifts to the high (`x`) and low (`xL`) 32-bit parts
 * of a 64-bit word, then combines the results using XOR operations. It is used in the message schedule
 * expansion step of the SHA-512 hash algorithm.
 * @param x - The high 32 bits of the 64-bit input word.
 * @param xL - The low 32 bits of the 64-bit input word.
 * @returns The result of the Gamma0 function as a 32-bit integer.
 * @internal
 */
function gamma0L(x: number, xL: number): number {
  return ((x >>> 1) | (xL << 31)) ^ ((x >>> 8) | (xL << 24)) ^ ((x >>> 7) | (xL << 25));
}

/**
 * Computes the SHA-512 Gamma1 function on a 64-bit value represented by two 32-bit numbers.
 *
 * The Gamma1 function is defined as:
 *   Gamma1(x) = ROTR^19(x) XOR ROTR^61(x) XOR (x \>\>\> 6)
 * where ROTR^n(x) is the right rotation of x by n bits.
 * @param x - The high 32 bits of the 64-bit input value.
 * @param xL - The low 32 bits of the 64-bit input value.
 * @returns The result of the Gamma1 function as a 32-bit number.
 * @internal
 */
function gamma1(x: number, xL: number): number {
  return ((x >>> 19) | (xL << 13)) ^ ((xL >>> 29) | (x << 3)) ^ (x >>> 6);
}

/**
 * Computes the lower 32 bits of the SHA-512 Gamma1 function.
 *
 * This function performs bitwise operations (rotations and shifts) on the input
 * 64-bit value, which is split into two 32-bit parts (`x` as the high word and `xL` as the low word).
 * It is used as part of the SHA-512 hash algorithm's message schedule.
 * @param xH - The high 32 bits of the 64-bit input value.
 * @param xL - The low 32 bits of the 64-bit input value.
 * @returns The result of the Gamma1 function applied to the lower 32 bits.
 * @internal
 */
function gamma1L(xH: number, xL: number): number {
  return ((xH >>> 19) | (xL << 13)) ^ ((xL >>> 29) | (xH << 3)) ^ ((xH >>> 6) | (xL << 26));
}

/**
 * Determines if adding two unsigned 32-bit integers results in a carry.
 * @param a - The first unsigned 32-bit integer.
 * @param b - The second unsigned 32-bit integer.
 * @returns 1 if the addition of `a` and `b` causes an unsigned overflow (carry), otherwise 0.
 * @internal
 */
function getCarry(a: number, b: number): number {
  return a >>> 0 < b >>> 0 ? 1 : 0;
}

/**
 * Secure Hash Algorithm, SHA2 SHA-512
 * @example
 * ```typescript
 * const sha512 = new Sha512();
 * sha512.update('hello world', 'utf8');
 * sha512.digest('hex');
 * // '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f'
 * ```
 * ```typescript
 * const sha512 = new Sha512();
 * sha512.update(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
 * sha512.digest('hex');
 * // '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f'
 * ```
 * @group Binary
 * @category Hash
 */
export class Sha512 extends ShaBase {
  private aH = 0x6a09e667;
  private bH = 0xbb67ae85;
  private cH = 0x3c6ef372;
  private dH = 0xa54ff53a;
  private eH = 0x510e527f;
  private fH = 0x9b05688c;
  private gH = 0x1f83d9ab;
  private hH = 0x5be0cd19;

  private aL = 0xf3bcc908;
  private bL = 0x84caa73b;
  private cL = 0xfe94f82b;
  private dL = 0x5f1d36f1;
  private eL = 0xade682d1;
  private fL = 0x2b3e6c1f;
  private gL = 0xfb41bd6b;
  private hL = 0x137e2179;
  private readonly w: number[];

  /**
   * Creates a new SHA-512 hash instance and initializes its internal state.
   *
   * @remarks
   * The internal state variables are set to the initial SHA-512 constants as specified
   * in FIPS PUB 180-4. Use {@link update} to process data and {@link digest} to retrieve the hash.
   */
  public constructor() {
    super(128, 112);
    this.w = Array.from({ length: 160 });
  }

  protected override updateCounters(buffer: Uint8Array): void {
    const { w } = this;
    let aH = int32(this.aH);
    let bH = int32(this.bH);
    let cH = int32(this.cH);
    let dH = int32(this.dH);
    let eH = int32(this.eH);
    let fH = int32(this.fH);
    let gH = int32(this.gH);
    let hH = int32(this.hH);
    let aL = int32(this.aL);
    let bL = int32(this.bL);
    let cL = int32(this.cL);
    let dL = int32(this.dL);
    let eL = int32(this.eL);
    let fL = int32(this.fL);
    let gL = int32(this.gL);
    let hL = int32(this.hL);

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

    let wiL: number;
    let wiH: number;
    for (; i < 160; i += 2) {
      let xH = w[i - 15 * 2];
      let xL = w[i - 15 * 2 + 1];
      const gama0 = gamma0(xH, xL);
      const gama0L = gamma0L(xL, xH);

      xH = w[i - 2 * 2];
      xL = w[i - 2 * 2 + 1];
      const gama1 = gamma1(xH, xL);
      const gama1L = gamma1L(xL, xH);

      const wi7H = w[i - 7 * 2];
      const wi7L = w[i - 7 * 2 + 1];

      const wi16H = w[i - 16 * 2];
      const wi16L = w[i - 16 * 2 + 1];

      wiL = int32(gama0L + wi7L);
      wiH = int32(gama0 + wi7H + getCarry(wiL, gama0L));
      wiL = int32(wiL + gama1L);
      wiH = int32(wiH + gama1 + getCarry(wiL, gama1L));
      wiL = int32(wiL + wi16L);
      wiH = int32(wiH + wi16H + getCarry(wiL, wi16L));

      w[i] = wiH;
      w[i + 1] = wiL;
    }

    for (let j = 0; j < 160; j += 2) {
      wiH = w[j];
      wiL = w[j + 1];

      // cspell:ignore majh majl
      const majH = maj(aH, bH, cH);
      const majL = maj(aL, bL, cL);

      const sigma0H = sigma0(aH, aL);
      const sigma0L = sigma0(aL, aH);
      const sigma1H = sigma1(eH, eL);
      const sigma1L = sigma1(eL, eH);

      const kiH = K[j];
      const kiL = K[j + 1];

      const chH = ch(eH, fH, gH);
      const chL = ch(eL, fL, gL);

      let t1L = int32(hL + sigma1L);
      let t1H = int32(hH + sigma1H + getCarry(t1L, hL));
      t1L = int32(t1L + chL);
      t1H = int32(t1H + chH + getCarry(t1L, chL));
      t1L = int32(t1L + kiL);
      t1H = int32(t1H + kiH + getCarry(t1L, kiL));
      t1L = int32(t1L + wiL);
      t1H = int32(t1H + wiH + getCarry(t1L, wiL));

      const t2L = int32(sigma0L + majL);
      const t2H = int32(sigma0H + majH + getCarry(t2L, sigma0L));

      hH = gH;
      hL = gL;
      gH = fH;
      gL = fL;
      fH = eH;
      fL = eL;
      eL = int32(dL + t1L);
      eH = int32(dH + t1H + getCarry(eL, dL));
      dH = cH;
      dL = cL;
      cH = bH;
      cL = bL;
      bH = aH;
      bL = aL;
      aL = int32(t1L + t2L);
      aH = int32(t1H + t2H + getCarry(aL, t1L));
    }

    this.aL = int32(this.aL + aL);
    this.bL = int32(this.bL + bL);
    this.cL = int32(this.cL + cL);
    this.dL = int32(this.dL + dL);
    this.eL = int32(this.eL + eL);
    this.fL = int32(this.fL + fL);
    this.gL = int32(this.gL + gL);
    this.hL = int32(this.hL + hL);

    this.aH = int32(this.aH + aH + getCarry(this.aL, aL));
    this.bH = int32(this.bH + bH + getCarry(this.bL, bL));
    this.cH = int32(this.cH + cH + getCarry(this.cL, cL));
    this.dH = int32(this.dH + dH + getCarry(this.dL, dL));
    this.eH = int32(this.eH + eH + getCarry(this.eL, eL));
    this.fH = int32(this.fH + fH + getCarry(this.fL, fL));
    this.gH = int32(this.gH + gH + getCarry(this.gL, gL));
    this.hH = int32(this.hH + hH + getCarry(this.hL, hL));
  }

  protected override hash(): Uint8Array {
    return new Uint8Array([
      (this.aH & 0xff000000) >>> 24,
      (this.aH & 0x00ff0000) >>> 16,
      (this.aH & 0x0000ff00) >>> 8,
      this.aH & 0x000000ff,
      (this.aL & 0xff000000) >>> 24,
      (this.aL & 0x00ff0000) >>> 16,
      (this.aL & 0x0000ff00) >>> 8,
      this.aL & 0x000000ff,
      (this.bH & 0xff000000) >>> 24,
      (this.bH & 0x00ff0000) >>> 16,
      (this.bH & 0x0000ff00) >>> 8,
      this.bH & 0x000000ff,
      (this.bL & 0xff000000) >>> 24,
      (this.bL & 0x00ff0000) >>> 16,
      (this.bL & 0x0000ff00) >>> 8,
      this.bL & 0x000000ff,
      (this.cH & 0xff000000) >>> 24,
      (this.cH & 0x00ff0000) >>> 16,
      (this.cH & 0x0000ff00) >>> 8,
      this.cH & 0x000000ff,
      (this.cL & 0xff000000) >>> 24,
      (this.cL & 0x00ff0000) >>> 16,
      (this.cL & 0x0000ff00) >>> 8,
      this.cL & 0x000000ff,
      (this.dH & 0xff000000) >>> 24,
      (this.dH & 0x00ff0000) >>> 16,
      (this.dH & 0x0000ff00) >>> 8,
      this.dH & 0x000000ff,
      (this.dL & 0xff000000) >>> 24,
      (this.dL & 0x00ff0000) >>> 16,
      (this.dL & 0x0000ff00) >>> 8,
      this.dL & 0x000000ff,
      (this.eH & 0xff000000) >>> 24,
      (this.eH & 0x00ff0000) >>> 16,
      (this.eH & 0x0000ff00) >>> 8,
      this.eH & 0x000000ff,
      (this.eL & 0xff000000) >>> 24,
      (this.eL & 0x00ff0000) >>> 16,
      (this.eL & 0x0000ff00) >>> 8,
      this.eL & 0x000000ff,
      (this.fH & 0xff000000) >>> 24,
      (this.fH & 0x00ff0000) >>> 16,
      (this.fH & 0x0000ff00) >>> 8,
      this.fH & 0x000000ff,
      (this.fL & 0xff000000) >>> 24,
      (this.fL & 0x00ff0000) >>> 16,
      (this.fL & 0x0000ff00) >>> 8,
      this.fL & 0x000000ff,
      (this.gH & 0xff000000) >>> 24,
      (this.gH & 0x00ff0000) >>> 16,
      (this.gH & 0x0000ff00) >>> 8,
      this.gH & 0x000000ff,
      (this.gL & 0xff000000) >>> 24,
      (this.gL & 0x00ff0000) >>> 16,
      (this.gL & 0x0000ff00) >>> 8,
      this.gL & 0x000000ff,
      (this.hH & 0xff000000) >>> 24,
      (this.hH & 0x00ff0000) >>> 16,
      (this.hH & 0x0000ff00) >>> 8,
      this.hH & 0x000000ff,
      (this.hL & 0xff000000) >>> 24,
      (this.hL & 0x00ff0000) >>> 16,
      (this.hL & 0x0000ff00) >>> 8,
      this.hL & 0x000000ff,
    ]);
  }
}
