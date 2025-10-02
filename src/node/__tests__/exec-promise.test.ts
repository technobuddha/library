import { execPromise } from '../exec-promise.ts';

describe('execPromise', () => {
  test('should execute simple command and return stdout', async () => {
    const { stdout, stderr } = await execPromise('echo "Hello World"');
    expect(stdout.trim()).toBe('Hello World');
    expect(stderr).toBe('');
  });

  test('should handle commands with output to stderr', async () => {
    const { stdout, stderr } = await execPromise('echo "Error message" >&2');
    expect(stdout).toBe('');
    expect(stderr.trim()).toBe('Error message');
  });

  test('should execute command that lists files', async () => {
    const { stdout } = await execPromise('ls');
    expect(stdout).toBeString();
    expect(stdout.length).toBeGreaterThan(0);
  });

  test('should handle command with arguments', async () => {
    const { stdout } = await execPromise('echo -n "no newline"');
    expect(stdout).toBe('no newline');
  });

  test('should reject promise when command fails', async () => {
    await expect(execPromise('invalid-command-that-does-not-exist')).rejects.toThrow();
  });

  test('should reject promise with non-zero exit code', async () => {
    await expect(execPromise('exit 1')).rejects.toThrow();
  });

  test('should handle command that produces both stdout and stderr', async () => {
    const { stdout, stderr } = await execPromise('echo "stdout" && echo "stderr" >&2');
    expect(stdout.trim()).toBe('stdout');
    expect(stderr.trim()).toBe('stderr');
  });

  test('should handle empty command output', async () => {
    const { stdout, stderr } = await execPromise('true');
    expect(stdout).toBe('');
    expect(stderr).toBe('');
  });

  test('should handle command with special characters', async () => {
    const { stdout } = await execPromise('echo "Special chars: !@#$%^&*()"');
    expect(stdout.trim()).toBe('Special chars: !@#$%^&*()');
  });

  test('should handle multiline output', async () => {
    const { stdout } = await execPromise('printf "line1\\nline2\\nline3"');
    expect(stdout).toBe('line1\nline2\nline3');
  });
});
