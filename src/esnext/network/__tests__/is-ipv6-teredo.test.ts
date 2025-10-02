import { isIPV6Teredo } from '../is-ipv6-teredo.ts';

describe('isIPV6Teredo', () => {
  test('should return true for valid IPv6 Teredo addresses', () => {
    expect(isIPV6Teredo('2001::')).toBeTrue();
    expect(isIPV6Teredo('2001:0000:4136:e378:8000:63bf:3fff:fdd2')).toBeTrue();
  });

  test('should return false for non-Teredo IPv6 addresses', () => {
    expect(isIPV6Teredo('2001:db8::')).toBeFalse();
    expect(isIPV6Teredo('fe80::1')).toBeFalse();
  });

  test('should return false for invalid IPv6 addresses', () => {
    expect(isIPV6Teredo('::g')).toBeFalse();
    expect(isIPV6Teredo('12345::')).toBeFalse();
  });
});
