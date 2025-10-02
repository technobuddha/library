import { isIPV6Loopback } from '../is-ipv6-loopback.ts';

describe('isIPV6Loopback', () => {
  test('should return true for valid IPv6 loopback addresses', () => {
    expect(isIPV6Loopback('::1')).toBeTrue();
  });

  test('should return false for non-loopback IPv6 addresses', () => {
    expect(isIPV6Loopback('2001:db8::')).toBeFalse();
    expect(isIPV6Loopback('fe80::1')).toBeFalse();
  });

  test('should return false for invalid IPv6 addresses', () => {
    expect(isIPV6Loopback('::g')).toBeFalse();
    expect(isIPV6Loopback('12345::')).toBeFalse();
  });
});
