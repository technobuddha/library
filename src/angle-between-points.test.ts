import { angleBetweenPoints } from './angle-between-points.ts';

describe('angleBetweenPoints', () => {
  test('call with objects', () => {
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: 0 })).toBe((0 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: 10 })).toBe(Number(Math.PI) / 4);
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
    expect(angleBetweenPoints({ x: -10, y: -10 }, { x: 0, y: 0 })).toBe(Number(Math.PI) / 4);
    expect(angleBetweenPoints({ x: 0, y: -10 }, { x: 0, y: 0 })).toBe((2 * Math.PI) / 4);
    expect(angleBetweenPoints({ x: 10, y: -10 }, { x: 0, y: 0 })).toBe((3 * Math.PI) / 4);
  });
  test('output units', () => {
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: 0 }, 'degrees')).toBe(0);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: 10 }, 'degrees')).toBe(45);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 0, y: 10 }, 'degrees')).toBe(90);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: -10, y: 10 }, 'degrees')).toBe(135);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: -10, y: 0 }, 'degrees')).toBe(180);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: -10, y: -10 }, 'degrees')).toBe(225);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 0, y: -10 }, 'degrees')).toBe(270);
    expect(angleBetweenPoints({ x: 0, y: 0 }, { x: 10, y: -10 }, 'degrees')).toBe(315);
    expect(angleBetweenPoints({ x: 10, y: 0 }, { x: 0, y: 0 }, 'degrees')).toBe(180);
    expect(angleBetweenPoints({ x: 10, y: 10 }, { x: 0, y: 0 }, 'degrees')).toBe(225);
    expect(angleBetweenPoints({ x: 0, y: 10 }, { x: 0, y: 0 }, 'degrees')).toBe(270);
    expect(angleBetweenPoints({ x: -10, y: 10 }, { x: 0, y: 0 }, 'degrees')).toBe(315);
    expect(angleBetweenPoints({ x: -10, y: 0 }, { x: 0, y: 0 }, 'degrees')).toBe(0);
    expect(angleBetweenPoints({ x: -10, y: -10 }, { x: 0, y: 0 }, 'degrees')).toBe(45);
    expect(angleBetweenPoints({ x: 0, y: -10 }, { x: 0, y: 0 }, 'degrees')).toBe(90);
    expect(angleBetweenPoints({ x: 10, y: -10 }, { x: 0, y: 0 }, 'degrees')).toBe(135);
  });
});
