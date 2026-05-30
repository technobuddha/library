import { err } from './err.ts';

/**
 * Writes each provided string argument to the standard error output and appends a trailing newline.
 *
 * @param args - One or more strings to write to the standard error output before the newline.
 * @group IO
 * @category Stdio
 */
export function errln(...args: string[]): void {
  err(...args, '\n');
}
