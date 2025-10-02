import { isDomain } from '../is-domain.ts';

describe('isDomain', () => {
  test('returns true for valid domain names', () => {
    expect(isDomain('example.com')).toBeTrue();
    expect(isDomain('sub.example.com')).toBeTrue();
    expect(isDomain('my-site.org')).toBeTrue();
    expect(isDomain('example.co.uk')).toBeTrue();
    expect(isDomain('a.io')).toBeTrue();
  });

  test('returns true for valid punycode domain names', () => {
    // Russian: домен.рф -> xn--d1acufc.xn--p1ai
    expect(isDomain('xn--d1acufc.xn--p1ai')).toBeTrue();
    // German: müller.de -> xn--mller-kva.de
    expect(isDomain('xn--mller-kva.de')).toBeTrue();
    // Chinese: 例え.jp -> xn--r8jz45g.jp
    expect(isDomain('xn--r8jz45g.jp')).toBeTrue();
    // Arabic: مثال.إختبار -> xn--mgbh0fb.xn--kgbechtv
    expect(isDomain('xn--mgbh0fb.xn--kgbechtv')).toBeTrue();
    // Mixed: sub.xn--example-kva.com
    expect(isDomain('sub.xn--example-kva.com')).toBeTrue();
    // Multiple punycode labels
    expect(isDomain('xn--abc-123.xn--def-456.com')).toBeTrue();
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

  test('returns false for invalid punycode domain names', () => {
    // Missing 'xn--' prefix is still a valid regular domain
    expect(isDomain('d1acufc.com')).toBeTrue();
    // DNS is case-insensitive, so uppercase is technically valid
    expect(isDomain('XN--mller-kva.de')).toBeTrue();
    // Punycode prefix only
    expect(isDomain('xn--.com')).toBeFalse();
    // Punycode label too long (>63 chars total)
    expect(isDomain(`xn--${'a'.repeat(100)}.com`)).toBeFalse();
    // Invalid characters in punycode
    expect(isDomain('xn--test_domain.com')).toBeFalse();
  });

  test('returns true for mixed case domain names', () => {
    // DNS is case-insensitive
    expect(isDomain('Example.COM')).toBeTrue();
    expect(isDomain('EXAMPLE.com')).toBeTrue();
    expect(isDomain('ExAmPlE.CoM')).toBeTrue();
    expect(isDomain('sub.EXAMPLE.COM')).toBeTrue();
  });

  test('returns true for valid  TLDs', () => {
    // Pure numeric TLDs are not allowed per ICANN rules
    expect(isDomain('example.123')).toBeFalse();
    expect(isDomain('test.999')).toBeFalse();
    expect(isDomain('site.01')).toBeFalse();
    // But alphanumeric TLDs are fine
    expect(isDomain('example.c2')).toBeTrue();
    expect(isDomain('example.2u')).toBeTrue();
    expect(isDomain('example.a1b')).toBeTrue();
    // TLDs can have dashes
    expect(isDomain('example.co-op')).toBeTrue();
    expect(isDomain('example.dash--salt')).toBeTrue();
    // No leading or trailing dashes in TLDs
    expect(isDomain('example.-com')).toBeFalse();
    expect(isDomain('example.com-')).toBeFalse();
  });
});
