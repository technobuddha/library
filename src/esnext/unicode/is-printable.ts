import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';
import { isStringLike } from '../string/is-string-like.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

export function isPrintable(char: StringLike | NumberLike): boolean {
  const codePoint = isStringLike(char) ? toString(char).codePointAt(0)! : toNumber(char);

  return !(
    (codePoint >= 0x0000 && codePoint <= 0x001f) || // C0 control codes (includes tab, newline, etc.)
    codePoint === 0x007f || // DEL
    (codePoint >= 0x0080 && codePoint <= 0x009f) || // C1 control codes
    codePoint === 0x00a0 || // Non-breaking space
    codePoint === 0x00ad || // Soft hyphen
    codePoint === 0x034f || // Combining grapheme joiner
    codePoint === 0x061c || // Arabic letter mark
    codePoint === 0x1680 || // Ogham space mark
    codePoint === 0x180e || // Mongolian vowel separator
    codePoint === 0x2000 || // En quad
    codePoint === 0x2001 || // Em quad
    codePoint === 0x2002 || // En space
    codePoint === 0x2003 || // Em space
    codePoint === 0x2004 || // Three-per-em space
    codePoint === 0x2005 || // Four-per-em space
    codePoint === 0x2006 || // Six-per-em space
    codePoint === 0x2007 || // Figure space
    codePoint === 0x2008 || // Punctuation space
    codePoint === 0x2009 || // Thin space
    codePoint === 0x200a || // Hair space
    codePoint === 0x200b || // Zero width space
    codePoint === 0x200c || // Zero width non-joiner
    codePoint === 0x200d || // Zero width joiner
    codePoint === 0x200e || // Left-to-right mark
    codePoint === 0x200f || // Right-to-left mark
    codePoint === 0x202a || // Left-to-right embedding
    codePoint === 0x202b || // Right-to-left embedding
    codePoint === 0x202c || // Pop directional formatting
    codePoint === 0x202d || // Left-to-right override
    codePoint === 0x202e || // Right-to-left override
    codePoint === 0x202f || // Narrow no-break space
    codePoint === 0x205f || // Medium mathematical space
    codePoint === 0x2060 || // Word joiner
    codePoint === 0x2066 || // Left-to-right isolate
    codePoint === 0x2067 || // Right-to-left isolate
    codePoint === 0x2068 || // First strong isolate
    codePoint === 0x2069 || // Pop directional isolate
    codePoint === 0x2028 || // Line separator
    codePoint === 0x2029 || // Paragraph separator
    codePoint === 0x3000 || // Ideographic space
    codePoint === 0xfeff || // Zero width no-break space
    (codePoint >= 0xe000 && codePoint <= 0xf8ff) || // Private use area
    (codePoint >= 0xfdd0 && codePoint <= 0xfdef) // Non-characters
  );
}
