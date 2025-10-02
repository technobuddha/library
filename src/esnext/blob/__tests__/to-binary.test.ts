import { toBinary } from '../to-binary.ts';

describe('toBinary', () => {
  test('should return the same Uint8Array instance when input is already Uint8Array', () => {
    const arr = new Uint8Array([1, 2, 3]);
    const result = toBinary(arr);
    expect(result).toStrictEqual(arr);
    expect(Array.from(result)).toEqual([1, 2, 3]);
  });

  test('should convert ArrayBuffer to Uint8Array', () => {
    const { buffer } = new Uint8Array([4, 5, 6]);
    const result = toBinary(buffer);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([4, 5, 6]);
  });

  test('should convert DataView to Uint8Array', () => {
    const { buffer } = new Uint8Array([7, 8, 9]);
    const view = new DataView(buffer);
    const result = toBinary(view);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([7, 8, 9]);
  });

  test('should convert Int8Array to Uint8Array', () => {
    const arr = new Int8Array([-1, 0, 1]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([255, 0, 1]);
  });

  test('should convert Uint8ClampedArray to Uint8Array', () => {
    const arr = new Uint8ClampedArray([10, 20, 30]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([10, 20, 30]);
  });

  test('should convert Int16Array to Uint8Array', () => {
    const arr = new Int16Array([256, 257]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    // Int16Array stores 2 bytes per element, little-endian
    expect(Array.from(result)).toEqual([0, 1, 1, 1]);
  });

  test('should convert Uint16Array to Uint8Array', () => {
    const arr = new Uint16Array([258, 259]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([2, 1, 3, 1]);
  });

  test('should convert Int32Array to Uint8Array', () => {
    const arr = new Int32Array([0x01020304]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([4, 3, 2, 1]);
  });

  test('should convert Uint32Array to Uint8Array', () => {
    const arr = new Uint32Array([0x05060708]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([8, 7, 6, 5]);
  });

  test('should convert Float16Array to Uint8Array', () => {
    const arr = new Float16Array([1, 2]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(arr.byteLength);
  });

  test('should convert Float32Array to Uint8Array', () => {
    const arr = new Float32Array([1.5, 2.5]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(arr.byteLength);
  });

  test('should convert Float64Array to Uint8Array', () => {
    const arr = new Float64Array([3.14]);
    const result = toBinary(arr);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.byteLength).toBe(arr.byteLength);
  });

  test('should handle ArrayBuffer views with offset', () => {
    const { buffer } = new Uint8Array([1, 2, 3, 4, 5]);
    const arr = new Uint8Array(buffer, 1, 3);
    const result = toBinary(arr);
    expect(Array.from(result)).toEqual([2, 3, 4]);
  });

  test('should preserve byteOffset and byteLength for views', () => {
    const { buffer } = new Uint8Array([10, 20, 30, 40, 50, 60]);
    const view = new Int16Array(buffer, 2, 2);
    const result = toBinary(view);
    expect(result.byteOffset).toBe(2);
    expect(result.byteLength).toBe(4);
  });

  test('should create view of entire ArrayBuffer', () => {
    const buffer = new ArrayBuffer(8);
    const result = toBinary(buffer);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.buffer).toBe(buffer);
    expect(result.byteOffset).toBe(0);
    expect(result.byteLength).toBe(8);
  });

  test('should handle empty ArrayBuffer', () => {
    const buffer = new ArrayBuffer(0);
    const result = toBinary(buffer);
    expect(result.byteLength).toBe(0);
    expect(Array.from(result)).toEqual([]);
  });

  test('should share underlying buffer with typed arrays', () => {
    const arr = new Int32Array([0x12345678]);
    const result = toBinary(arr);
    expect(result.buffer).toBe(arr.buffer);
    // Modify original array should affect result
    arr[0] = 0x11111111;
    expect(result[0]).toBe(0x11);
  });
});
