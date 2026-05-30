import { dynamicImport } from './dynamic-import.ts';

/**
 * Dynamically imports JavaScript module source code using a `data:` URL.
 * @param sourceCode - The JavaScript module source code to import.
 * @returns A promise that resolves to the default export when present, otherwise the module namespace object.
 * @example
 * ```typescript
 * const module = await importJavascript<{ answer: number }>('export const answer = 42;');
 *
 * module.answer; // 42
 * ```
 * @group Evaluate
 * @category Import
 */
export async function importJavascript<T = unknown>(sourceCode: string): Promise<T> {
  return dynamicImport<T>(`data:text/javascript,${encodeURIComponent(sourceCode)}`);
}
