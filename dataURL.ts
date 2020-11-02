import map from 'lodash/map';
import build                    from './build';

const btoa: (input: string) => string    = (typeof window != 'undefined') ? window.btoa : require('Base64').btoa;

export function dataURL(
    input: ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array,
    mimeType: string
):  string
{
    let bytes    = new Uint8Array(input instanceof ArrayBuffer ? input : input.buffer);

    return `data:${mimeType};base64,${btoa(build(map(bytes, c => String.fromCharCode(c))))}`;
}

export default dataURL;
