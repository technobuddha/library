import {
  spawn,
  type SpawnOptions,
  type SpawnOptionsWithoutStdio,
  type SpawnOptionsWithStdioTuple,
  type StdioNull,
  type StdioPipe,
} from 'node:child_process';

/**
 * The result of a spawned process.
 *
 * @example
 * ```typescript
 * const result = await spawnPromise('ls', ['-l']);
 * console.log(result.code);
 * ```
 *
 * @group Node
 * @category Process
 */
export type SpawnReturn = {
  /** The exit code of the process */
  code: number | null;
  /** The signal used to terminate the process, if any */
  signal: NodeJS.Signals | null;
  /** The spawned child process instance */
  process: ReturnType<typeof spawn>;
};

/**
 * Union type for all supported spawn options accepted by Node.js child_process.spawn.
 *
 * This type allows passing any of the standard spawn options, including those with or without stdio configuration.
 *
 * - `SpawnOptions`: Basic options for spawning a process.
 * - `SpawnOptionsWithoutStdio`: Options without stdio tuple.
 * - `SpawnOptionsWithStdioTuple`: Options with explicit stdio tuple types.
 *
 * @group Node
 * @category Process
 */
export type AllSpawnOptions =
  | SpawnOptions
  | SpawnOptionsWithoutStdio
  | SpawnOptionsWithStdioTuple<StdioPipe | StdioNull, StdioPipe | StdioNull, StdioPipe | StdioNull>;

/**
 * @param command - The command to run (e.g., `'ls'` or `'node'`).
 * @param options - (Optional) Options to pass to `child_process.spawn`.
 * @returns A promise that resolves to a {@link SpawnReturn} object containing the exit code, signal, and process instance.
 *
 * @example
 * ```typescript
 * // Usage with only a command
 * const result2 = await spawnPromise('node');
 * ```
 */
export async function spawnPromise(
  command: string,
  options?: AllSpawnOptions,
): Promise<SpawnReturn>;
/**
 * @param command - The command to run (e.g., `'ls'` or `'node'`).
 * @param args - (Optional) Array of string arguments to pass to the command.
 * @param options - (Optional) Options to pass to `child_process.spawn`.
 * @returns A promise that resolves to a {@link SpawnReturn} object containing the exit code, signal, and process instance.
 *
 * @example
 * ```typescript
 * // Usage with only a command
 * const result2 = await spawnPromise('node');
 *
 * // Usage with options
 * const result3 = await spawnPromise('ls', ['-a'], { cwd: '/home' });
 * ```
 */
export async function spawnPromise(
  command: string,
  args?: readonly string[],
  options?: AllSpawnOptions,
): Promise<SpawnReturn>;
/**
 * Spawns a child process and returns a promise that resolves or rejects based on the process outcome.
 *
 * @group Node
 * @category Process
 */
export async function spawnPromise(
  command: string,
  args?: readonly string[] | AllSpawnOptions,
  options?: AllSpawnOptions,
): Promise<SpawnReturn> {
  return new Promise((resolve, reject) => {
    const process =
      options ? spawn(command, args as readonly string[], options) : spawn(command, options);

    process.on('close', (code, signal) => {
      resolve({ code, signal, process });
    });
    process.on('error', (err) => {
      reject(err);
    });
  });
}
