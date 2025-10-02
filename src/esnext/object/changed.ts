/**
 * Determines whether two arrays of dependencies have changed (shallow comparison).
 *
 * Similar to how React compares dependencies in hooks.
 * Returns true if the arrays are different in length or any element is not strictly equal (===).
 *
 * @param a - The previous dependency array.
 * @param b - The next dependency array.
 * @returns `true` if the arrays differ in length or any element, otherwise `false`.
 *
 * @example
 * ```typescript
 * // Basic usage
 * changed([1, 2, 3], [1, 2, 3]); // false
 * changed([1, 2, 3], [1, 2, 4]); // true
 * changed([1, 2], [1, 2, 3]);    // true
 * changed([], []);               // false
 * ```
 *
 * @example
 * ```typescript
 * // In a custom hook
 * function useCustom(dep1, dep2) {
 *   const deps = [dep1, dep2];
 *   const prevDeps = React.useRef(deps);
 *   React.useEffect(() => {
 *     if (changed(prevDeps.current, deps)) {
 *       // dependencies changed, do something
 *       prevDeps.current = deps;
 *     }
 *   }, [dep1, dep2]);
 * }
 * ```
 * @group Object
 * @category Comparison
 */
export function changed(a: readonly unknown[], b: readonly unknown[]): boolean {
  return a.length !== b.length || !a.reduce((acc, value, index) => acc && b[index] === value, true);
}
