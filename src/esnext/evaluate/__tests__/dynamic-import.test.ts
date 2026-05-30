type DynamicImportFunction = <T = unknown>(modulePath: string) => Promise<T>;
type RuntimeImportFunction = (modulePath: string) => Promise<unknown>;

async function loadDynamicImport(
  runtimeImport: RuntimeImportFunction,
): Promise<DynamicImportFunction> {
  function MockFunction(this: unknown): RuntimeImportFunction {
    return runtimeImport;
  }

  vi.stubGlobal('Function', MockFunction);
  vi.resetModules();

  try {
    const module = await import('../dynamic-import.ts');
    return module.dynamicImport;
  } finally {
    vi.unstubAllGlobals();
  }
}

describe('dynamicImport', () => {
  test('returns module namespace when no default export exists', async () => {
    const runtimeImport = vi.fn<RuntimeImportFunction>().mockResolvedValue({
      answer: 42,
      greet: (name: string) => `Hello, ${name}!`,
    });
    const dynamicImport = await loadDynamicImport(runtimeImport);

    const module = await dynamicImport<{
      answer: number;
      greet: (name: string) => string;
    }>('mock-module-path');

    expect(module.answer).toBe(42);
    expect(module.greet('Phil')).toBe('Hello, Phil!');
    expect(runtimeImport).toHaveBeenCalledWith('mock-module-path');
  });

  test('returns default export when present', async () => {
    const runtimeImport = vi.fn<RuntimeImportFunction>().mockResolvedValue({
      answer: 42,
      default: { ok: true },
    });
    const dynamicImport = await loadDynamicImport(runtimeImport);

    const value = await dynamicImport<{ ok: boolean }>('mock-module-path');

    expect(value).toEqual({ ok: true });
    expect(runtimeImport).toHaveBeenCalledWith('mock-module-path');
  });

  test('passes through non-object module values', async () => {
    const runtimeImport = vi.fn<RuntimeImportFunction>().mockResolvedValue('plain-value');
    const dynamicImport = await loadDynamicImport(runtimeImport);

    const value = await dynamicImport<string>('mock-module-path');

    expect(value).toBe('plain-value');
  });

  test('rejects when runtime import rejects', async () => {
    const runtimeImport = vi
      .fn<RuntimeImportFunction>()
      .mockRejectedValue(new Error('import failed'));
    const dynamicImport = await loadDynamicImport(runtimeImport);

    await expect(dynamicImport('mock-module-path')).rejects.toThrow('import failed');
  });
});
