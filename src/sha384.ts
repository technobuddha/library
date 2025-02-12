/* eslint-disable no-bitwise */
import { HashBase } from './hash-base.js';

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

function int32(x: number): number {
  // eslint-disable-next-line unicorn/prefer-math-trunc
  return x | 0;
}

function çh(x: number, y: number, z: number): number {
  return z ^ (x & (y ^ z));
}

function maj(x: number, y: number, z: number): number {
  return (x & y) | (z & (x | y));
}

function sigma0(x: number, xl: number): number {
  return ((x >>> 28) | (xl << 4)) ^ ((xl >>> 2) | (x << 30)) ^ ((xl >>> 7) | (x << 25));
}

function sigma1(x: number, xl: number): number {
  return ((x >>> 14) | (xl << 18)) ^ ((x >>> 18) | (xl << 14)) ^ ((xl >>> 9) | (x << 23));
}

function ɣ0(x: number, xl: number): number {
  return ((x >>> 1) | (xl << 31)) ^ ((x >>> 8) | (xl << 24)) ^ (x >>> 7);
}

function ɣ0l(x: number, xl: number): number {
  return ((x >>> 1) | (xl << 31)) ^ ((x >>> 8) | (xl << 24)) ^ ((x >>> 7) | (xl << 25));
}

function ɣ1(x: number, xl: number): number {
  return ((x >>> 19) | (xl << 13)) ^ ((xl >>> 29) | (x << 3)) ^ (x >>> 6);
}

function ɣ1l(x: number, xl: number): number {
  return ((x >>> 19) | (xl << 13)) ^ ((xl >>> 29) | (x << 3)) ^ ((x >>> 6) | (xl << 26));
}

function getCarry(a: number, b: number): number {
  return a >>> 0 < b >>> 0 ? 1 : 0;
}

/**
 * Secure Hash Algorithm, SHA2 SHA-384
 * @group Crypto
 * @category SHA2: SHA384
 */
export class Sha384 extends HashBase {
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
      const gamma0 = ɣ0(xh, xl);
      const gamma0l = ɣ0l(xl, xh);

      xh = w[i - 2 * 2];
      xl = w[i - 2 * 2 + 1];
      const gamma1 = ɣ1(xh, xl);
      const gamma1l = ɣ1l(xl, xh);

      const wi7h = w[i - 7 * 2];
      const wi7l = w[i - 7 * 2 + 1];

      const wi16h = w[i - 16 * 2];
      const wi16l = w[i - 16 * 2 + 1];

      wil = int32(gamma0l + wi7l);
      wih = int32(gamma0 + wi7h + getCarry(wil, gamma0l));
      wil = int32(wil + gamma1l);
      wih = int32(wih + gamma1 + getCarry(wil, gamma1l));
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
