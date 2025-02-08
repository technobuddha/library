import { type BinaryEncoding } from './@types/binary-encoding.ts';
import { type TextEncoding } from './@types/text-encoding.ts';
import { type TypedArray } from './@types/typed-array.ts';

/**
 * Class representing a generic hash algorithm implementation.
 *
 * @remarks
 * This class defines the contract for hash classes, supporting
 * updating the hash with data and producing a digest in various formats.
 *
 * @group Encoding
 * @category Hash
 */
export abstract class HashBase {
  /**
   * The output is returned as a `Uint8Array`.
   *
   * @returns The hash digest as a `Uint8Array`
   */
  public abstract digest(): Uint8Array;

  /**
   * Finalizes the hash computation and returns the resulting hash digest.
   * This method performs any necessary padding and processes the final block
   * of data according to the hash algorithm's specification.
   *
   * The output is encoded as a string in the specified binary encoding.
   *
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
