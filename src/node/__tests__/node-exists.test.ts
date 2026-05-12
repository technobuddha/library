import { type Stats } from 'node:fs';
import fs from 'node:fs/promises';

import { nodeExists } from '../node-exists.ts';

const mockStats: Stats = {
  isFile: () => true,
  isDirectory: () => false,
  isBlockDevice: () => false,
  isCharacterDevice: () => false,
  isSymbolicLink: () => false,
  isFIFO: () => false,
  isSocket: () => false,
  dev: 0,
  ino: 0,
  mode: 0,
  nlink: 0,
  uid: 0,
  gid: 0,
  rdev: 0,
  size: 0,
  blksize: 0,
  blocks: 0,
  atimeMs: 0,
  mtimeMs: 0,
  ctimeMs: 0,
  birthtimeMs: 0,
  atime: new Date(),
  mtime: new Date(),
  ctime: new Date(),
  birthtime: new Date(),
};

describe('nodeExists', () => {
  test('returns true when file exists (string path)', async () => {
    const mockStat = vi.spyOn(fs, 'stat').mockResolvedValue(mockStats);

    const result = await nodeExists('/path/to/existing/file.txt');

    expect(result).toBeTrue();
    expect(mockStat).toHaveBeenCalledWith('/path/to/existing/file.txt');

    mockStat.mockRestore();
  });

  test('returns false when file does not exist (string path)', async () => {
    const mockStat = vi.spyOn(fs, 'stat').mockRejectedValue(new Error('ENOENT'));

    const result = await nodeExists('/path/to/nonexistent/file.txt');

    expect(result).toBeFalse();
    expect(mockStat).toHaveBeenCalledWith('/path/to/nonexistent/file.txt');

    mockStat.mockRestore();
  });

  test('returns true when file exists (URL path)', async () => {
    const mockStat = vi.spyOn(fs, 'stat').mockResolvedValue(mockStats);
    const url = new URL('file:///path/to/existing/file.txt');

    const result = await nodeExists(url);

    expect(result).toBeTrue();
    expect(mockStat).toHaveBeenCalledWith('/path/to/existing/file.txt');

    mockStat.mockRestore();
  });

  test('returns false when file does not exist (URL path)', async () => {
    const mockStat = vi.spyOn(fs, 'stat').mockRejectedValue(new Error('ENOENT'));
    const url = new URL('file:///path/to/nonexistent/file.txt');

    const result = await nodeExists(url);

    expect(result).toBeFalse();
    expect(mockStat).toHaveBeenCalledWith('/path/to/nonexistent/file.txt');

    mockStat.mockRestore();
  });

  test('handles relative paths', async () => {
    const mockStat = vi.spyOn(fs, 'stat').mockResolvedValue(mockStats);

    const result = await nodeExists('./relative/path/file.txt');

    expect(result).toBeTrue();
    expect(mockStat).toHaveBeenCalledWith('./relative/path/file.txt');

    mockStat.mockRestore();
  });

  test('handles empty string path', async () => {
    const mockStat = vi.spyOn(fs, 'stat').mockRejectedValue(new Error('ENOENT'));

    const result = await nodeExists('');

    expect(result).toBeFalse();
    expect(mockStat).toHaveBeenCalledWith('');

    mockStat.mockRestore();
  });

  test('handles different error types gracefully', async () => {
    const mockStat = vi.spyOn(fs, 'stat').mockRejectedValue(new Error('Permission denied'));

    const result = await nodeExists('/restricted/file.txt');

    expect(result).toBeFalse();
    expect(mockStat).toHaveBeenCalledWith('/restricted/file.txt');

    mockStat.mockRestore();
  });

  test('works with directory paths', async () => {
    const mockStat = vi.spyOn(fs, 'stat').mockResolvedValue(mockStats);

    const result = await nodeExists('/path/to/directory');

    expect(result).toBeTrue();
    expect(mockStat).toHaveBeenCalledWith('/path/to/directory');

    mockStat.mockRestore();
  });
});
