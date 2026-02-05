import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { writeLines } from '../write-lines.ts';

function getTmpFile(name: string): string {
  return path.join(os.tmpdir(), name);
}

async function removeFileIfExists(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (
      err &&
      typeof err === 'object' &&
      'code' in err &&
      (err as { code?: string }).code !== 'ENOENT'
    ) {
      throw err;
    }
  }
}

async function readFileUtf8(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

describe('writeLines', () => {
  const tmpFile = getTmpFile('test-output.txt');

  afterEach(async () => {
    await removeFileIfExists(tmpFile);
  });

  test('writes a single line to a file', async () => {
    const writer = await writeLines(tmpFile);
    await writer.writeLine('hello world');
    await writer.close();
    const content = await readFileUtf8(tmpFile);
    expect(content).toBe('hello world\n');
  });

  test('writes multiple lines to a file', async () => {
    const writer = await writeLines(tmpFile);
    await writer.writeLine(['foo', 'bar', 'baz']);
    await writer.close();
    const content = await readFileUtf8(tmpFile);
    expect(content).toBe('foo\nbar\nbaz\n');
  });

  test('respects custom flags and encoding', async () => {
    const writer = await writeLines(tmpFile, { encoding: 'utf-8', flags: 'w' });
    await writer.writeLine('abc');
    await writer.close();
    const content = await readFileUtf8(tmpFile);
    expect(content).toBe('abc\n');
  });
});
