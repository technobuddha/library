import { isReservedDomain } from '../is-reserved-domain.ts';

describe('isReservedDomain', () => {
  test('returns true for reserved domains', () => {
    expect(isReservedDomain('example.com')).toBeTrue();
    expect(isReservedDomain('localhost')).toBeTrue();
    expect(isReservedDomain('test')).toBeTrue();
  });

  test('returns false for non-reserved domains', () => {
    expect(isReservedDomain('mydomain.com')).toBeFalse();
    expect(isReservedDomain('google.com')).toBeFalse();
  });
});
