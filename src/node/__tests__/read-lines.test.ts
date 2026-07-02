import fs from 'node:fs/promises';
import path from 'node:path';

import { readLines } from '../read-lines.ts';

describe('readLines', () => {
  const testFile = path.join(process.cwd(), 'testfile.txt');

  beforeEach(async () => {
    try {
      await fs.unlink(testFile);
    } catch {}
  });

  afterEach(async () => {
    try {
      await fs.unlink(testFile);
    } catch {}
  });

  test('reads lines with mixed line endings', async () => {
    // This string will trigger both the \r\n and \n\r branches in the code
    await fs.writeFile(testFile, 'a\r\nb\n\rc\rd\ne');
    const lines = await Array.fromAsync(readLines(testFile));
    // Expect empty strings for consecutive line endings
    expect(lines).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('reads lines separated by \\n\\r (trailing)', async () => {
    await fs.writeFile(testFile, 'a\nb\nc\n\r');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('yields empty string for final trailing separator', async () => {
    await fs.writeFile(testFile, 'a\nb\nc\n');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads file with a single line and no line separator', async () => {
    await fs.writeFile(testFile, 'abc');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['abc']);
  });

  test('reads lines separated by \\n', async () => {
    await fs.writeFile(testFile, 'a\nb\nc\n');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads lines separated by \\r', async () => {
    await fs.writeFile(testFile, 'a\rb\rc\r');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads lines separated by \\r\\n', async () => {
    await fs.writeFile(testFile, 'a\r\nb\r\nc\r\n');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads lines separated by \\n\\r', async () => {
    await fs.writeFile(testFile, 'a\nb\nc\n\r');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads file with no trailing newline', async () => {
    await fs.writeFile(testFile, 'a\nb\nc');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads empty file', async () => {
    await fs.writeFile(testFile, '');
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual([]);
  });

  test('supports custom encoding', async () => {
    await fs.writeFile(testFile, 'α\nβ\nγ\n', { encoding: 'utf-8' });
    const lines = await Array.fromAsync(readLines(testFile, 'utf-8'));
    expect(lines).toEqual(['α', 'β', 'γ']);
  });

  test('handles line ending at buffer boundary', async () => {
    // Default buffer size is typically 16384 bytes
    // Create content that ends with \r at position 16383 (buffer boundary - 1)
    // followed by \n at position 16384 (start of next buffer)
    const bufferSize = 16384;
    const content = `${'a'.repeat(bufferSize - 1)}\r\n${'b'.repeat(100)}`;
    await fs.writeFile(testFile, content);
    const lines = await Array.fromAsync(readLines(testFile));
    expect(lines).toEqual(['a'.repeat(bufferSize - 1), 'b'.repeat(100)]);
  });
});
