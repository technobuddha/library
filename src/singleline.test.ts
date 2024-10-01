import singleline from './singleline.js';

describe('singleline', () => {
  test('should strip newlines', () => {
    expect(singleline`abc
                                  def
                                  ghi`).toBe('abc def ghi');
  });

  test('should leave expressions alone', () => {
    expect(singleline`abc ${'x'}
                                  def ${'\n'}
                                  ghi`).toBe('abc x def \n ghi');
  });
});
