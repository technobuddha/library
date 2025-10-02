/**
 * Writes each provided string argument to the standard output without adding a newline.
 *
 * @param args - One or more strings to write to the standard output.
 * @group IO
 * @category Stdio
 */
export function out(...args: string[]): void {
  for (const arg of args) {
    process.stdout.write(arg);
  }
}
