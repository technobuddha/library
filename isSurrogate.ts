
type Options = {
    high?: boolean;
    low?: boolean;
}

/**
  * Deterimine is a character is a surrogate
  */
export function isSurrogate(input: string, {high = true, low = true}: Options = {}): boolean {
    const cc = input.charCodeAt(0);

    return ((high && cc >= 0xD800 && cc <= 0xDBFF) || (low && cc >= 0xDC00 && cc <= 0xDFFF));
}

export default isSurrogate;
