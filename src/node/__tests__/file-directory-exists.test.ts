import fs from 'node:fs';
import path from 'node:path';

import { directoryExists } from '../directory-exists.ts';
import { directoryExistsSync } from '../directory-exists-sync.ts';
import { fileExists } from '../file-exists.ts';
import { fileExistsSync } from '../file-exists-sync.ts';

const testDir = path.join(import.meta.dirname, '.test-fixtures');
const testFilePath = path.join(testDir, 'test-file.txt');
const testDirPath = path.join(testDir, 'test-directory');
const nonExistentFilePath = path.join(testDir, 'non-existent-file.txt');
const nonExistentDirPath = path.join(testDir, 'non-existent-directory');

describe('File and Directory Existence Tests', () => {
  beforeAll(() => {
    // Create test fixtures directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Create test file
    fs.writeFileSync(testFilePath, 'test content');

    // Create test directory
    if (!fs.existsSync(testDirPath)) {
      fs.mkdirSync(testDirPath, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up test fixtures
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }

    if (fs.existsSync(testDirPath)) {
      fs.rmdirSync(testDirPath);
    }

    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  describe('fileExistsSync', () => {
    test('returns true for existing file with string path', () => {
      expect(fileExistsSync(testFilePath)).toBeTrue();
    });

    test('returns false for non-existent file', () => {
      expect(fileExistsSync(nonExistentFilePath)).toBeFalse();
    });

    test('returns false when path is a directory', () => {
      expect(fileExistsSync(testDirPath)).toBeFalse();
    });

    test('returns true for existing file with URL', () => {
      const fileUrl = new URL(`file://${testFilePath}`);
      expect(fileExistsSync(fileUrl)).toBeTrue();
    });

    test('returns false for non-existent path with URL', () => {
      const fileUrl = new URL(`file://${nonExistentFilePath}`);
      expect(fileExistsSync(fileUrl)).toBeFalse();
    });
  });

  describe('fileExists', () => {
    test('returns true for existing file with string path', async () => {
      const exists = await fileExists(testFilePath);
      expect(exists).toBeTrue();
    });

    test('returns false for non-existent file', async () => {
      const exists = await fileExists(nonExistentFilePath);
      expect(exists).toBeFalse();
    });

    test('returns false when path is a directory', async () => {
      const exists = await fileExists(testDirPath);
      expect(exists).toBeFalse();
    });

    test('returns true for existing file with URL', async () => {
      const fileUrl = new URL(`file://${testFilePath}`);
      const exists = await fileExists(fileUrl);
      expect(exists).toBeTrue();
    });

    test('returns false for non-existent path with URL', async () => {
      const fileUrl = new URL(`file://${nonExistentFilePath}`);
      const exists = await fileExists(fileUrl);
      expect(exists).toBeFalse();
    });
  });

  describe('directoryExistsSync', () => {
    test('returns true for existing directory with string path', () => {
      expect(directoryExistsSync(testDirPath)).toBeTrue();
    });

    test('returns false for non-existent directory', () => {
      expect(directoryExistsSync(nonExistentDirPath)).toBeFalse();
    });

    test('returns false when path is a file', () => {
      expect(directoryExistsSync(testFilePath)).toBeFalse();
    });

    test('returns true for existing directory with URL', () => {
      const dirUrl = new URL(`file://${testDirPath}`);
      expect(directoryExistsSync(dirUrl)).toBeTrue();
    });

    test('returns false for non-existent path with URL', () => {
      const dirUrl = new URL(`file://${nonExistentDirPath}`);
      expect(directoryExistsSync(dirUrl)).toBeFalse();
    });
  });

  describe('directoryExists', () => {
    test('returns true for existing directory with string path', async () => {
      const exists = await directoryExists(testDirPath);
      expect(exists).toBeTrue();
    });

    test('returns false for non-existent directory', async () => {
      const exists = await directoryExists(nonExistentDirPath);
      expect(exists).toBeFalse();
    });

    test('returns false when path is a file', async () => {
      const exists = await directoryExists(testFilePath);
      expect(exists).toBeFalse();
    });

    test('returns true for existing directory with URL', async () => {
      const dirUrl = new URL(`file://${testDirPath}`);
      const exists = await directoryExists(dirUrl);
      expect(exists).toBeTrue();
    });

    test('returns false for non-existent path with URL', async () => {
      const dirUrl = new URL(`file://${nonExistentDirPath}`);
      const exists = await directoryExists(dirUrl);
      expect(exists).toBeFalse();
    });
  });
});
