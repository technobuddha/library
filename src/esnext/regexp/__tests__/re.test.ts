import { re, reArray } from '../re.ts';

describe('re', () => {
  test('should interpolate simple regexes', () => {
    const a = /foo/v;
    const b = /bar/v;
    const regex = re`${a}${b}`;
    expect(regex.source).toBe('(?:foo)(?:bar)');
    expect(regex.flags).toContain('v');
  });

  test('should support string flags as first argument', () => {
    const a = /foo/v;
    const b = /bar/v;
    const regex = re('gi')`${a}${b}`;
    expect(regex.source).toBe('(?:foo)(?:bar)');
    expect(regex.flags).toContain('g');
    expect(regex.flags).toContain('i');
    expect(regex.flags).toContain('v');
  });

  test('should merge flags from interpolated regexes', () => {
    const a = /foo/iv;
    const b = /bar/gv;
    const regex = re`${a}${b}`;
    expect(regex.flags).toContain('i');
    expect(regex.flags).toContain('g');
    expect(regex.flags).toContain('v');
  });

  test('should wrap interpolated regexes as non-capturing groups', () => {
    const a = /foo|bar/v;
    const regex = re`^${a}$`;
    expect(regex.source).toBe('^(?:foo|bar)$');
  });

  test('should not double-wrap character classes', () => {
    const a = /[a-z]/v;
    const regex = re`^${a}+$`;
    expect(regex.source).toBe('^[a-z]+$');
  });

  test('should not double-wrap non-capturing groups', () => {
    const a = /foo|bar/v;
    const regex = re`^${a}$`;
    expect(regex.source).toBe('^(?:foo|bar)$');
  });

  test('should remove ^ and $ from interpolated regexes', () => {
    const a = /^foo$/v;
    const regex = re`^${a}$`;
    expect(regex.source).toBe('^(?:foo)$');
  });

  test('should handle empty template', () => {
    const regex = re``;
    expect(regex.source).toBe('(?:)');
    expect(regex.flags).toContain('v');
  });

  test('should handle template with only literals', () => {
    const regex = re`abc123`;
    expect(regex.source).toBe('abc123');
    expect(regex.flags).toContain('v');
  });

  test('should handle multiple interpolations', () => {
    const a = /foo/v;
    const b = /bar/v;
    const c = /baz/v;
    const regex = re`${a}-${b}-${c}`;
    expect(regex.source).toBe('(?:foo)-(?:bar)-(?:baz)');
  });
});

describe('reArray', () => {
  test('should combine expressions with alternation', () => {
    const regex = reArray([/foo/v, /bar/v, /[a-z]/v]);

    expect(regex.source).toBe('(?:(?:foo)|(?:bar)|[a-z])');
    expect(regex.flags).toContain('v');
  });

  test('should merge flags from all expressions', () => {
    const regex = reArray([/foo/iv, /bar/gv]);

    expect(regex.flags).toContain('g');
    expect(regex.flags).toContain('i');
    expect(regex.flags).toContain('v');
  });

  test('should remove top-level anchors from each expression', () => {
    const regex = reArray([/^foo$/v, /^bar$/v]);

    expect(regex.source).toBe('(?:(?:foo)|(?:bar))');
  });

  test('should handle empty arrays', () => {
    const regex = reArray([]);

    expect(regex.source).toBe('(?:)');
    expect(regex.flags).toContain('v');
  });
});
