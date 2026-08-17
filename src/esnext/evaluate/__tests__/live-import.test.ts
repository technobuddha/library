type LiveImportFunction = <T = unknown>(modulePath: string) => Promise<T>;
type RuntimeImportFunction = (modulePath: string) => Promise<unknown>;

async function loadLiveImport(runtimeImport: RuntimeImportFunction): Promise<LiveImportFunction> {
  function MockFunction(this: unknown): RuntimeImportFunction {
    return runtimeImport;
  }

  vi.stubGlobal('Function', MockFunction);
  vi.resetModules();

  try {
    const module = await import('../live-import.ts');
    return module.liveImport;
  } finally {
    vi.unstubAllGlobals();
  }
}

describe('liveImport', () => {
  test('adds a cache-busting query to the module path', async () => {
    const runtimeImport = vi.fn<RuntimeImportFunction>().mockResolvedValue({
      answer: 42,
      greet: (name: string) => `Hello, ${name}!`,
    });
    const liveImport = await loadLiveImport(runtimeImport);

    const module = await liveImport<{
      answer: number;
      greet: (name: string) => string;
    }>('mock-module-path');

    expect(module.answer).toBe(42);
    expect(module.greet('Phil')).toBe('Hello, Phil!');
    expect(runtimeImport).toHaveBeenCalledWith(expect.stringMatching(/^mock-module-path\?v=\d+$/v));
  });

  test('returns default export when present', async () => {
    const runtimeImport = vi.fn<RuntimeImportFunction>().mockResolvedValue({
      default: { ok: true },
    });
    const liveImport = await loadLiveImport(runtimeImport);

    const value = await liveImport<{ ok: boolean }>('mock-module-path');

    expect(value).toEqual({ ok: true });
    expect(runtimeImport).toHaveBeenCalledWith(expect.stringMatching(/^mock-module-path\?v=\d+$/v));
  });
});
