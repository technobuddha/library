type ImportJavascript = <T = unknown>(sourceCode: string) => Promise<T>;

async function loadImportJavascript(): Promise<ImportJavascript> {
  const runtimeImport = async (modulePath: string): Promise<unknown> => import(modulePath);

  function MockFunction(this: unknown): (modulePath: string) => Promise<unknown> {
    return runtimeImport;
  }

  vi.stubGlobal('Function', MockFunction);
  vi.resetModules();

  try {
    const module = await import('../import-javascript.ts');
    return module.importJavascript;
  } finally {
    vi.unstubAllGlobals();
  }
}

describe('importJavascript', () => {
  test('imports named exports', async () => {
    const importJavascript = await loadImportJavascript();
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
    const importJavascript = await loadImportJavascript();
    const module = await importJavascript<string>("export default 'ok';");

    expect(module).toBe('ok');
  });

  test('handles URL-sensitive and unicode characters', async () => {
    const importJavascript = await loadImportJavascript();
    const expected = 'symbols: ?&=#%/+: こんにちは';
    const module = await importJavascript<{ text: string }>(
      `export const text = ${JSON.stringify(expected)};`,
    );

    expect(module.text).toBe(expected);
  });

  test('rejects invalid JavaScript source', async () => {
    const importJavascript = await loadImportJavascript();
    await expect(importJavascript('export const = ;')).rejects.toThrow();
  });
});
