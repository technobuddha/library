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
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    // Expect empty strings for consecutive line endings
    expect(lines).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('reads lines separated by \\n\\r (trailing)', async () => {
    await fs.writeFile(testFile, 'a\nb\nc\n\r');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('yields empty string for final trailing separator', async () => {
    await fs.writeFile(testFile, 'a\nb\nc\n');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads file with a single line and no line separator', async () => {
    await fs.writeFile(testFile, 'abc');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual(['abc']);
  });

  test('reads lines separated by \\n', async () => {
    await fs.writeFile(testFile, 'a\nb\nc\n');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads lines separated by \\r', async () => {
    await fs.writeFile(testFile, 'a\rb\rc\r');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads lines separated by \\r\\n', async () => {
    await fs.writeFile(testFile, 'a\r\nb\r\nc\r\n');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads lines separated by \\n\\r', async () => {
    await fs.writeFile(testFile, 'a\nb\nc\n\r');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads file with no trailing newline', async () => {
    await fs.writeFile(testFile, 'a\nb\nc');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual(['a', 'b', 'c']);
  });

  test('reads empty file', async () => {
    await fs.writeFile(testFile, '');
    const lines = [];
    for await (const line of readLines(testFile)) {
      lines.push(line);
    }
    expect(lines).toEqual([]);
  });

  test('supports custom encoding', async () => {
    await fs.writeFile(testFile, 'α\nβ\nγ\n', { encoding: 'utf-8' });
    const lines = [];
    for await (const line of readLines(testFile, 'utf-8')) {
      lines.push(line);
    }
    expect(lines).toEqual(['α', 'β', 'γ']);
  });
});
