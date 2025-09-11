import { isEmail } from './is-email.ts';

describe('isEmail', () => {
  test('should return true for valid email addresses', () => {
    expect(isEmail('user@example.com')).toBeTrue();
    expect(isEmail('user.name+tag+sorting@example.com')).toBeTrue();
    expect(isEmail('user_name@example.co.uk')).toBeTrue();
    expect(isEmail('user-name@sub.example.com')).toBeTrue();
    expect(isEmail('user123@domain.io')).toBeTrue();
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
  });
});
