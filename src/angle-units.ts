export type AngleUnit = 'degrees' | 'rads' | 'radians' | 'grads' | 'gradians' | 'turns';
export const angleUnits: Record<AngleUnit, number> = {
  degrees: 360,
  rads: Math.PI * 2,
  radians: Math.PI * 2,
  grads: 400,
  gradians: 400,
  turns: 1,
};
