import { isIPV4Local } from '../is-ipv4-local.ts';

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

  test('should return false for leading zeros in private ranges', () => {
    expect(isIPV4Local('010.0.0.1')).toBeFalse();
    expect(isIPV4Local('10.01.0.1')).toBeFalse();
    expect(isIPV4Local('172.016.0.1')).toBeFalse();
    expect(isIPV4Local('192.168.01.1')).toBeFalse();
  });

  test('should return false for boundary values outside private ranges', () => {
    // Just below 172.16.0.0/12
    expect(isIPV4Local('172.15.255.255')).toBeFalse();
    // Just above 172.16.0.0/12
    expect(isIPV4Local('172.32.0.0')).toBeFalse();
    // Not in 10.0.0.0/8
    expect(isIPV4Local('11.0.0.1')).toBeFalse();
    expect(isIPV4Local('9.255.255.255')).toBeFalse();
  });

  test('should return false for loopback addresses (127.x.x.x)', () => {
    // Loopback is not considered "local" in the private network sense
    expect(isIPV4Local('127.0.0.1')).toBeFalse();
    expect(isIPV4Local('127.255.255.255')).toBeFalse();
  });

  test('should return false for link-local addresses (169.254.x.x)', () => {
    // Link-local is not considered "local" in the private network sense
    expect(isIPV4Local('169.254.0.1')).toBeFalse();
    expect(isIPV4Local('169.254.255.255')).toBeFalse();
  });
});
