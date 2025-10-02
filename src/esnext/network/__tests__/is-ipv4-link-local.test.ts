import { isIPV4LinkLocal } from '../is-ipv4-link-local.ts';

describe('isIPV4LinkLocal', () => {
  test('should return true for valid IPv4 link-local addresses', () => {
    expect(isIPV4LinkLocal('169.254.0.1')).toBeTrue();
    expect(isIPV4LinkLocal('169.254.255.255')).toBeTrue();
  });

  test('should return false for non-link-local IPv4 addresses', () => {
    expect(isIPV4LinkLocal('192.168.1.1')).toBeFalse();
    expect(isIPV4LinkLocal('10.0.0.1')).toBeFalse();
  });

  test('should return false for invalid IPv4 addresses', () => {
    expect(isIPV4LinkLocal('256.256.256.256')).toBeFalse();
    expect(isIPV4LinkLocal('abc.def.ghi.jkl')).toBeFalse();
  });
});
