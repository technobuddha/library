import { isIPV6Documentation } from '../is-ipv6-documentation.ts';

describe('isIPV6Documentation', () => {
  test('should return true for valid IPv6 documentation addresses', () => {
    expect(isIPV6Documentation('2001:db8::')).toBeTrue();
  });

  test('should return false for non-documentation IPv6 addresses', () => {
    expect(isIPV6Documentation('2001:0db8:85a3::8a2e:0370:7334')).toBeTrue();
    expect(isIPV6Documentation('fe80::1')).toBeFalse();
  });

  test('should return false for invalid IPv6 addresses', () => {
    expect(isIPV6Documentation('::g')).toBeFalse();
    expect(isIPV6Documentation('12345::')).toBeFalse();
  });
});
