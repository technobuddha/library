import { importJavascript } from '../import-javascript.ts';

describe('importJavascript', () => {
  test('imports named exports', async () => {
    const module = await importJavascript<{
      answer: number;
      greet: (name: string) => string;
    }>(
      [
        'export const answer = 42;',
        'export function greet(name) {',
        // eslint-disable-next-line no-template-curly-in-string
        '  return `Hello, ${name}!`;',
        '}',
      ].join('\n'),
    );

    expect(module.answer).toBe(42);
    expect(module.greet('Phil')).toBe('Hello, Phil!');
  });

  test('imports default export', async () => {
    const module = await importJavascript<{ default: string }>("export default 'ok';");

    expect(module.default).toBe('ok');
  });

  test('handles URL-sensitive and unicode characters', async () => {
    const expected = 'symbols: ?&=#%/+: こんにちは';
    const module = await importJavascript<{ text: string }>(
      `export const text = ${JSON.stringify(expected)};`,
    );

    expect(module.text).toBe(expected);
  });

  test('rejects invalid JavaScript source', async () => {
    await expect(importJavascript('export const = ;')).rejects.toThrow();
  });
});
