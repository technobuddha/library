import { isIPV4Loopback } from '../is-ipv4-loopback.ts';

describe('isIPV4Loopback', () => {
  test('should return true for valid IPv4 loopback addresses', () => {
    expect(isIPV4Loopback('127.0.0.1')).toBeTrue();
    expect(isIPV4Loopback('127.255.255.255')).toBeTrue();
  });

  test('should return false for non-loopback IPv4 addresses', () => {
    expect(isIPV4Loopback('192.168.1.1')).toBeFalse();
    expect(isIPV4Loopback('10.0.0.1')).toBeFalse();
  });

  test('should return false for invalid IPv4 addresses', () => {
    expect(isIPV4Loopback('256.256.256.256')).toBeFalse();
    expect(isIPV4Loopback('abc.def.ghi.jkl')).toBeFalse();
  });
});
