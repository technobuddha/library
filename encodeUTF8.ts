import { empty } from './constants';

/**
  * Encode a unicode string into UTF8
  * @param input        The string to encode
  */
export function encodeUTF8(input: string):string {
    let result = empty;

    for(let i = 0; i < input.length; ++i) {
        let c0 = input.charCodeAt(i);

        if(c0 < 0x0080)
            result += input[i];
        else if(c0 < 0x0800)
            result += String.fromCharCode(c0 >> 6 | 0xC0) + String.fromCharCode(c0 & 0x3F | 0x80);
        else if(c0 >= 0xD800 && c0 < 0xDC00) {
            if(++i >= input.length)
                throw new Error('Incomplete surrogate pair @' + i);

            const c1 = input.charCodeAt(i);
            if(c1 < 0xDC00 || c1 > 0xDFFF)
                throw new Error('Invalid surrogate pair @' + i);

            c0 = 0x10000 + ((c0 & 0x03FF) << 10) + (c1 & 0x03FF);
            result += String.fromCharCode((c0 >> 18) | 0xF0) + String.fromCharCode(((c0 >> 12) & 0x3F) | 0x80) + String.fromCharCode(((c0 >> 6) & 0x3F) | 0x80) + String.fromCharCode((c0 & 0x3f) | 0x80);
        }
        else
            result += String.fromCharCode((c0 >> 12) | 0xE0) + String.fromCharCode(((c0 >> 6) & 0x3F) | 0x80) + String.fromCharCode((c0 & 0x3F) | 0x80);
    }

    return result;
}

export default encodeUTF8;
