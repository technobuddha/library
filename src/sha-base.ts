/* eslint-disable no-bitwise */
import { type BinaryEncoding } from './@types/binary-encoding.ts';
import { type TextEncoding } from './@types/text-encoding.ts';
import { type TypedArray } from './@types/typed-array.ts';
import { encodeBinary } from './encode-binary.ts';
import { encodeText } from './encode-text.ts';
import { HashBase } from './hash-base.ts';

/**
 * The base class for sha based cryptographic hash functions
 *
 * @group Encoding
 * @category Hash
 */
export abstract class ShaBase extends HashBase {
  /**
   * Internal buffer used to store a block of data for hashing operations.
   * This buffer is typically filled with input data and processed in chunks
   * according to the hash algorithm's block size.
   */
  protected readonly block: Uint8Array;
  /**
   * The size of each data block (in bytes) that the hash algorithm processes at a time.
   * This value determines how input data is divided and handled internally.
   * @readonly
   */
  protected readonly blockSize: number;
  /**
   * The size in bytes of the final hash output produced by the algorithm.
   * This value determines the length of the resulting hash digest.
   * @readonly
   */
  protected readonly finalSize: number;
  /**
   * The current length of the data processed or stored.
   * Used internally to track the number of bytes or elements handled by the hash algorithm.
   */
  private len: number;

  /**
   * Creates a new instance of the hash base class.
   *
   * @param blockSize - The size of the internal block buffer in bytes.
   * @param finalSize - The size of the final hash output in bytes.
   */
  public constructor(blockSize: number, finalSize: number) {
    super();
    this.block = new Uint8Array(blockSize);
    this.finalSize = finalSize;
    this.blockSize = blockSize;
    this.len = 0;
  }

  /**
   * Computes and returns the final hash value for the current state.
   *
   * @remarks
   * This method should be implemented by subclasses to perform the actual
   * hash computation based on the internal state and algorithm-specific logic.
   * It is called internally by {@link digest} after all data has been processed.
   *
   * @returns The computed hash as a `Uint8Array`.
   */
  protected abstract hash(): Uint8Array;

  /**
   * Updates the internal bit counters based on the provided data block.
   *
   * @remarks
   * This method is called internally whenever a full block of data is processed.
   * Subclasses should implement this to maintain any algorithm-specific counters
   * (such as total bits or bytes processed) required for correct hash computation.
   *
   * @param buffer - The data block that was just processed.
   */
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

    if (bits <= 32) {
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

  public update(data: TypedArray | ArrayBuffer | ArrayLike<number>): this;
  public update(data: string, encoding?: TextEncoding): this;
  public update(
    data: string | TypedArray | ArrayBuffer | ArrayLike<number>,
    encoding: TextEncoding = 'utf8',
  ): this {
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
