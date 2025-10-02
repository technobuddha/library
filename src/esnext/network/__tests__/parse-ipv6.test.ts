import { parseIPV6 } from '../parse-ipv6.ts';

describe('parseIPV6', () => {
  test('parses full IPv6 address', () => {
    const result = parseIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    expect(result).toEqual([0x2001, 0x0db8, 0x85a3, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334]);
  });

  test('parses IPv6 address with :: shorthand', () => {
    const result = parseIPV6('2001:db8::8a2e:370:7334');
    expect(result).toEqual([0x2001, 0x0db8, 0x0000, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334]);
  });

  test('parses IPv6 address with :: at the beginning', () => {
    const result = parseIPV6('::1');
    expect(result).toEqual([0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0001]);
  });

  test('parses IPv6 address with :: at the end', () => {
    const result = parseIPV6('2001:db8::');
    expect(result).toEqual([0x2001, 0x0db8, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000]);
  });

  test('parses IPv6 loopback address', () => {
    const result = parseIPV6('::1');
    expect(result).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
  });

  test('parses IPv6 address with all zeros', () => {
    const result = parseIPV6('::');
    expect(result).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('returns undefined for multiple :: in address', () => {
    const result = parseIPV6('2001::db8::1');
    expect(result).toBeUndefined();
  });

  test('returns undefined for too many groups', () => {
    const result = parseIPV6('1:2:3:4:5:6:7:8:9');
    expect(result).toBeUndefined();
  });

  test('parses IPv6 address with lowercase hex', () => {
    const result = parseIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    expect(result).toEqual([0x2001, 0x0db8, 0x85a3, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334]);
  });

  test('parses IPv6 address with uppercase hex', () => {
    const result = parseIPV6('2001:0DB8:85A3:0000:0000:8A2E:0370:7334');
    expect(result).toEqual([0x2001, 0x0db8, 0x85a3, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334]);
  });

  test('handles empty groups as zeros', () => {
    const result = parseIPV6('2001:db8::8a2e:0:0:7334');
    expect(result).toEqual([0x2001, 0x0db8, 0x0000, 0x0000, 0x8a2e, 0x0000, 0x0000, 0x7334]);
  });

  test('parses IPv4-mapped IPv6 address (::ffff:192.0.2.128)', () => {
    const result = parseIPV6('::ffff:192.0.2.128');
    // 192.0.2.128 -> 0xc000 (192*256 + 0) and 0x0280 (2*256 + 128)
    expect(result).toEqual([0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0xffff, 0xc000, 0x0280]);
  });

  test('parses IPv4-mapped IPv6 address with compression (64:ff9b::192.0.2.33)', () => {
    const result = parseIPV6('64:ff9b::192.0.2.33');
    // 192.0.2.33 -> 0xc000 (192*256 + 0) and 0x0221 (2*256 + 33)
    expect(result).toEqual([0x0064, 0xff9b, 0x0000, 0x0000, 0x0000, 0x0000, 0xc000, 0x0221]);
  });

  test('parses IPv4-mapped IPv6 with full prefix (::ffff:0:192.168.1.1)', () => {
    const result = parseIPV6('::ffff:0:192.168.1.1');
    // 192.168.1.1 -> 0xc0a8 (192*256 + 168) and 0x0101 (1*256 + 1)
    expect(result).toEqual([0x0000, 0x0000, 0x0000, 0x0000, 0xffff, 0x0000, 0xc0a8, 0x0101]);
  });

  test('parses IPv4-compatible IPv6 address (::192.0.2.1)', () => {
    const result = parseIPV6('::192.0.2.1');
    // 192.0.2.1 -> 0xc000 (192*256 + 0) and 0x0201 (2*256 + 1)
    expect(result).toEqual([0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0xc000, 0x0201]);
  });

  test('returns undefined for invalid IPv4 in IPv6', () => {
    expect(parseIPV6('::ffff:256.0.0.1')).toBeUndefined();
    expect(parseIPV6('::ffff:192.168.1.256')).toBeUndefined();
    expect(parseIPV6('::ffff:192.168.1')).toBeUndefined();
    expect(parseIPV6('::ffff:192.168.1.1.1')).toBeUndefined();
  });

  test('parses well-known IPv4-mapped addresses', () => {
    // Loopback
    const loopback = parseIPV6('::ffff:127.0.0.1');
    expect(loopback).toEqual([0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0xffff, 0x7f00, 0x0001]);

    // Private network
    const private1 = parseIPV6('::ffff:10.0.0.1');
    expect(private1).toEqual([0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0xffff, 0x0a00, 0x0001]);

    // Documentation
    const doc = parseIPV6('::ffff:192.0.2.0');
    expect(doc).toEqual([0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0xffff, 0xc000, 0x0200]);
  });
});
