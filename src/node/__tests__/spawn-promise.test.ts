import { spawnPromise, type SpawnReturn } from '../spawn-promise.ts';

describe('spawnPromise', () => {
  test('resolves with correct output for echo', async () => {
    const result: SpawnReturn = await spawnPromise('echo', ['hello world']);
    expect(result.code).toBe(0);
  });

  test('rejects for non-existent command', async () => {
    await expect(spawnPromise('nonexistentcommand')).rejects.toThrow();
  });
});
