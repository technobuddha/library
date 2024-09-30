export const isOct = (c: number | undefined): boolean => c !== undefined && c >= 0x30 && c <= 0x37;
export const isHex = (c: number | undefined): boolean =>
  c !== undefined &&
  ((c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66));

export const escx2 = (c: number): string => `\\x${c.toString(16).padStart(2, '0')}`;
export const escu4 = (c: number): string => `\\u${c.toString(16).padStart(4, '0')}`;
export const escU8 = (c: number): string => `\\U${c.toString(16).padStart(8, '0')}`;
export const escUU = (c: number): string => `\\u{${c.toString(16)}}`;
