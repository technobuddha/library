import { measure, measureWindow } from './measure.js';

describe('measure', () => {
  test('measure an element', () => {
    const node = document.createElement('div');

    node.setAttribute('style', 'width: 100px; height: 100px;');
    document.body.appendChild(node);
    expect(measure(node)).toEqual({ height: 0, scrollbarHeight: 0, scrollbarWidth: 0, width: 0 });
  });

  test('measure the window', () => {
    expect(measureWindow()).toEqual({
      height: 768,
      scrollbarHeight: 0,
      scrollbarWidth: 0,
      width: 1024,
    });
  });
});
