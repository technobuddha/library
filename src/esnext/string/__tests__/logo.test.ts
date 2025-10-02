import { logo } from '../logo.ts';

describe('logo', () => {
  test('should be an array of strings', () => {
    expect(logo).toBeArray();
    expect(logo.every((line) => typeof line === 'string')).toBeTrue();
  });

  test('should have consistent line length', () => {
    for (const line of logo) {
      expect(line).toHaveLength(86);
    }
  });
});
