import { isIPV4Broadcast } from '../is-ipv4-broadcast.ts';

describe('isIPV4Broadcast', () => {
  test('should return true for valid IPv4 broadcast addresses', () => {
    expect(isIPV4Broadcast('255.255.255.255')).toBeTrue();
  });

  test('should return false for non-broadcast IPv4 addresses', () => {
    expect(isIPV4Broadcast('192.168.1.1')).toBeFalse();
    expect(isIPV4Broadcast('10.0.0.1')).toBeFalse();
  });

  test('should return false for invalid IPv4 addresses', () => {
    expect(isIPV4Broadcast('256.256.256.256')).toBeFalse();
    expect(isIPV4Broadcast('abc.def.ghi.jkl')).toBeFalse();
  });
});
