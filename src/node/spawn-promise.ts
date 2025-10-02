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


type AllSpawnOptions = SpawnOptions | SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<
  StdioPipe | StdioNull,
  StdioPipe | StdioNull,
  StdioPipe | StdioNull
>;


/**
 * Spawns a child process and returns a promise that resolves or rejects based on the process outcome.
 *
 * @param args - Arguments to pass to child_process.spawn (command, args, options)
 * @returns A promise that resolves with the process result
 *
 * @example
 * ```typescript
 * const result = await spawnPromise('ls', ['-l']);
 * ```
 *
 * @group Node
 * @category Process
 */

export async function spawnPromise(
  command: string,
  options?: AllSpawnOptions
): Promise<SpawnReturn>;
export async function spawnPromise(
  command: string,
  args?: readonly string[],
  options?: AllSpawnOptions,
): Promise<SpawnReturn>;
export async function spawnPromise(command: string, args?: readonly string[] | AllSpawnOptions, options?: AllSpawnOptions): Promise<SpawnReturn> {
  return new Promise((resolve, reject) => {
    const process = options ? spawn(command, args as readonly string[], options) : spawn(command, options);

    process.on('close', (code, signal) => {
      resolve({ code, signal, process });
    });
    process.on('error', (err) => {
      reject(err);
    });
  });
}
