/**
 * Regular expression to split text into sentences based on common sentence-ending punctuation.
 * @internal
 */
const splitter = /(.*?(?:[.!?‼‽⁇⁈⁉:…]|\.\.\.)["'”’]?)(?:[\s\r\n]+|$)/gu;

/**
 * Splits the input string into an array of sentences.
 *
 * End of sentences are found by looking for the following characters followed by
 * an optional closing quotation mark and terminated by white space or a end of line:
 *
 * | Character | Description                |
 * | --------- | -------------------------- |
 * | ?         | Question mark              |
 * | :         | Colon                      |
 * | [         | Opening square bracket     |
 * | .         | Period                     |
 * | !         | Exclamation mark           |
 * | ?         | Question mark              |
 * | ‼         | Double exclamation mark    |
 * | ‽         | Interrobang                |
 * | ⁇         | Double question mark       |
 * | ⁈         | Question exclamation mark  |
 * | ⁉         | Exclamation question mark  |
 * | :         | Colon                      |
 * | …         | Ellipsis                   |
 * | ...       | Triple period              |
 *
 * | Character | Description                |
 * | --------- | -------------------------- |
 * | "         | Double quotation mark      |
 * | '         | Single quotation mark      |
 * | ”         | Right double quotation mark|
 * | ’         | Right single quotation mark|
 * @param input - The string to be split into sentences.
 * @returns An array of non-empty, trimmed sentences.
 * @example
 * ```ts
 * splitSentences("Hello! How are you? I'm 'OK.'"); // ["Hello!", "How are you?", "I'm 'OK.'"]
 * ```
 * @group String
 * @category Deconstruction
 */
export function splitSentences(input: string): string[] {
  return input.split(splitter).filter((s) => s.trim().length > 0);
}
