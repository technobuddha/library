import { measureWindow } from '../measure-window.ts';

describe('measure', () => {
  test('measure the window', () => {
    // In the test environment the window is always 1024x768 with no scrollbars
    expect(measureWindow()).toEqual({
      height: 768,
      width: 1024,
    });
  });
});
