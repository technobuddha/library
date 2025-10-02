import { rotr } from '../rotr.ts';

describe('rotr', () => {
  test('rotates 0 by any number of bits returns 0', () => {
    expect(rotr(0, 0)).toBe(0);
    expect(rotr(0, 1)).toBe(0);
    expect(rotr(0, 31)).toBe(0);
    expect(rotr(0, 32)).toBe(0);
  });

  test('rotates 1 by 1 bit', () => {
    expect(rotr(1, 1)).toBe(0x80000000);
  });

  test('rotates 0x80000000 by 1 bit', () => {
    expect(rotr(0x80000000, 1)).toBe(0x40000000);
  });

  test('rotates 0x12345678 by 4 bits', () => {
    expect(rotr(0x12345678, 4)).toBe(0x81234567);
  });

  test('rotates 0xFFFFFFFF by any bits returns 0xFFFFFFFF', () => {
    expect(rotr(0xffffffff, 0)).toBe(0xffffffff);
    expect(rotr(0xffffffff, 1)).toBe(0xffffffff);
    expect(rotr(0xffffffff, 16)).toBe(0xffffffff);
    expect(rotr(0xffffffff, 31)).toBe(0xffffffff);
    expect(rotr(0xffffffff, 32)).toBe(0xffffffff);
  });

  test('rotates by 0 bits returns the same number', () => {
    expect(rotr(0x12345678, 0)).toBe(0x12345678);
    expect(rotr(0x80000000, 0)).toBe(0x80000000);
  });

  test('rotates by 32 bits returns the same number', () => {
    expect(rotr(0x12345678, 32)).toBe(0x12345678);
    expect(rotr(0x80000000, 32)).toBe(0x80000000);
  });

  test('rotates by more than 32 bits is equivalent to bits % 32', () => {
    expect(rotr(0x12345678, 36)).toBe(rotr(0x12345678, 4));
    expect(rotr(0x12345678, 64)).toBe(rotr(0x12345678, 0));
  });

  test('rotates negative numbers', () => {
    expect(rotr(-1, 1)).toBe(0xffffffff);
    expect(rotr(-2, 1)).toBe(0x7fffffff);
  });
});
