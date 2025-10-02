import { bannerize } from '../bannerize.ts';
import { unbannerize } from '../unbannerize.ts';

describe('unbannerize', () => {
  const content = 'console.log("Hello, world!");';
  const styles = ['#', '<!->', '/**/', '//', '%', ';', 'md'] as const;

  test.each(styles)('removes banner for style %s', (style) => {
    const bannered = bannerize(content, style);
    const result = unbannerize(bannered);
    expect(result).toContain(content);
    expect(result.trim()).toBe(content);
  });

  test('leaves content unchanged if no banner', () => {
    expect(unbannerize(content)).toBe(content);
  });

  test('removes banner with shebang', () => {
    const shebang = '#!/usr/bin/env node\n';
    const bannered = bannerize(shebang + content, '#');
    const result = unbannerize(bannered);
    expect(result).toContain(content);
    expect(result).toContain(shebang.trim());
  });
});
