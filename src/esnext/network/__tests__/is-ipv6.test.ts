import { isIPV6 } from '../is-ipv6.ts';

describe('isIPV6', () => {
  test('returns true for valid full IPv6 addresses', () => {
    expect(isIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeTrue();
    expect(isIPV6('2001:0db8:0000:0000:0000:0000:0000:0001')).toBeTrue();
    expect(isIPV6('FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF')).toBeTrue();
    expect(isIPV6('0000:0000:0000:0000:0000:0000:0000:0000')).toBeTrue();
  });

  test('returns true for valid compressed IPv6 addresses', () => {
    // Loopback
    expect(isIPV6('::1')).toBeTrue();
    // All zeros
    expect(isIPV6('::')).toBeTrue();
    // Leading compression
    expect(isIPV6('::8a2e:0370:7334')).toBeTrue();
    // Trailing compression
    expect(isIPV6('2001:db8:85a3::')).toBeTrue();
    // Middle compression
    expect(isIPV6('2001:db8::8a2e:370:7334')).toBeTrue();
    expect(isIPV6('2001:db8:85a3::8a2e:370:7334')).toBeTrue();
    // Mixed case
    expect(isIPV6('2001:DB8:85A3::8A2E:370:7334')).toBeTrue();
  });

  test('returns true for valid IPv4-mapped IPv6 addresses', () => {
    expect(isIPV6('::ffff:192.168.1.1')).toBeTrue();
    expect(isIPV6('::ffff:10.0.0.1')).toBeTrue();
    expect(isIPV6('::192.168.1.1')).toBeTrue();
    expect(isIPV6('2001:db8::192.168.1.1')).toBeTrue();
  });

  test('returns true for valid link-local and unique local addresses', () => {
    expect(isIPV6('fe80::1')).toBeTrue();
    expect(isIPV6('fe80::1234:5678:abcd')).toBeTrue();
    expect(isIPV6('fc00::1')).toBeTrue();
    expect(isIPV6('fd12:3456:789a:1::1')).toBeTrue();
  });

  test('returns false for invalid IPv6 addresses', () => {
    expect(isIPV6('')).toBeFalse();
    expect(isIPV6(' ')).toBeFalse();
    expect(isIPV6('invalid')).toBeFalse();
    expect(isIPV6('192.168.1.1')).toBeFalse();
    // Too many segments
    expect(isIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334:extra')).toBeFalse();
    // Multiple ::
    expect(isIPV6('2001::85a3::7334')).toBeFalse();
    // Invalid characters
    expect(isIPV6('2001:0db8:85g3::7334')).toBeFalse();
    // Too many hex digits in segment
    expect(isIPV6('2001:0db8:85a30::7334')).toBeFalse();
    // Missing segments without compression
    expect(isIPV6('2001:0db8:85a3')).toBeFalse();
  });

  test('returns false for malformed compressed addresses', () => {
    // Triple colon
    expect(isIPV6('2001:::7334')).toBeFalse();
    // Trailing single colon
    expect(isIPV6('2001:db8:')).toBeFalse();
    // Leading single colon
    expect(isIPV6(':2001:db8')).toBeFalse();
  });

  test('returns false for invalid IPv4-mapped addresses', () => {
    // Invalid IPv4 part
    expect(isIPV6('::ffff:256.256.256.256')).toBeFalse();
    expect(isIPV6('::ffff:192.168.1')).toBeFalse();
    expect(isIPV6('::ffff:192.168.1.1.1')).toBeFalse();
  });
});
