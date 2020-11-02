import { empty } from './constants';

/**
  * Decode a UTF8 encoded string into unicode
  */
export function decodeUTF8(input: string): string {
    let result = empty;

    for(let i = 0; i < input.length; ++i) {
        let c0: number = input.charCodeAt(i);
        let c1: number;
        let c2: number;
        let c3: number;

        if(c0 > 0x007F) {
            if(c0 > 0x00BF && c0 < 0x00E0) {
                c1 = input.charCodeAt(++i);
                if(i >= input.length)
                    throw new Error('Incomplete 2-byte sequence');
                if((c1 & 0xC0) != 0x80)
                    throw new Error('Incorrect 2 byte sequence');

                c0 = (c0 & 0x001F) << 6 | (c1 & 0x003F);
            } else if(c0 >= 0x00E0 && c0 < 0x00F0) {
                c1 = input.charCodeAt(++i);
                c2 = input.charCodeAt(++i);
                if(i >= input.length)
                    throw new Error('Incomplete 3-byte sequence');
                if((c1 & 0xC0) != 0x80 || (c2 & 0xC0) != 0x80)
                    throw new Error('Incorrect 3 byte sequence');

                c0 = (c0 & 0x000F) << 12 | (c1 & 0x003F) << 6 | (c2 & 0x003F);
            } else if(c0 >= 0x00F0 && c0 < 0x00F8) {
                c1 = input.charCodeAt(++i);
                c2 = input.charCodeAt(++i);
                c3 = input.charCodeAt(++i);
                if(i >= input.length)
                    throw new Error('incomplete 4 byte sequence');
                if((c1 & 0xC0) != 0x80 || (c2 & 0xC0) != 0x80 || (c3 & 0xc0) != 0x80)
                    throw new Error('Incorrect 3 byte sequence');

                c0 = (c0 & 0x000f) << 18 | (c1 & 0x003F) << 12 | (c2 & 0x003F) << 6 | (c3 & 0x003F);
            } else
                throw new Error('unknown multibyte start 0x' + c0.toString(16) + ' @' + i);
        }

        if(c0 <= 0xFFFF)
            result += String.fromCharCode(c0);
        else if(c0 <= 0x0010FFFF) {
            c0 -= 0x00010000;
            result += String.fromCharCode(c0 >> 10 | 0xD800) + String.fromCharCode(c0 & 0x03FF | 0xDC00);
        } else
            throw new Error('code point 0x' + c0.toString(16) + ' exceeds UTF-16 reach');
    }

    return result;
}

export default decodeUTF8;
