import { singleLine } from './single-line.js';

describe('singleline', () => {
  test('should strip newlines', () => {
    expect(singleLine`abc
                                  def
                                  ghi`).toBe('abc def ghi');
  });

  test('should leave expressions alone', () => {
    expect(singleLine`abc ${'x'}
                                  def ${'\n'}
                                  ghi`).toBe('abc x def \n ghi');
  });
});
