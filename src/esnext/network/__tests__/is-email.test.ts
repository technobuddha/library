import { isEmail } from '../is-email.ts';

describe('isEmail', () => {
  test('should return true for valid email addresses', () => {
    expect(isEmail('user@example.com')).toBeTrue();
    expect(isEmail('user.name+tag+sorting@example.com')).toBeTrue();
    expect(isEmail('user_name@example.co.uk')).toBeTrue();
    expect(isEmail('user-name@sub.example.com')).toBeTrue();
    expect(isEmail('user123@domain.io')).toBeTrue();
  });

  test('should return true for email address with ipv4 domain', () => {
    expect(isEmail('user@[192.168.1.1]')).toBeTrue();
  });

  test('should return true for email addresses with punycode domains', () => {
    // Russian domain
    expect(isEmail('user@xn--d1acufc.xn--p1ai')).toBeTrue();
    // German domain
    expect(isEmail('test@xn--mller-kva.de')).toBeTrue();
    // Chinese domain
    expect(isEmail('admin@xn--r8jz45g.jp')).toBeTrue();
    // Arabic domain
    expect(isEmail('contact@xn--mgbh0fb.xn--kgbechtv')).toBeTrue();
    // Mixed punycode subdomain
    expect(isEmail('info@sub.xn--example-kva.com')).toBeTrue();
  });

  test('should return false for invalid email addresses', () => {
    expect(isEmail('plainAddress')).toBeFalse();
    expect(isEmail('user@.com')).toBeFalse();
    expect(isEmail('user@com')).toBeFalse();
    expect(isEmail('@example.com')).toBeFalse();
    expect(isEmail('user@ example .com')).toBeFalse();
    expect(isEmail('user@example..com')).toBeFalse();
    expect(isEmail('user@.example.com')).toBeFalse();
    expect(isEmail('user@example.com.')).toBeFalse();
    expect(isEmail('user@-example.com')).toBeFalse();
    expect(isEmail('user@example.com-')).toBeFalse();
    expect(isEmail('user@example..com')).toBeFalse();
    expect(isEmail('user@example.com.')).toBeFalse();
  });

  test('should return false for email addresses with invalid punycode domains', () => {
    // DNS is case-insensitive, so uppercase is valid
    expect(isEmail('user@XN--mller-kva.de')).toBeTrue();
    // Empty punycode label
    expect(isEmail('user@xn--.com')).toBeFalse();
    // Invalid characters in punycode
    expect(isEmail('user@xn--test_domain.com')).toBeFalse();
    // Punycode too long
    expect(isEmail(`user@xn--${'a'.repeat(60)}.com`)).toBeFalse();
  });

  test('should return false for email addresses exceeding length limits', () => {
    // Local part exceeds 64 characters
    expect(isEmail(`${'a'.repeat(65)}@example.com`)).toBeFalse();

    // Domain part exceeds 255 characters
    expect(isEmail(`user@${'a'.repeat(256)}.com`)).toBeFalse();

    // Entire email exceeds 320 characters
    expect(isEmail(`${'a'.repeat(64)}@${'b'.repeat(256)}.com`)).toBeFalse();
  });

  test('examples from wikipedia', () => {
    expect(isEmail('stellyamburrr985@example.com')).toBeTrue();
    expect(isEmail('Abc.123@example.com')).toBeTrue();
    expect(isEmail('user+mailbox/department=shipping@example.com')).toBeTrue();
    expect(isEmail("!#$%&'*+-/=?^_`.{|}~@example.com")).toBeTrue();
    expect(isEmail('"Abc@def"@example.com')).toBeTrue();
    expect(isEmail('"Fred\\ Bloggs"@example.com')).toBeTrue();
    expect(isEmail('"Joe.\\\\Blow"@example.com')).toBeTrue();
  });

  test.todo('should return true for valid internationalized email addresses', () => {
    expect(isEmail('用户@例子.广告')).toBeTrue(); // Chinese
    expect(isEmail('ಬೆಂಬಲ@ಡೇಟಾಮೇಲ್.ಭಾರತ')).toBeTrue(); // Kannada
    expect(isEmail('अजय@डाटा.भारत')).toBeTrue(); // Hindi
    expect(isEmail('квіточка@пошта.укр')).toBeTrue(); // Ukrainian
    expect(isEmail('δοκιμή@παράδειγμα.ελ')).toBeTrue(); // Greek
    expect(isEmail('Dörte@Sörensen.example.com')).toBeTrue(); // Latin with diacritics (German)
    expect(isEmail('коля@пример.рф')).toBeTrue(); // Cyrillic
    expect(isEmail('مثال@موقع.عرب')).toBeTrue(); // Arabic
    expect(isEmail('我買@屋企.香港')).toBeTrue(); // Chinese with TLD
  });

  test('should return false for invalid internationalized email addresses', () => {
    expect(isEmail('用户@例子..广告')).toBeFalse(); // Consecutive dots
    expect(isEmail('почта@пример.')).toBeFalse(); // Trailing dot
    expect(isEmail('δοκιμή@.παράδειγμα.ελ')).toBeFalse(); // Leading dot
    expect(isEmail('Dörte@@Sörensen.example.com')).toBeFalse(); // Double @
    expect(isEmail('我買@屋企.')).toBeFalse(); // Trailing dot
  });
});
