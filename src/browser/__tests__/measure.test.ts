import { measure } from '../measure.ts';

describe('measure', () => {
  test('measure an element', () => {
    const node = document.createElement('div');

    node.setAttribute('style', 'width: 100px; height: 100px;');
    document.body.appendChild(node);
    expect(measure(node)).toEqual({ height: 0, width: 0 });
  });
});
