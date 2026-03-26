import { mraCompare } from '../mra-compare.ts';

describe('mraCompare', () => {
  test('compare returns match for similar names', () => {
    const result = mraCompare('Smith', 'Smyth');
    expect(result).not.toBeNull();
    expect(result?.matching).toBeTrue();
  });

  test('compare returns null for very different names', () => {
    expect(mraCompare('Bob', 'Johnson')).toBeNull();
  });

  test('compare returns expected similarity', () => {
    expect(mraCompare('BYRNE', 'BOERN')).toEqual({
      codex: ['BYRN', 'BRN'],
      minimum: 4,
      similarity: 5,
      matching: true,
    });
    expect(mraCompare('SMITH', 'SMYTH')).toEqual({
      codex: ['SMTH', 'SMYTH'],
      minimum: 3,
      similarity: 5,
      matching: true,
    });
    expect(mraCompare('CATHERINE', 'KATHRYN')).toEqual({
      codex: ['CTHRN', 'KTHRYN'],
      minimum: 3,
      similarity: 4,
      matching: true,
    });
  });

  test('covers different sum ranges for minimum calculation', () => {
    // sum <= 4: minimum should be 5
    const result1 = mraCompare('AB', 'CD');
    expect(result1?.minimum).toBe(5);

    // sum > 4 && sum <= 7: minimum should be 4
    const result2 = mraCompare('ABC', 'ABCD');
    expect(result2?.minimum).toBe(4);

    // sum > 7 && sum <= 11: minimum should be 3
    const result3 = mraCompare('ABCD', 'ABCDE');
    expect(result3?.minimum).toBe(3);

    // sum > 11: minimum should be 2
    const result4 = mraCompare('ABCDEFGH', 'ABCDEFGHIJ');
    expect(result4?.minimum).toBe(2);
  });
});
