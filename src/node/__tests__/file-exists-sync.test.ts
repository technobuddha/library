/* eslint-disable n/no-sync */
import fs from 'node:fs';

import { fileExistsSync } from '../file-exists-sync.ts';

describe('fileExistsSync', () => {
  test('returns true when file exists (string path)', () => {
    const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(true);

    const result = fileExistsSync('/path/to/existing/file.txt');

    expect(result).toBeTrue();
    expect(mockExistsSync).toHaveBeenCalledWith('/path/to/existing/file.txt');

    mockExistsSync.mockRestore();
  });

  test('returns false when file does not exist (string path)', () => {
    const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = fileExistsSync('/path/to/nonexistent/file.txt');

    expect(result).toBeFalse();
    expect(mockExistsSync).toHaveBeenCalledWith('/path/to/nonexistent/file.txt');

    mockExistsSync.mockRestore();
  });

  test('returns true when file exists (URL path)', () => {
    const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    const url = new URL('file:///path/to/existing/file.txt');

    const result = fileExistsSync(url);

    expect(result).toBeTrue();
    expect(mockExistsSync).toHaveBeenCalledWith('/path/to/existing/file.txt');

    mockExistsSync.mockRestore();
  });

  test('returns false when file does not exist (URL path)', () => {
    const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    const url = new URL('file:///path/to/nonexistent/file.txt');

    const result = fileExistsSync(url);

    expect(result).toBeFalse();
    expect(mockExistsSync).toHaveBeenCalledWith('/path/to/nonexistent/file.txt');

    mockExistsSync.mockRestore();
  });

  test('handles relative paths', () => {
    const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(true);

    const result = fileExistsSync('./relative/path/file.txt');

    expect(result).toBeTrue();
    expect(mockExistsSync).toHaveBeenCalledWith('./relative/path/file.txt');

    mockExistsSync.mockRestore();
  });

  test('handles empty string path', () => {
    const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = fileExistsSync('');

    expect(result).toBeFalse();
    expect(mockExistsSync).toHaveBeenCalledWith('');

    mockExistsSync.mockRestore();
  });

  test('works with directory paths', () => {
    const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(true);

    const result = fileExistsSync('/path/to/directory');

    expect(result).toBeTrue();
    expect(mockExistsSync).toHaveBeenCalledWith('/path/to/directory');

    mockExistsSync.mockRestore();
  });

  test('handles file URLs with special characters', () => {
    const mockExistsSync = vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    const url = new URL('file:///home/user/my%20file.txt');

    const result = fileExistsSync(url);

    expect(result).toBeTrue();
    expect(mockExistsSync).toHaveBeenCalledWith('/home/user/my file.txt');

    mockExistsSync.mockRestore();
  });
});
