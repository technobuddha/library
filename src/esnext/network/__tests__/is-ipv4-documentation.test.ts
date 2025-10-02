import { isIPV4Documentation } from '../is-ipv4-documentation.ts';

describe('isIPV4Documentation', () => {
  test('should return true for valid IPv4 documentation addresses', () => {
    expect(isIPV4Documentation('192.0.2.0')).toBeTrue();
    expect(isIPV4Documentation('198.51.100.0')).toBeTrue();
    expect(isIPV4Documentation('203.0.113.0')).toBeTrue();
  });

  test('should return false for non-documentation IPv4 addresses', () => {
    expect(isIPV4Documentation('192.168.1.1')).toBeFalse();
    expect(isIPV4Documentation('10.0.0.1')).toBeFalse();
  });

  test('should return false for invalid IPv4 addresses', () => {
    expect(isIPV4Documentation('256.256.256.256')).toBeFalse();
    expect(isIPV4Documentation('abc.def.ghi.jkl')).toBeFalse();
  });
});
