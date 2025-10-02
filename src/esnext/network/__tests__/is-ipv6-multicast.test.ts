import { isIPV6Multicast } from '../is-ipv6-multicast.ts';

describe('isIPV6Multicast', () => {
  test('should return true for valid IPv6 multicast addresses', () => {
    expect(isIPV6Multicast('ff00::')).toBeTrue();
    expect(isIPV6Multicast('ff02::1')).toBeTrue();
  });

  test('should return false for non-multicast IPv6 addresses', () => {
    expect(isIPV6Multicast('2001:db8::')).toBeFalse();
    expect(isIPV6Multicast('fe80::1')).toBeFalse();
  });

  test('should return false for invalid IPv6 addresses', () => {
    expect(isIPV6Multicast('::g')).toBeFalse();
    expect(isIPV6Multicast('12345::')).toBeFalse();
  });
});
