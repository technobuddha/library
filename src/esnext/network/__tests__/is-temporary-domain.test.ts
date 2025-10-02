import { isTemporaryDomain } from '../is-temporary-domain.ts';

describe('isTemporaryDomain', () => {
  test('returns true for temporary domains', () => {
    expect(isTemporaryDomain('10minutemail.com')).toBeTrue();
    expect(isTemporaryDomain('mailinator.com')).toBeTrue();
    expect(isTemporaryDomain('yopmail.com')).toBeTrue();
  });

  test('returns false for non-temporary domains', () => {
    expect(isTemporaryDomain('mydomain.com')).toBeFalse();
    expect(isTemporaryDomain('google.com')).toBeFalse();
  });
});
