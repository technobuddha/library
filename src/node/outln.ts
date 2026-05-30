import { out } from './out.ts';

/**
 * Writes each provided string argument to the standard output and appends a trailing newline.
 *
 * @param args - One or more strings to write to the standard output before the newline.
 * @group IO
 * @category Stdio
 */
export function outln(...args: string[]): void {
  out(...args, '\n');
}
