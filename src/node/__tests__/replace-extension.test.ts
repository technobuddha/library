import { replaceExtension } from '../replace-extension.ts';

describe('replaceExtension', () => {
  test('should replace file extension with new extension', () => {
    expect(replaceExtension('/path/to/file.txt', '.js')).toBe('/path/to/file.js');
    expect(replaceExtension('document.pdf', '.docx')).toBe('document.docx');
    expect(replaceExtension('image.png', '.jpg')).toBe('image.jpg');
  });

  test('should handle extension without leading dot', () => {
    expect(replaceExtension('/path/to/file.txt', 'html')).toBe('/path/to/file.html');
    expect(replaceExtension('script.js', 'ts')).toBe('script.ts');
  });

  test('should remove extension when no new extension provided', () => {
    expect(replaceExtension('/path/to/file.txt')).toBe('/path/to/file');
    expect(replaceExtension('document.pdf')).toBe('document');
    expect(replaceExtension('image.png')).toBe('image');
  });

  test('should handle files without extension', () => {
    expect(replaceExtension('/path/to/file', '.txt')).toBe('/path/to/file.txt');
    expect(replaceExtension('README', '.md')).toBe('README.md');
  });

  test('should handle complex file paths', () => {
    expect(replaceExtension('/home/user/documents/report.docx', '.pdf')).toBe(
      '/home/user/documents/report.pdf',
    );
    expect(replaceExtension('./src/components/Button.tsx', '.js')).toBe(
      './src/components/Button.js',
    );
  });

  test('should handle files with multiple dots', () => {
    expect(replaceExtension('archive.tar.gz', '.zip')).toBe('archive.tar.zip');
    expect(replaceExtension('config.json.bak', '.json')).toBe('config.json.json');
  });

  test('should handle relative paths', () => {
    expect(replaceExtension('../file.txt', '.md')).toBe('../file.md');
    expect(replaceExtension('./folder/file.js', '.ts')).toBe('./folder/file.ts');
  });

  test('should handle root level files', () => {
    expect(replaceExtension('file.txt', '.js')).toBe('file.js');
    expect(replaceExtension('script.py', '.rb')).toBe('script.rb');
  });

  test('should handle empty extension replacement', () => {
    expect(replaceExtension('file.txt', '')).toBe('file');
    expect(replaceExtension('/path/file.js', '')).toBe('/path/file');
  });

  test('should preserve path separators', () => {
    expect(replaceExtension('/unix/path/file.txt', '.js')).toBe('/unix/path/file.js');
    expect(replaceExtension('relative/path/file.txt', '.js')).toBe('relative/path/file.js');
  });
});
