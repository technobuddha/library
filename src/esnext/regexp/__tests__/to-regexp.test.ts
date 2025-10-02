import { toRegExp } from '../to-reg-exp.ts';

describe('toRegExp', () => {
  test('should return RegExp unchanged when input has flags and options.flags is empty', () => {
    const original = /baz/gv;
    const result = toRegExp(original, { flags: '' });
    expect(result.source).toBe('baz');
    expect(result.flags).toBe('gv');
  });
  test('should return RegExp with merged flags when no u/v conflict', () => {
    const original = /foo/gv;
    const result = toRegExp(original, { flags: 'i' });
    expect(result.source).toBe('foo');
    expect(result.flags).toBe('giv');
  });
  test('should convert a simple string to RegExp with default flags', () => {
    const result = toRegExp('hello');
    expect(result).toBeInstanceOf(RegExp);
    expect(result.source).toBe('hello');
    expect(result.flags).toBe('v');
  });

  test('should escape special regex characters in strings', () => {
    const result = toRegExp('hello.world');
    expect(result.source).toBe('hello\\.world');
    expect('hello.world').toMatch(result);
    expect('helloXworld').not.toMatch(result);
  });

  test('should support custom flags', () => {
    const result = toRegExp('test', { flags: 'gi' });
    expect(result.flags).toBe('gi');
    expect(result.global).toBeTrue();
    expect(result.ignoreCase).toBeTrue();
  });

  test('should merge flags when input is already a RegExp', () => {
    const original = /pattern/iv;
    const result = toRegExp(original, { flags: 'v' });
    expect(result).toBeInstanceOf(RegExp);
    expect(result.source).toBe('pattern');
    expect(result.flags).toBe('iv');
  });

  test('should merge additional flags with existing RegExp flags', () => {
    const original = /test/gmv;
    const result = toRegExp(original, { flags: 'iv' });
    expect(result).toBeInstanceOf(RegExp);
    expect(result.source).toBe('test');
    expect(result.flags).toBe('gimv');
  });

  test('should remove u flag when both u and v flags are present', () => {
    const result = toRegExp('test', { flags: 'vu' });
    expect(result.flags).toBe('v');
    expect(result.flags).not.toContain('u');
  });

  test('should remove u flag when original has u and we add v', () => {
    const original = /test/v;
    const result = toRegExp(original, { flags: 'v' });
    expect(result.flags).toBe('v');
    expect(result.flags).not.toContain('u');
  });

  test('should remove u flag when both u and v are present with other flags', () => {
    const original = /test/gimv;
    const result = toRegExp(original, { flags: 'v' });
    expect(result.flags).toBe('gimv');
    expect(result.flags).not.toContain('u');
  });

  test('should remove u flag when RegExp has u flag and we add v flag', () => {
    const original = /test/v;
    const result = toRegExp(original, { flags: 'v' });
    expect(result.flags).toBe('v');
    expect(result.flags).not.toContain('u');
  });

  test('should remove u flag when input RegExp has u flag and we add v', () => {
    const original = /test/v;
    const result = toRegExp(original, { flags: 'v' });
    expect(result.flags).toBe('v');
    expect(result.flags).not.toContain('u');
  });

  test('should handle RegExp with no initial flags', () => {
    const original = /pattern/v;
    const result = toRegExp(original, { flags: 'gi' });
    expect(result.source).toBe('pattern');
    expect(result.flags).toBe('giv');
  });

  test('should add prefix to string pattern', () => {
    const result = toRegExp('hello', { prefix: '^' });
    expect(result.source).toBe('^hello');
    expect('^hello').not.toMatch(result);
    expect('hello').toMatch(result);
  });

  test('should add suffix to string pattern', () => {
    const result = toRegExp('world', { suffix: '$' });
    expect(result.source).toBe('world$');
    expect('world$').not.toMatch(result);
    expect('world').toMatch(result);
  });

  test('should add both prefix and suffix to string pattern', () => {
    const result = toRegExp('test', { prefix: '^', suffix: '$' });
    expect(result.source).toBe('^test$');
    expect('test').toMatch(result);
    expect(' test').not.toMatch(result);
    expect('test ').not.toMatch(result);
  });

  test('should add prefix to RegExp pattern', () => {
    const original = /hello/v;
    const result = toRegExp(original, { prefix: '^' });
    expect(result.source).toBe('^hello');
    expect('hello').toMatch(result);
    expect(' hello').not.toMatch(result);
  });

  test('should add suffix to RegExp pattern', () => {
    const original = /world/v;
    const result = toRegExp(original, { suffix: '$' });
    expect(result.source).toBe('world$');
    expect('world').toMatch(result);
    expect('world ').not.toMatch(result);
  });

  test('should combine prefix, suffix, and flags', () => {
    const result = toRegExp('Test', { prefix: '^', suffix: '$', flags: 'i' });
    expect(result.source).toBe('^Test$');
    expect(result.flags).toBe('i');
    expect('test').toMatch(result);
    expect('TEST').toMatch(result);
    expect(' test').not.toMatch(result);
  });

  test('should escape multiple special characters', () => {
    const result = toRegExp('a+b*c?d[e]f(g)h{i}j|k\\l^m$n');
    expect('a+b*c?d[e]f(g)h{i}j|k\\l^m$n').toMatch(result);
  });

  test('should work with empty string', () => {
    const result = toRegExp('');
    expect(result.source).toBe('(?:)');
    expect('').toMatch(result);
  });

  test('should work with unicode characters', () => {
    const result = toRegExp('hello 世界');
    expect('hello 世界').toMatch(result);
  });
});
