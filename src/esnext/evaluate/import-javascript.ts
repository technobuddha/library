/**
 * Dynamically imports JavaScript module source code using a `data:` URL.
 * @param sourceCode - The JavaScript module source code to import.
 * @returns A promise that resolves to the imported module namespace object.
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
  return import(`data:text/javascript,${encodeURIComponent(sourceCode)}`) as Promise<T>;
}
