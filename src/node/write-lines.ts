import fs from 'node:fs';

import { toArray } from '../esnext/array/to-array.ts';

class WriteLines {
  private readonly stream: fs.WriteStream;

  private constructor(filePath: string, flags: fs.WriteStreamOptions) {
    this.stream = fs.createWriteStream(filePath, flags);
  }

  public async write(line: string): Promise<void> {
    return new Promise((resolve) => {
      if (this.stream.write(line)) {
        resolve();
      } else {
        this.stream.once('drain', () => resolve());
      }
    });
  }

  public async writeLine(lines: string | string[]): Promise<void> {
    for (const line of toArray(lines)) {
      await this.write(line);
      await this.write('\n');
    }
  }

  public async close(): Promise<void> {
    return new Promise((resolve) => {
      this.stream.end(() => {
        resolve();
      });
    });
  }

  public static async open(filePath: string, flags: fs.WriteStreamOptions): Promise<WriteLines> {
    const wl = new WriteLines(filePath, flags);

    return new Promise((resolve) => {
      wl.stream.once('ready', () => {
        resolve(wl);
      });
    });
  }
}

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
