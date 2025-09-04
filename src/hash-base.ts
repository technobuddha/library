import { type BinaryEncoding } from './@types/binary-encoding.ts';
import { type TextEncoding } from './@types/text-encoding.ts';
import { type TypedArray } from './@types/typed-array.ts';

/**
 * Abstract base class for hash algorithm implementations.
 *
 * Provides a standard interface for updating hash state with data and
 * retrieving the final digest in various formats. Concrete subclasses
 * must implement the `update` and `digest` methods according to the
 * specifics of the hash algorithm.
 * @remarks
 * - The `update` methods allows chaining for incremental hashing.
 * - The `digest` methods finalize the hash computation and return the result
 *   either as a `Uint8Array` or as an encoded string.
 * @group Binary
 * @category Hash
 */
export abstract class HashBase {
  /**
   * Finalizes the hash computation and returns the resulting hash digest.
   * This method performs any necessary padding and processes the final block
   * of data according to the hash algorithm's specification.
   * @returns The hash digest
   *
   */
  public abstract digest(): Uint8Array;
  /**
   * Finalizes the hash computation and returns the resulting hash digest.
   * This method performs any necessary padding and processes the final block
   * of data according to the hash algorithm's specification.
   * @param encoding - Optional. The encoding to use for the output digest (e.g., 'hex', 'base64').
   * @returns An encoded string, depending on the `encoding` parameter.
   */
  public abstract digest(encoding: BinaryEncoding): string;

  /**
   * Updates the hash with the given binary data.
   * @param data - The data to update the hash with, as a TypedArray or ArrayBuffer.
   * @returns The hash instance for method chaining.
   */
  public abstract update(data: TypedArray | ArrayBuffer): this;

  /**
   * Updates the hash with the given string data.
   * @param data - The string data to update the hash with.
   * @param encoding - Optional text encoding of the input string (e.g., 'utf8').
   * @returns The hash instance for method chaining.
   */
  public abstract update(data: string, encoding?: TextEncoding): this;
}
