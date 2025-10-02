import { isIPV6Local } from '../is-ipv6-local.ts';

describe('isIPV6Local', () => {
  test('should return true for loopback address', () => {
    expect(isIPV6Local('::1')).toBeTrue();
  });

  test('should return true for unique local addresses (fc00::/7)', () => {
    // fc00::/8
    expect(isIPV6Local('fc00::1')).toBeTrue();
    expect(isIPV6Local('fc00:1234:5678:9abc:def0:1234:5678:9abc')).toBeTrue();
    expect(isIPV6Local('fcff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBeTrue();
    // fd00::/8
    expect(isIPV6Local('fd00::1')).toBeTrue();
    expect(isIPV6Local('fd12:3456:789a:1::1')).toBeTrue();
    expect(isIPV6Local('fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBeTrue();
  });

  test('should return true for link-local addresses (fe80::/10)', () => {
    expect(isIPV6Local('fe80::1')).toBeTrue();
    expect(isIPV6Local('fe80::1234:5678:abcd')).toBeTrue();
    expect(isIPV6Local('fe80:0000:0000:0000:0204:61ff:fe9d:f156')).toBeTrue();
    // fe80-febf range (fe80::/10)
    expect(isIPV6Local('fe8f::')).toBeTrue();
    expect(isIPV6Local('fe9a::1')).toBeTrue();
    expect(isIPV6Local('feaf::1')).toBeTrue();
    expect(isIPV6Local('febf::1')).toBeTrue();
  });

  test('should return false for global unicast addresses', () => {
    expect(isIPV6Local('2001:0db8:85a3::8a2e:370:7334')).toBeFalse();
    expect(isIPV6Local('2606:2800:220:1:248:1893:25c8:1946')).toBeFalse();
    expect(isIPV6Local('2001:4860:4860::8888')).toBeFalse();
  });

  test('should return false for multicast addresses (ff00::/8)', () => {
    expect(isIPV6Local('ff00::1')).toBeFalse();
    expect(isIPV6Local('ff02::1')).toBeFalse();
    expect(isIPV6Local('ff05::1:3')).toBeFalse();
  });

  test('should return false for documentation addresses (2001:db8::/32)', () => {
    expect(isIPV6Local('2001:db8::1')).toBeFalse();
    expect(isIPV6Local('2001:db8:85a3::8a2e:370:7334')).toBeFalse();
  });

  test('should return false for invalid IPv6 addresses', () => {
    expect(isIPV6Local('')).toBeFalse();
    expect(isIPV6Local('invalid')).toBeFalse();
    expect(isIPV6Local('192.168.1.1')).toBeFalse();
    expect(isIPV6Local('2001:::7334')).toBeFalse();
  });

  test('should return false for addresses just outside link-local range', () => {
    // fec0::/10 is outside fe80::/10
    expect(isIPV6Local('fec0::1')).toBeFalse();
    expect(isIPV6Local('fed0::1')).toBeFalse();
    expect(isIPV6Local('fee0::1')).toBeFalse();
    expect(isIPV6Local('fef0::1')).toBeFalse();
  });

  test('should return false for addresses just outside unique local range', () => {
    // fb00::/8 is outside fc00::/7
    expect(isIPV6Local('fb00::1')).toBeFalse();
    expect(isIPV6Local('fbff:ffff:ffff:ffff:ffff:ffff:ffff:ffff')).toBeFalse();
    // fe00::/8 is outside fc00::/7
    expect(isIPV6Local('fe00::1')).toBeFalse();
    expect(isIPV6Local('fe7f::1')).toBeFalse();
  });
});
