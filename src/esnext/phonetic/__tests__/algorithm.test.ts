import { createAlgorithm } from '../algorithm.ts';

// Minimal mock scan rules for grouping
const scanRules = [
  { m: 'CH', i: 'b' as const, o: 'X' },
  { m: 'C', o: 'K' },
  { m: 'A', o: 'A' },
  { m: 'B', o: 'B' },
  { m: 'BO', o: 'BO' },
];

describe('createAlgorithm', () => {
  test('groups scan rules by first character', () => {
    const config = { scan: [...scanRules] };
    const compiled = createAlgorithm(config);
    expect(Object.keys(compiled.scan!)).toEqual(expect.arrayContaining(['A', 'B', 'C']));
    expect(compiled.scan!.A).toEqual([{ m: 'A', o: 'A' }]);
    expect(compiled.scan!.B).toEqual(
      expect.arrayContaining([
        { m: 'B', o: 'B' },
        { m: 'BO', o: 'BO' },
      ]),
    );
    expect(compiled.scan!.C).toEqual(
      expect.arrayContaining([
        { m: 'C', o: 'K' },
        { m: 'CH', i: 'b', o: 'X' },
      ]),
    );
  });

  test('handles missing scan property gracefully', () => {
    const config = { pad: '0', length: 4 };
    const compiled = createAlgorithm(config);
    expect(compiled.pad).toBe('0');
    expect(compiled.length).toBe(4);
    expect(compiled.scan).toBeUndefined();
  });

  test('accepts forking true and number', () => {
    const compiledTrue = createAlgorithm({ scan: [...scanRules], forking: true });
    const compiledNum = createAlgorithm({ scan: [...scanRules], forking: 2 });
    expect(compiledTrue.forking).toBe(true);
    expect(compiledNum.forking).toBe(2);
    expect(compiledTrue.scan).toBeDefined();
    expect(compiledNum.scan).toBeDefined();
  });

  test('accepts non-forking config', () => {
    const compiled = createAlgorithm({ scan: [...scanRules], forking: false });
    expect(compiled.forking).toBe(false);
    expect(compiled.scan).toBeDefined();
  });

  test('accepts silentLetters and firstLetter (valid values)', () => {
    const config = {
      scan: [...scanRules],
      silentLetters: ['A', 'E'],
      firstLetter: 'replace' as const,
    };
    const compiled = createAlgorithm(config);
    expect(compiled.silentLetters).toEqual(['A', 'E']);
    expect(compiled.firstLetter).toBe('replace');
  });

  test('accepts all rules arrays', () => {
    const config = {
      scan: [...scanRules],
      preprocessRules: [{ r: /A/gv, s: 'X' }],
      priorRules: [{ r: /B/gv, s: 'Y' }],
      laterRules: [{ r: /C/gv, s: 'Z' }],
    };
    const compiled = createAlgorithm(config);
    expect(compiled.preprocessRules).toBeDefined();
    expect(compiled.priorRules).toBeDefined();
    expect(compiled.laterRules).toBeDefined();
  });

  test('accepts setQueries function', () => {
    const config = {
      scan: [...scanRules],
      setQueries: (text: string) => [text],
    };
    const compiled = createAlgorithm(config);
    expect(typeof compiled.setQueries).toBe('function');
  });

  test('scan grouping handles empty array', () => {
    const config = { scan: [] };
    const compiled = createAlgorithm(config);
    expect(compiled.scan).toEqual({});
  });
});
