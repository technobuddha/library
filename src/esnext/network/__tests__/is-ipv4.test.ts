import { isIPV4 } from '../is-ipv4.ts';

describe('isIPV4', () => {
  test('returns true for valid IPv4 addresses', () => {
    expect(isIPV4('192.168.1.1')).toBeTrue();
    expect(isIPV4('0.0.0.0')).toBeTrue();
    expect(isIPV4('255.255.255.255')).toBeTrue();
    expect(isIPV4('127.0.0.1')).toBeTrue();
    expect(isIPV4('8.8.8.8')).toBeTrue();
  });

  test('returns false for invalid IPv4 addresses', () => {
    expect(isIPV4('256.256.256.256')).toBeFalse();
    expect(isIPV4('192.168.1')).toBeFalse();
    expect(isIPV4('192.168.1.1.1')).toBeFalse();
    expect(isIPV4('192.168.1.a')).toBeFalse();
    expect(isIPV4('')).toBeFalse();
    expect(isIPV4(' ')).toBeFalse();
    expect(isIPV4('example.com')).toBeFalse();
    expect(isIPV4('1234.123.123.123')).toBeFalse();
    expect(isIPV4('01.02.03.04')).toBeFalse(); // leading zeros are not valid in IPv4
    expect(isIPV4('192.168.01.1')).toBeFalse();
    expect(isIPV4('010.0.0.1')).toBeFalse();
  });

  test('returns false for IPv6 addresses', () => {
    expect(isIPV4('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeFalse();
    expect(isIPV4('::1')).toBeFalse();
  });
});
