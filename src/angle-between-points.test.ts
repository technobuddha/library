/* eslint-disable no-implicit-coercion */

import angleBetweenPoints from './angle-between-points.js';

describe('angleBetweenPoints', () => {
  test('call with objects', () => {
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: 0 })).toBe((0 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: 10 })).toBe((1 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 0, y: 10 })).toBe((2 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: -10, y: 10 })).toBe((3 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: -10, y: 0 })).toBe((4 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: -10, y: -10 })).toBe((5 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 0, y: -10 })).toBe((6 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: -10 })).toBe((7 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 10, y: 0 }, { x: 0, y: 0 })).toBe((4 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 10, y: 10 }, { x: 0, y: 0 })).toBe((5 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 10 }, { x: 0, y: 0 })).toBe((6 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: -10, y: 10 }, { x: 0, y: 0 })).toBe((7 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: -10, y: 0 }, { x: 0, y: 0 })).toBe((0 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: -10, y: -10 }, { x: 0, y: 0 })).toBe((1 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: -10 }, { x: 0, y: 0 })).toBe((2 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 10, y: -10 }, { x: 0, y: 0 })).toBe((3 * Math.PI) / 4);
  });
});
