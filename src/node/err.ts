/**
 * Writes each provided string argument to the standard error output without adding a newline.
 *
 * @param args - One or more strings to write to the standard error output.
 * @group IO
 * @category Stdio
 */
export function err(...args: string[]): void {
  for (const arg of args) {
    process.stderr.write(arg);
  }
}
