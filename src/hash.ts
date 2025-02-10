/* eslint-disable no-bitwise */
import { type BinaryEncoding, encodeBinary } from './encode-binary.js';
import { encodeText, type Encoding } from './encode-text.js';

/**
 *
 */
export interface HashClass {
  digest(): Uint8Array;
  digest(encoding: BinaryEncoding): string;
  update(data: TypedArray | ArrayBuffer): this;
  update(data: string, encoding?: Encoding): this;
}

export abstract class HashBase implements HashClass {
  protected readonly block: Uint8Array;
  protected readonly blockSize: number;
  protected readonly finalSize: number;
  private len: number;

  public constructor(blockSize: number, finalSize: number) {
    this.block = new Uint8Array(blockSize);
    this.finalSize = finalSize;
    this.blockSize = blockSize;
    this.len = 0;
  }

  protected abstract hash(): Uint8Array;

  protected abstract updateCounters(buffer: Uint8Array): void;

  public digest(): Uint8Array;
  public digest(encoding: BinaryEncoding): string;
  public digest(encoding?: BinaryEncoding): Uint8Array | string {
    const rem = this.len % this.blockSize;

    this.block[rem] = 0x80;
    this.block.fill(0, rem + 1);

    if (rem >= this.finalSize) {
      this.updateCounters(this.block);
      this.block.fill(0);
    }

    const bits = this.len * 8;

    if (bits <= 0xffffffff) {
      // uint32
      this.block[this.blockSize - 4] = (bits & 0xff000000) >>> 24;
      this.block[this.blockSize - 3] = (bits & 0x00ff0000) >>> 16;
      this.block[this.blockSize - 2] = (bits & 0x0000ff00) >>> 8;
      this.block[this.blockSize - 1] = bits & 0x000000ff;
    } else {
      // uint64
      const lowBits = (bits & 0xffffffff) >>> 0;
      const highBits = (bits - lowBits) / 0x100000000;

      this.block[this.blockSize - 8] = (highBits & 0xff000000) >>> 24;
      this.block[this.blockSize - 7] = (highBits & 0x00ff0000) >>> 16;
      this.block[this.blockSize - 6] = (highBits & 0x0000ff00) >>> 8;
      this.block[this.blockSize - 5] = highBits & 0x000000ff;
      this.block[this.blockSize - 4] = (lowBits & 0xff000000) >>> 24;
      this.block[this.blockSize - 3] = (lowBits & 0x00ff0000) >>> 16;
      this.block[this.blockSize - 2] = (lowBits & 0x0000ff00) >>> 8;
      this.block[this.blockSize - 1] = lowBits & 0x000000ff;
    }

    this.updateCounters(this.block);
    const hash = this.hash();

    return encoding ? encodeBinary(hash, encoding) : hash;
  }

  public update(data: TypedArray | ArrayBuffer): this;
  public update(data: string, encoding?: Encoding): this;
  public update(data: string | TypedArray | ArrayBuffer, encoding: Encoding = 'utf8'): this {
    const buffer =
      typeof data === 'string' ? encodeText(data, encoding)
      : ArrayBuffer.isView(data) ? new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
      : new Uint8Array(data);

    const { length } = buffer;
    let accum = this.len;

    for (let offset = 0; offset < length; ) {
      const assigned = accum % this.blockSize;
      const remainder = Math.min(length - offset, this.blockSize - assigned);

      for (let i = 0; i < remainder; i++) {
        this.block[assigned + i] = buffer[offset + i];
      }

      accum += remainder;
      offset += remainder;

      if (accum % this.blockSize === 0) {
        this.updateCounters(this.block);
      }
    }

    this.len += length;
    return this;
  }
}
