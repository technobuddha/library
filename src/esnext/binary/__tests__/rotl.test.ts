import { rotl } from '../rotl.ts';

describe('rotl', () => {
  test('rotates 0 by any number of bits', () => {
    expect(rotl(0, 0)).toBe(0);
    expect(rotl(0, 1)).toBe(0);
    expect(rotl(0, 31)).toBe(0);
    expect(rotl(0, 32)).toBe(0);
  });

  test('rotates 1 by 1 bit', () => {
    expect(rotl(1, 1)).toBe(2);
  });

  test('rotates 1 by 31 bits', () => {
    expect(rotl(1, 31)).toBe(0x80000000);
  });

  test('rotates 0x80000000 by 1 bit', () => {
    expect(rotl(0x80000000, 1)).toBe(1);
  });

  test('rotates 0xFFFFFFFF by any bits', () => {
    expect(rotl(0xffffffff, 0)).toBe(0xffffffff);
    expect(rotl(0xffffffff, 1)).toBe(0xffffffff);
    expect(rotl(0xffffffff, 16)).toBe(0xffffffff);
    expect(rotl(0xffffffff, 31)).toBe(0xffffffff);
    expect(rotl(0xffffffff, 32)).toBe(0xffffffff);
  });

  test('rotates by 0 bits (identity)', () => {
    expect(rotl(0x12345678, 0)).toBe(0x12345678);
  });

  test('rotates by 4 bits', () => {
    expect(rotl(0x12345678, 4)).toBe(0x23456781);
  });

  test('rotates by 8 bits', () => {
    expect(rotl(0x12345678, 8)).toBe(0x34567812);
  });

  test('rotates by 16 bits', () => {
    expect(rotl(0x12345678, 16)).toBe(0x56781234);
  });

  test('rotates by 24 bits', () => {
    expect(rotl(0x12345678, 24)).toBe(0x78123456);
  });

  test('rotates by 32 bits (full rotation)', () => {
    expect(rotl(0x12345678, 32)).toBe(0x12345678);
  });

  test('rotates by more than 32 bits (should wrap)', () => {
    expect(rotl(0x12345678, 36)).toBe(rotl(0x12345678, 4));
    expect(rotl(0x12345678, 40)).toBe(rotl(0x12345678, 8));
  });

  test('rotates negative numbers', () => {
    expect(rotl(-1, 1)).toBe(4294967295);
    expect(rotl(-2, 1)).toBe(4294967293);
  });
});
