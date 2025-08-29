import { re } from './re.ts';

describe('re', () => {
  test('should interpolate simple regexes', () => {
    const a = /foo/u;
    const b = /bar/u;
    const regex = re`${a}${b}`;
    expect(regex.source).toBe('(?:foo)(?:bar)');
    expect(regex.flags).toContain('u');
  });

  test('should merge flags from interpolated regexes', () => {
    const a = /foo/iu;
    const b = /bar/gu;
    const regex = re`${a}${b}`;
    expect(regex.flags).toContain('i');
    expect(regex.flags).toContain('g');
    expect(regex.flags).toContain('u');
  });

  test('should wrap interpolated regexes as non-capturing groups', () => {
    const a = /foo|bar/u;
    const regex = re`^${a}$`;
    expect(regex.source).toBe('^(?:foo|bar)$');
  });

  test('should not double-wrap character classes', () => {
    const a = /[a-z]/u;
    const regex = re`^${a}+$`;
    expect(regex.source).toBe('^[a-z]+$');
  });

  test('should not double-wrap non-capturing groups', () => {
    const a = /foo|bar/u;
    const regex = re`^${a}$`;
    expect(regex.source).toBe('^(?:foo|bar)$');
  });

  test('should remove ^ and $ from interpolated regexes', () => {
    const a = /^foo$/u;
    const regex = re`^${a}$`;
    expect(regex.source).toBe('^(?:foo)$');
  });

  test('should handle empty template', () => {
    const regex = re``;
    expect(regex.source).toBe('(?:)');
    expect(regex.flags).toContain('u');
  });

  test('should handle template with only literals', () => {
    const regex = re`abc123`;
    expect(regex.source).toBe('abc123');
    expect(regex.flags).toContain('u');
  });

  test('should handle multiple interpolations', () => {
    const a = /foo/u;
    const b = /bar/u;
    const c = /baz/u;
    const regex = re`${a}-${b}-${c}`;
    expect(regex.source).toBe('(?:foo)-(?:bar)-(?:baz)');
  });
});
