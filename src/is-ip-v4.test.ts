import { isIpV4 } from './is-ip-v4.ts';

describe('isIpV4', () => {
  test('returns true for valid IPv4 addresses', () => {
    expect(isIpV4('192.168.1.1')).toBeTrue();
    expect(isIpV4('0.0.0.0')).toBeTrue();
    expect(isIpV4('255.255.255.255')).toBeTrue();
    expect(isIpV4('127.0.0.1')).toBeTrue();
    expect(isIpV4('8.8.8.8')).toBeTrue();
  });

  test('returns false for invalid IPv4 addresses', () => {
    expect(isIpV4('256.256.256.256')).toBeFalse();
    expect(isIpV4('192.168.1')).toBeFalse();
    expect(isIpV4('192.168.1.1.1')).toBeFalse();
    expect(isIpV4('192.168.1.a')).toBeFalse();
    expect(isIpV4('')).toBeFalse();
    expect(isIpV4(' ')).toBeFalse();
    expect(isIpV4('example.com')).toBeFalse();
    expect(isIpV4('1234.123.123.123')).toBeFalse();
    expect(isIpV4('01.02.03.04')).toBeFalse(); // leading zeros are not valid in IPv4
  });

  test('returns false for IPv6 addresses', () => {
    expect(isIpV4('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeFalse();
    expect(isIpV4('::1')).toBeFalse();
  });
});
