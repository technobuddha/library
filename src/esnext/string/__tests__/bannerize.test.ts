import { bannerize, type BannerStyle } from '../bannerize.ts';

describe('bannerize', () => {
  test('should add banner with semicolon style (;)', () => {
    const result = bannerize(testContent, ';');
    expect(result).toInclude('; 🚨');
    expect(result).toInclude('; 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude(testContent);
    expect(result).toStartWith('; 🚨');
  });
  const testContent = 'console.log("Hello World");';

  test('should add default banner with default style (//) when no style specified', () => {
    const result = bannerize(testContent);
    expect(result).toInclude('// 🚨');
    expect(result).toInclude('// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude(testContent);
  });

  test('should add banner with hash style (#)', () => {
    const result = bannerize(testContent, '#');
    expect(result).toInclude('# 🚨');
    expect(result).toInclude('# 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude(testContent);
    expect(result).toStartWith('# 🚨');
  });

  test('should add banner with HTML comment style (<!->)', () => {
    const result = bannerize(testContent, '<!->');
    expect(result).toInclude('<!--');
    expect(result).toInclude('  🚨');
    expect(result).toInclude('  🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude('-->');
    expect(result).toInclude(testContent);
    expect(result).toStartWith('<!--');
  });

  test('should add banner with block comment style (/**/)', () => {
    const result = bannerize(testContent, '/**/');
    expect(result).toInclude('/**');
    expect(result).toInclude(' * 🚨');
    expect(result).toInclude(' * 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude(' */');
    expect(result).toInclude(testContent);
    expect(result).toStartWith('/**');
  });

  test('should add banner with markdown comment style (md)', () => {
    const result = bannerize(testContent, 'md');
    expect(result).toInclude('<!--');
    expect(result).toInclude('  🚨');
    expect(result).toInclude('  🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude('-->');
    expect(result).toInclude(testContent);
    expect(result).toStartWith('<!--');
  });

  test('should add banner with percent style (%)', () => {
    const result = bannerize(testContent, '%');
    expect(result).toInclude('% 🚨');
    expect(result).toInclude('% 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude(testContent);
    expect(result).toStartWith('% 🚨');
  });

  test('should add banner with line comment style (//)', () => {
    const result = bannerize(testContent, '//');
    expect(result).toInclude('// 🚨');
    expect(result).toInclude('// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude(testContent);
    expect(result).toStartWith('// 🚨');
  });

  test('should use custom banner when provided', () => {
    const customBanner = ['Custom Header', 'Version 1.0', 'Generated File'];
    const result = bannerize(testContent, '//', customBanner);

    expect(result).toInclude('// Custom Header');
    expect(result).toInclude('// Version 1.0');
    expect(result).toInclude('// Generated File');
    expect(result).not.toInclude('CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toInclude(testContent);
  });

  test('should handle empty text content', () => {
    const result = bannerize('', '//');
    expect(result).toInclude('// 🚨');
    expect(result).toInclude('// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN');
    expect(result).toEndWith('\n');
  });

  test('should handle multiline content', () => {
    const multilineContent = 'line1\nline2\nline3';
    const result = bannerize(multilineContent, '//');

    expect(result).toInclude('// 🚨');
    expect(result).toInclude('line1\nline2\nline3');
  });

  test('should preserve content exactly after banner', () => {
    const complexContent = 'function test() {\n  return "hello";\n}';
    const result = bannerize(complexContent, '//');

    expect(result).toEndWith(complexContent);
  });

  test('should handle empty custom banner', () => {
    const result = bannerize(testContent, '//', []);
    expect(result).toBe(`\n${testContent}`);
  });

  test('should format different comment styles correctly', () => {
    const styles: BannerStyle[] = ['#', '<!->', '/**/', '//'];
    const banner = ['Test Banner'];

    for (const style of styles) {
      const result = bannerize(testContent, style, banner);
      expect(result).toInclude('Test Banner');
      expect(result).toInclude(testContent);
    }
  });

  test('should return original text for invalid style', () => {
    const result = bannerize(testContent, 'invalid' as BannerStyle);
    expect(result).toBe(testContent);
  });

  test('should add banner after shebang with hash style', () => {
    const shebangContent = '#!/usr/bin/env bash\necho hello\necho world';
    const result = bannerize(shebangContent, '#');
    expect(result).toStartWith('#!/usr/bin/env bash\n# 🚨');
    expect(result).toInclude('echo hello');
    expect(result).toInclude('echo world');
    // Banner should be after shebang
    const lines = result.split('\n');
    expect(lines[1]).toBe('# 🚨');
  });
});
