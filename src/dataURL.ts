import map   from 'lodash/map';
import build from './build';

export type BinaryObject =
    ArrayBuffer |
    DataView |
    Int8Array |
    Uint8Array |
    Uint8ClampedArray |
    Int16Array |
    Uint16Array |
    Int32Array |
    Uint32Array |
    Float32Array |
    Float64Array;

/**
 * Convert any binary object into a data URL
 *
 * @param input The binary object
 * @param mimeType The MIME type for the URL
 * @returns The data URL
 */
export function dataURL(input: BinaryObject, mimeType: string):  string {
    const buffer = input instanceof ArrayBuffer ? input : input.buffer;
    const bytes = new Uint8Array(buffer);
    return `data:${mimeType};base64,${btoa(build(map(bytes, c => String.fromCharCode(c))))}`;
    //return `data:${mimeType};base64,${Buffer.from(buffer).toString('base64')}`;
}

export default dataURL;
