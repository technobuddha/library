import { isDomain } from './is-domain.ts';

// cspell:ignore acufc mple
describe('isDomain', () => {
  test('returns true for valid domain names', () => {
    expect(isDomain('example.com')).toBeTrue();
    expect(isDomain('sub.example.com')).toBeTrue();
    expect(isDomain('my-site.org')).toBeTrue();
    expect(isDomain('example.co.uk')).toBeTrue();
    expect(isDomain('a.io')).toBeTrue();
    // TODO [>2.1]: enable punycode support
    // expect(isDomain('xn--d1acufc.xn--p1ai')).toBeTrue(); // punycode
  });

  test('returns false for invalid domain names', () => {
    expect(isDomain('not a domain')).toBeFalse();
    expect(isDomain('example')).toBeFalse();
    expect(isDomain('example..com')).toBeFalse();
    expect(isDomain('.example.com')).toBeFalse();
    expect(isDomain('example.com.')).toBeFalse();
    expect(isDomain('-example.com')).toBeFalse();
    expect(isDomain('example-.com')).toBeFalse();
    expect(isDomain('exa_mple.com')).toBeFalse();
    expect(isDomain('')).toBeFalse();
    expect(isDomain(' ')).toBeFalse();
  });
});
