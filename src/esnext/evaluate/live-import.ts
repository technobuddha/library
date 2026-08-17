import { dynamicImport } from './dynamic-import.ts';

/**
 * Dynamically imports a module path while forcing a fresh fetch for each invocation.
 * This is useful when the import target is a local file or URL that may be updated while the app is running.
 * @param modulePath - Module specifier, file path, or URL to import.
 * @returns A promise that resolves to the default export when present, otherwise the module namespace object.
 * @example
 * ```typescript
 * const module = await liveImport<{ answer: number }>('./data.js');
 *
 * module.answer; // 42
 * ```
 * @group Evaluate
 * @category Import
 */
export async function liveImport<T = unknown>(modulePath: string): Promise<T> {
  const importFile = `${modulePath}?v=${Date.now()}`;
  return dynamicImport<T>(importFile);
}
