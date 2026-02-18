import fs from 'node:fs';

import { empty } from '../esnext/unicode/unicode.ts';

/**
 * Asynchronously reads a file line by line, yielding each line as a string.
 *
 * Handles all common line endings (n, r, rn, nr) and supports custom encoding.
 *
 * @param file - The path to the file to read
 * @param encoding - The encoding to use when reading the file (default: 'utf-8')
 * @returns An async generator yielding each line as a string
 *
 * @example
 * Example usage:
 * ```typescript
 * for await (const line of readLines('example.txt')) {
 *   console.log(line);
 * \}
 * ```
 *
 * @group Node
 * @category File System
 */
export async function* readLines(
  file: string,
  encoding: BufferEncoding = 'utf-8',
): AsyncGenerator<string> {
  const handle = await fs.promises.open(file, 'r');
  let previous = empty;

  while (true) {
    const { bytesRead, buffer } = await handle.read();

    let text = previous + buffer.toString(encoding, 0, bytesRead);
    while (true) {
      let pos = text.search(/\r|\n/v);
      if (pos === -1 || (pos === text.length - 1 && bytesRead > 0)) {
        previous = text;
        break;
      }

      yield text.slice(0, pos);

      const c2 = text.slice(pos, pos + 2);
      pos += c2 === '\r\n' ? 2 : 1;

      text = text.slice(pos);
    }

    if (bytesRead === 0) {
      break;
    }
  }

  if (previous.length > 0) {
    yield previous;
  }

  await handle.close();
}
