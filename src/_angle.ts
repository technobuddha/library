export type AngleUnit = keyof typeof units;
export const units = {
    'degrees':  360,
    'rads':     Math.PI * 2,
    'radians':  Math.PI * 2,
    'grads':    400,
    'gradians': 400,
    'turns':    1,
};
