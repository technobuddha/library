import { empty } from '../unicode.ts';

/**
 * Split two texts into an array of strings.  Reduce the texts to a string of
 * hashes where each Unicode character represents one line.
 * @param text1 - First string.
 * @param text2 - Second string.
 * @returns An object containing the encoded text1, the encoded text2 and
 *   the array of unique strings.
 *   The zeroth element of the array of unique strings is intentionally blank.
 * @internal
 */
export function linesToChars(
  text1: string,
  text2: string,
): { chars1: string; chars2: string; lineArray: string[] } {
  const lineArray = []; // e.g. lineArray[4] == 'Hello\n'
  const lineHash: Record<string, number> = {}; // e.g. lineHash['Hello\n'] == 4

  // '\x00' is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray[0] = empty;

  /**
   * Split a text into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * Modifies lineArray and lineHash through being a closure.
   * @param text - String to encode.
   * @returns Encoded string.
   * @internal
   */
  function linesToCharsMunge(text: string): string {
    let chars = empty;
    // Walk the text, pulling out a substring for each line.
    // text.split('\n') would would temporarily double our memory footprint.
    // Modifying text would create many large strings to garbage collect.
    let lineStart = 0;
    let lineEnd = -1;
    // Keeping our own length variable is faster than looking it up.
    let lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd === -1) {
        lineEnd = text.length - 1;
      }
      let line = text.slice(lineStart, lineEnd + 1);

      if (Object.hasOwn(lineHash, line) && lineHash[line] !== undefined) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        if (lineArrayLength === maxLines) {
          // Bail out at 65535 because
          // String.fromCharCode(65536) == String.fromCharCode(0)
          line = text.slice(Math.max(0, lineStart));
          lineEnd = text.length;
        }

        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
      lineStart = lineEnd + 1;
    }
    return chars;
  }
  // Allocate 2/3rds of the space for text1, the rest for text2.
  let maxLines = 40000;
  const chars1 = linesToCharsMunge(text1);
  maxLines = 65535;
  const chars2 = linesToCharsMunge(text2);
  return { chars1: chars1, chars2: chars2, lineArray: lineArray };
}
