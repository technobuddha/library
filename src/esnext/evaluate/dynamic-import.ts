// eslint-disable-next-line no-new-func
const unwebpackifiedImport = new Function('modulePath', 'return import(modulePath);') as (
  modulePath: string,
) => Promise<unknown>;

/**
 * Dynamically imports a module while avoiding webpack's import transformation.
 *
 * @param modulePath - Module specifier, file path, or URL to import.
 * @returns A promise that resolves to the default export when present, otherwise the module namespace object.
 * @example
 * ```typescript
 * const module = await dynamicImport<{ answer: number }>('data:text/javascript,export const answer = 42;');
 *
 * module.answer; // 42
 * ```
 * @group Evaluate
 * @category Import
 */
export async function dynamicImport<T = unknown>(modulePath: string): Promise<T> {
  return unwebpackifiedImport(modulePath).then((mod) => {
    if (typeof mod === 'object' && mod !== null && 'default' in mod) {
      return (mod as { default: T }).default;
    }

    return mod as T;
  });
}
