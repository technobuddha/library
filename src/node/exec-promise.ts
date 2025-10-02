import childProcess from 'node:child_process';
import util from 'node:util';

/**
 * A promisified version of Node.js's `child_process.exec` function.
 *
 * Executes a command in a shell and returns a Promise that resolves with the command's
 * stdout and stderr output. This is a convenience wrapper around the callback-based
 * `child_process.exec` function.
 *
 * @returns A promisified version of `child_process.exec`
 *
 * @example
 * ```typescript
 * const { stdout, stderr } = await execPromise('ls -la');
 * console.log('Directory listing:', stdout);
 *
 * // Handle errors
 * try {
 *   await execPromise('invalid-command');
 * } catch (error) {
 *   console.error('Command failed:', error.message);
 * }
 * ```
 *
 * @group Process
 * @category Child Process
 */
export const execPromise = util.promisify(childProcess.exec);
