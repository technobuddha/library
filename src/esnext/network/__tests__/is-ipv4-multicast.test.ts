import { isIPV4Multicast } from '../is-ipv4-multicast.ts';

describe('isIPV4Multicast', () => {
  test('should return true for valid IPv4 multicast addresses', () => {
    expect(isIPV4Multicast('224.0.0.1')).toBeTrue();
    expect(isIPV4Multicast('239.255.255.255')).toBeTrue();
  });

  test('should return false for non-multicast IPv4 addresses', () => {
    expect(isIPV4Multicast('192.168.1.1')).toBeFalse();
    expect(isIPV4Multicast('10.0.0.1')).toBeFalse();
  });

  test('should return false for invalid IPv4 addresses', () => {
    expect(isIPV4Multicast('256.256.256.256')).toBeFalse();
    expect(isIPV4Multicast('abc.def.ghi.jkl')).toBeFalse();
  });
});
