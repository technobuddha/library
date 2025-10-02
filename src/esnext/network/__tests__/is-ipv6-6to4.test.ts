import { isIPV66to4 } from '../is-ipv6-6to4.ts';

describe('isIPV66to4', () => {
  test('should return true for valid IPv6 6to4 addresses', () => {
    expect(isIPV66to4('2002:c000:0204::')).toBeTrue();
    expect(isIPV66to4('2002:ac10:fe01::')).toBeTrue();
  });

  test('should return false for non-6to4 IPv6 addresses', () => {
    expect(isIPV66to4('2001:db8::')).toBeFalse();
    expect(isIPV66to4('fe80::1')).toBeFalse();
  });

  test('should return false for invalid IPv6 addresses', () => {
    expect(isIPV66to4('::g')).toBeFalse();
    expect(isIPV66to4('12345::')).toBeFalse();
  });
});
