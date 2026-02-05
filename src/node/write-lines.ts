import fs from 'node:fs';

import { toArray } from '../esnext/array/to-array.ts';
/**
 * Class for writing lines to a file asynchronously, with support for streaming and custom options.
 *
 * @example
 * ```typescript
 * const writer = await WriteLines.open('output.txt', { flags: 'w' });
 * await writer.writeLine(['foo', 'bar']);
 * await writer.close();
 * ```
 *
 * @group Node
 * @category FileSystem
 */
export class WriteLines {
  private readonly stream: fs.WriteStream;

  private constructor(filePath: string, flags: fs.WriteStreamOptions) {
    this.stream = fs.createWriteStream(filePath, flags);
  }

  /**
   * Write a string to the file (without a newline).
   * @param line - The string to write.
   * @returns Promise that resolves when the write is complete.
   */
  public async write(line: string): Promise<void> {
    return new Promise((resolve) => {
      if (this.stream.write(line)) {
        resolve();
      } else {
        this.stream.once('drain', () => resolve());
      }
    });
  }

  /**
   * Write one or more lines to the file, each followed by a newline.
   * @param lines - A string or array of strings to write as lines.
   * @returns Promise that resolves when all lines are written.
   */
  public async writeLine(lines: string | string[]): Promise<void> {
    for (const line of toArray(lines)) {
      await this.write(line);
      await this.write('\n');
    }
  }

  /**
   * Close the underlying file stream.
   * @returns Promise that resolves when the file is closed.
   */
  public async close(): Promise<void> {
    return new Promise((resolve) => {
      this.stream.end(() => {
        resolve();
      });
    });
  }

  /**
   * Open a file for writing lines, returning a WriteLines instance.
   * @param filePath - Path to the file to write.
   * @param flags - Write stream options (see Node.js fs.WriteStreamOptions).
   * @returns Promise resolving to a WriteLines instance.
   */
  public static async open(filePath: string, flags: fs.WriteStreamOptions): Promise<WriteLines> {
    const wl = new WriteLines(filePath, flags);

    return new Promise((resolve) => {
      wl.stream.once('ready', () => {
        resolve(wl);
      });
    });
  }
}

/**
 * Open a file for writing lines using a convenient async function.
 *
 * @param filePath - Path to the file to write.
 * @param options - Write stream options (see Node.js fs.WriteStreamOptions). Defaults to `{ flags: 'w', encoding: 'utf-8', mode: 0o666, autoClose: true }`.
 * @returns Promise resolving to a WriteLines instance for writing lines.
 *
 * @example
 * ```typescript
 * const writer = await writeLines('output.txt');
 * await writer.writeLine(['foo', 'bar']);
 * await writer.close();
 * ```
 *
 * @group Node
 * @category FileSystem
 */
export async function writeLines(
  filePath: string,
  {
    flags = 'w',
    encoding = 'utf-8',
    mode = 0o666,
    autoClose = true,
    ...rest
  }: fs.WriteStreamOptions = {},
): Promise<WriteLines> {
  return WriteLines.open(filePath, { flags, encoding, mode, autoClose, ...rest });
}
