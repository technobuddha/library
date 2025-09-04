import { isIPV4Local } from './is-ip-v4-local.ts';

describe('isIPV4Local', () => {
  test('should return true for 10.0.0.0/8 addresses', () => {
    expect(isIPV4Local('10.0.0.1')).toBeTrue();
    expect(isIPV4Local('10.255.255.255')).toBeTrue();
    expect(isIPV4Local('10.123.45.67')).toBeTrue();
  });

  test('should return true for 172.16.0.0/12 addresses', () => {
    expect(isIPV4Local('172.16.0.1')).toBeTrue();
    expect(isIPV4Local('172.31.255.255')).toBeTrue();
    expect(isIPV4Local('172.20.10.5')).toBeTrue();
  });

  test('should return true for 192.168.0.0/16 addresses', () => {
    expect(isIPV4Local('192.168.0.1')).toBeTrue();
    expect(isIPV4Local('192.168.255.255')).toBeTrue();
    expect(isIPV4Local('192.168.100.100')).toBeTrue();
  });

  test('should return false for public IPv4 addresses', () => {
    expect(isIPV4Local('8.8.8.8')).toBeFalse();
    expect(isIPV4Local('1.1.1.1')).toBeFalse();
    expect(isIPV4Local('123.45.67.89')).toBeFalse();
  });

  test('should return false for invalid IPv4 addresses', () => {
    expect(isIPV4Local('999.999.999.999')).toBeFalse();
    expect(isIPV4Local('abc.def.ghi.jkl')).toBeFalse();
    expect(isIPV4Local('')).toBeFalse();
    expect(isIPV4Local('192.168.1')).toBeFalse();
    expect(isIPV4Local('192.168.1.256')).toBeFalse();
  });

  test('should return false for IPv6 addresses', () => {
    expect(isIPV4Local('::1')).toBeFalse();
    expect(isIPV4Local('fe80::1')).toBeFalse();
    expect(isIPV4Local('2001:db8::1')).toBeFalse();
  });
});
